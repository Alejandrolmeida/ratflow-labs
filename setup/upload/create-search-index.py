#!/usr/bin/env python3

"""
Inicializa índices de Azure Cognitive Search por cada carpeta con nuestros datos,
usando búsqueda vectorial y ranking semántico.

Para ejecutar este código, se deben tener creados los recursos de "Cognitive Search"
y "OpenAI" en Azure.
"""

import os
import math
import openai
import tiktoken
from dotenv import load_dotenv
from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import (
    HnswParameters,
    HnswAlgorithmConfiguration,
    SemanticPrioritizedFields,
    SearchableField,
    SearchField,
    SearchFieldDataType,
    SearchIndex,
    SemanticSearch,
    SemanticConfiguration,
    SemanticField, 
    SimpleField,
    VectorSearch,
    VectorSearchAlgorithmKind,
    VectorSearchAlgorithmMetric,
    ExhaustiveKnnAlgorithmConfiguration,
    ExhaustiveKnnParameters,
    VectorSearchProfile
)
from langchain.document_loaders import DirectoryLoader, UnstructuredMarkdownLoader
from langchain.text_splitter import Language, RecursiveCharacterTextSplitter

# Config for Azure Search.
AZURE_SEARCH_ENDPOINT = ""
AZURE_SEARCH_KEY = ""
# Ya no usamos global AZURE_SEARCH_INDEX_NAME de forma fija.

# Config for Azure OpenAI.
AZURE_OPENAI_API_TYPE = ""
AZURE_OPENAI_API_BASE = ""
AZURE_OPENAI_API_VERSION = ""
AZURE_OPENAI_API_KEY = ""
AZURE_OPENAI_EMBEDDING_DEPLOYMENT = ""

# Directorio que contiene las carpetas con los datos
DATA_DIR = ""

def read_header(file_path: str) -> str:
    with open(file_path, "r") as f:
        lines = f.readlines()
    return "\n".join(lines[:3]) + "\n"

def load_and_split_documents(docs_path: str) -> list[dict]:
    """
    Carga documentos desde la carpeta indicada y los divide en trozos.
    Retorna una lista de diccionarios.
    """
    loader = DirectoryLoader(
        docs_path, loader_cls=UnstructuredMarkdownLoader, show_progress=True
    )
    docs = loader.load()
    print(f"loaded {len(docs)} documents from {docs_path}")

    splitter = RecursiveCharacterTextSplitter.from_language(
        language=Language.MARKDOWN, chunk_size=1000, chunk_overlap=100
    )
    split_docs = splitter.split_documents(docs)
    print(f"split into {len(split_docs)} documents")

    final_docs = []
    for i, doc in enumerate(split_docs):
        header = read_header(doc.metadata["source"])
        doc_dict = {
            "id": str(i),
            "content": header + doc.page_content,
            "title": header,
            "sourcefile": os.path.basename(doc.metadata["source"]),
        }
        final_docs.append(doc_dict)

    return final_docs

def get_index(name: str) -> SearchIndex:
    """
    Retorna un índice de Azure Cognitive Search con el nombre indicado.
    """
    fields = [
        SimpleField(name="id", type=SearchFieldDataType.String, key=True),
        SimpleField(name="sourcefile", type=SearchFieldDataType.String),
        SearchableField(name="title", type=SearchFieldDataType.String),
        SearchableField(name="content", type=SearchFieldDataType.String),
        SearchField(
            name="embedding",
            type=SearchFieldDataType.Collection(SearchFieldDataType.Single),
            searchable=True, 
            vector_search_dimensions=1536,
            vector_search_profile_name="myHnswProfile"
        )
    ]

    semantic_config = SemanticConfiguration(
        name="default",
        prioritized_fields=SemanticPrioritizedFields(
            title_field=None,
            keywords_fields=[],
            content_fields=[SemanticField(field_name="content")]
        ),
    )

    vector_search = VectorSearch(
        algorithms=[
            HnswAlgorithmConfiguration(
                name="myHnsw",
                kind=VectorSearchAlgorithmKind.HNSW,
                parameters=HnswParameters(
                    m=4,
                    ef_construction=400,
                    ef_search=500,
                    metric=VectorSearchAlgorithmMetric.COSINE
                )
            ),
            ExhaustiveKnnAlgorithmConfiguration(
                name="myExhaustiveKnn",
                kind=VectorSearchAlgorithmKind.EXHAUSTIVE_KNN,
                parameters=ExhaustiveKnnParameters(
                    metric=VectorSearchAlgorithmMetric.COSINE
                )
            )
        ],
        profiles=[
            VectorSearchProfile(
                name="myHnswProfile",
                algorithm_configuration_name="myHnsw",
            ),
            VectorSearchProfile(
                name="myExhaustiveKnnProfile",
                algorithm_configuration_name="myExhaustiveKnn",
            )
        ]
    )

    semantic_search = SemanticSearch(configurations=[semantic_config])

    index = SearchIndex(
        name=name,
        fields=fields,
        semantic_search=semantic_search,
        vector_search=vector_search,
    )

    return index

