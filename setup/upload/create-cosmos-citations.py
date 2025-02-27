#!/usr/bin/env python3

import os
import json
import glob
import uuid
from azure.cosmos import CosmosClient, PartitionKey
from dotenv import load_dotenv

def load_config():
    """
    Carga las variables de entorno y retorna un diccionario de configuración.
    """
    load_dotenv()
    config = {
        "COSMOS_ENDPOINT": os.getenv("COSMOS_ENDPOINT"),
        "COSMOS_KEY": os.getenv("COSMOS_KEY"),
        "DATABASE_NAME": os.getenv("COSMOS_DATABASE_NAME", "CitationDatabase"),
        "CONTAINER_NAME": os.getenv("COSMOS_CONTAINER_NAME", "CitationContainer")
    }
    if not config["COSMOS_ENDPOINT"] or not config["COSMOS_KEY"]:
        raise Exception("Por favor, configura las variables COSMOS_ENDPOINT y COSMOS_KEY.")
    return config

def init_cosmos_db(config):
    """
    Inicializa el cliente Cosmos DB, elimina el contenedor si existe y lo crea de nuevo.
    Retorna el contenedor de Cosmos DB.
    """
    client = CosmosClient(config["COSMOS_ENDPOINT"], config["COSMOS_KEY"])
    database = client.create_database_if_not_exists(id=config["DATABASE_NAME"])

    # Intenta borrar el contenedor si existe usando el método correcto del objeto database.
    try:
        database.delete_container(config["CONTAINER_NAME"])
        print(f"Contenedor '{config['CONTAINER_NAME']}' existente eliminado.")
    except Exception as e:
        print(f"No se encontró contenedor previo o hubo un error al eliminar: {e}")

    # Crea el contenedor nuevo.
    container = database.create_container(
        id=config["CONTAINER_NAME"],
        partition_key=PartitionKey(path="/source"),
        offer_throughput=400
    )
    print(f"Contenedor '{config['CONTAINER_NAME']}' creado en la base de datos '{config['DATABASE_NAME']}'.")
    return container

def process_citation_item(citation, container):
    """
    Procesa un solo item de cita. Si no tiene id, lo genera usando un GUID y lo sube a Cosmos DB.
    """
    if "id" not in citation:
        citation["id"] = str(uuid.uuid4())
    try:
        container.upsert_item(citation)
        print(f"Upserted item con id: {citation['id']}")
    except Exception as e:
        print(f"Error al subir item {citation.get('id', '')}: {e}")

def process_json_file(filename, container):
    """
    Lee y procesa un fichero JSON. Si contiene una llave 'citation' con una lista, 
    procesa cada elemento; en caso contrario, procesa el documento completo.
    """
    print(f"\nProcesando fichero: {filename}")
    with open(filename, "r", encoding="utf-8") as file:
        data = json.load(file)
    
    if "citation" in data and isinstance(data["citation"], list):
        for citation in data["citation"]:
            process_citation_item(citation, container)
    else:
        # Caso: el fichero contiene un único documento
        if "id" not in data:
            data["id"] = str(uuid.uuid4())
        try:
            container.upsert_item(data)
            print(f"Upserted item con id: {data['id']}")
        except Exception as e:
            print(f"Error al subir item {data['id']}: {e}")

def process_upload_directory(upload_path, container):
    """
    Recorre el directorio indicado y procesa todos los ficheros JSON.
    """
    for filename in glob.glob(os.path.join(upload_path, '*.json')):
        process_json_file(filename, container)

def main():
    config = load_config()
    container = init_cosmos_db(config)
    
    # Directorio donde se ubican los ficheros JSON
    upload_path = os.path.join("..", "..", "data", "cosmosdb", "upload")
    process_upload_directory(upload_path, container)

if __name__ == "__main__":
    main()