#!/usr/bin/env python3

import os
from pathlib import Path

from promptflow.client import PFClient
from promptflow.entities import (
    AzureOpenAIConnection,
    CustomConnection,
    CognitiveSearchConnection,
)
from dotenv import load_dotenv


def load_environment():
    dotenv_path = Path(__file__).parent.parent / ".env"
    load_dotenv(dotenv_path)
    print(f"Loaded environment variables from {dotenv_path}")


def create_azure_openai_connection(pf: PFClient, project: str):
    AI_KEY = os.environ["AZURE_AI_SERVICES_KEY"]
    AI_ENDPOINT = os.environ["AZURE_AI_SERVICES_ENDPOINT"]
    AI_VERSION = os.environ["AZURE_AI_SERVICES_VERSION"]
    connection_name = f"oai_{project}"

    connection = AzureOpenAIConnection(
        name=connection_name,
        api_key=AI_KEY,
        api_base=AI_ENDPOINT,
        api_type="azure",
        api_version=AI_VERSION,
    )

    print(f"Creating connection {connection.name}...")
    result = pf.connections.create_or_update(connection)
    print(result)
    return result


def create_cosmos_connection(pf: PFClient, project: str):
    COSMOS_ENDPOINT = os.environ["COSMOS_ENDPOINT"]
    COSMOS_KEY = os.environ["COSMOS_KEY"]
    DATABASE_ID = os.environ["COSMOS_DATABASE_NAME"]
    CONTAINER_NAME = os.environ["COSMOS_CONTAINER_NAME"]
    connection_name = f"cosmos_{project}"

    connection = CustomConnection(
        name=connection_name,
        configs={
            "endpoint": COSMOS_ENDPOINT,
            "databaseId": DATABASE_ID,
            "container": CONTAINER_NAME,
        },
        secrets={"key": COSMOS_KEY},
    )

    print(f"Creating connection {connection.name}...")
    result = pf.connections.create_or_update(connection)
    print(result)
    return result


def create_search_connection(pf: PFClient, project: str):
    SEARCH_ENDPOINT = os.environ["AZURE_SEARCH_ENDPOINT"]
    SEARCH_KEY = os.environ["AZURE_SEARCH_KEY"]
    API_VERSION = os.environ["AZURE_AI_SERVICES_VERSION"]
    connection_name = f"search_{project}"

    connection = CognitiveSearchConnection(
        name=connection_name,
        api_key=SEARCH_KEY,
        api_base=SEARCH_ENDPOINT,
        api_version=API_VERSION,
    )

    print(f"Creating connection {connection.name}...")
    result = pf.connections.create_or_update(connection)
    print(result)
    return result


def main():
    load_environment()
    project = os.environ["PROJECT_NAME"]
    pf = PFClient()

    create_azure_openai_connection(pf, project)
    create_cosmos_connection(pf, project)
    create_search_connection(pf, project)


if __name__ == "__main__":
    main()