def batch_upload_documents(search_client: SearchClient, docs: list[dict], batch_size=1000):
    for i in range(0, len(docs), batch_size):
        batch = docs[i:i+batch_size]
        print(f"Uploading {len(batch)} documents to index")
        search_client.upload_documents(batch)

def process_folder(folder_path: str, search_index_client: SearchIndexClient, aoai_client):
    """
    Procesa una carpeta: carga, divide, embed y sube documentos al índice cuyo nombre
    es el nombre de la carpeta.
    """
    folder_name = os.path.basename(os.path.normpath(folder_path))
    print(f"\nProcesando carpeta '{folder_name}' en ruta: {folder_path}")

    docs = load_and_split_documents(folder_path)
    if not docs:
        print(f"No se encontraron documentos en {folder_path}")
        return

    encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")
    token_sizes = [len(encoding.encode(doc["content"])) for doc in docs]
    batch_size = 16
    num_batches = math.ceil(len(docs) / batch_size)
    print(f"Embedding {len(docs)} documentos en {num_batches} batches de {batch_size}.")
    print(f"Total tokens: {sum(token_sizes)}, promedio tokens: {int(sum(token_sizes) / len(token_sizes))}")

    for i in range(num_batches):
        start_idx = i * batch_size
        end_idx = min(start_idx + batch_size, len(docs))
        batch_docs = docs[start_idx:end_idx]
        embeddings = aoai_client.embeddings.create(
            model=AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
            input=[doc["content"] for doc in batch_docs]
        ).data

        for j, doc in enumerate(batch_docs):
            doc["embedding"] = embeddings[j].embedding

    print(f"Creando índice '{folder_name}'")
    index = get_index(folder_name)
    search_index_client.create_or_update_index(index)

    search_client = SearchClient(
        endpoint=AZURE_SEARCH_ENDPOINT,
        index_name=folder_name,
        credential=AzureKeyCredential(AZURE_SEARCH_KEY),
    )
    print(f"Subiendo {len(docs)} documentos al índice '{folder_name}'")
    batch_upload_documents(search_client, docs)

def load_variables():
    script_dir = os.path.dirname(os.path.realpath(__file__))
    path = os.path.join(os.curdir, script_dir + "/../../.env")
    load_dotenv(path)

    global DATA_DIR
    DATA_DIR = os.path.join(os.curdir, script_dir + "/../../data/azuresearch/")

    # Config de Azure Search.
    global AZURE_SEARCH_ENDPOINT
    AZURE_SEARCH_ENDPOINT = os.getenv("AZURE_SEARCH_ENDPOINT")
    global AZURE_SEARCH_KEY
    AZURE_SEARCH_KEY = os.getenv("AZURE_SEARCH_KEY")
    # Ya no se usa una variable fija para el índice.

    # Config de Azure OpenAI.
    global AZURE_OPENAI_API_TYPE
    AZURE_OPENAI_API_TYPE = "azure"
    global AZURE_OPENAI_API_BASE
    AZURE_OPENAI_API_BASE = os.getenv("AZURE_AI_SERVICES_ENDPOINT")
    global AZURE_OPENAI_API_VERSION
    AZURE_OPENAI_API_VERSION = os.getenv("AZURE_AI_SERVICES_VERSION")
    global AZURE_OPENAI_API_KEY
    AZURE_OPENAI_API_KEY = os.getenv("AZURE_AI_SERVICES_KEY")
    global AZURE_OPENAI_EMBEDDING_DEPLOYMENT
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT = os.getenv("AZURE_AI_EMBEDDING_DEPLOYMENT")

def main():
    openai.api_type = AZURE_OPENAI_API_TYPE
    openai.api_base = AZURE_OPENAI_API_BASE
    openai.api_version = AZURE_OPENAI_API_VERSION
    openai.api_key = AZURE_OPENAI_API_KEY

    # Cliente para administración de índices.  
    search_index_client = SearchIndexClient(
        AZURE_SEARCH_ENDPOINT, AzureKeyCredential(AZURE_SEARCH_KEY)
    )

    # Cliente de Azure OpenAI para embeddings.
    aoai_client = openai.AzureOpenAI(
        api_key=AZURE_OPENAI_API_KEY,  
        api_version=AZURE_OPENAI_API_VERSION,
        azure_endpoint=AZURE_OPENAI_API_BASE 
    )

    # Recorre cada subcarpeta en DATA_DIR y procesa sus documentos.
    for item in os.listdir(DATA_DIR):
        folder_path = os.path.join(DATA_DIR, item)
        if os.path.isdir(folder_path):
            # Opcional: se podría eliminar el índice anterior si existe.
            try:
                print(f"Eliminando índice existente '{item}' (si existe)")
                search_index_client.delete_index(item)
            except Exception as e:
                print(f"No se pudo eliminar el índice '{item}', probablemente no exista. Error: {e}")
            process_folder(folder_path, search_index_client, aoai_client)

if __name__ == "__main__":
    load_variables()
    main()