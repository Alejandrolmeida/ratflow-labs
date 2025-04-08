#!/usr/bin/env python3

import csv
import json
import os
from azure.cosmos import CosmosClient, PartitionKey
from dotenv import load_dotenv

load_dotenv()

COSMOS_ENDPOINT = os.environ.get("COSMOS_ENDPOINT")
COSMOS_KEY = os.environ.get("COSMOS_KEY")
COSMOS_DB_NAME = os.environ.get("COSMOS_DATABASE_NAME", "doomreport")
COSMOS_CONTAINER_NAME = os.environ.get("COSMOS_CONTAINER_NAME", "services")

def read_csv(file_path):
    with open(file_path, mode='r') as file:
        reader = csv.DictReader(file)
        return [row for row in reader]

def upload_items_to_cosmos(services_data):
    if not COSMOS_ENDPOINT.startswith("http"):
        print("No se ha establecido un endpoint válido para Cosmos.")
        return
    if COSMOS_KEY.startswith("<"):
        print("No se ha establecido una clave válida para Cosmos.")
        return
    client = CosmosClient(COSMOS_ENDPOINT, credential=COSMOS_KEY)
    database = client.create_database_if_not_exists(id=COSMOS_DB_NAME)
    container = database.create_container_if_not_exists(
        id=COSMOS_CONTAINER_NAME,
        partition_key=PartitionKey(path="/Impact")
    )
    for i, service in enumerate(services_data, start=1):
        item = {"id": str(i), **service}
        container.upsert_item(item)

def process_files():
    base_path = '../../data/azqr/report'
    advisor_data = read_csv(os.path.join(base_path, 'azqr_report_2025_02_26_T150613.advisor.csv'))
    costs_data = read_csv(os.path.join(base_path, 'azqr_report_2025_02_26_T150613.costs.csv'))
    services_data = read_csv(os.path.join(base_path, 'azqr_report_2025_02_26_T150613.services.csv'))
    defender_data = read_csv(os.path.join(base_path, 'azqr_report_2025_02_26_T150613.defender.csv'))

    result = [
        {
            "id": "1",
            "Name": "Boss Labs",
            "Subscription": os.environ.get("SUBSCRIPTION_ID", "f2e4cd19-7c93-4a22-a9b3-df34a6e7c0af"),
            "Tenant": os.environ.get("TENANT_ID", "123e4567-e89b-12d3-a456-426614174000"),
            "advisor": advisor_data,
            "costs": costs_data,
            "services": services_data,
            "defender": defender_data
        }
    ]

    with open('output.json', 'w') as json_file:
        json.dump(result, json_file, indent=4)

    upload_items_to_cosmos(services_data)

if __name__ == "__main__":
    process_files()
