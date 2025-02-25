#!/bin/bash

set -e

scriptDir=$(dirname "$(realpath "$0")")

# Load environment variables from .env file
if [ -f "$scriptDir/../../.env" ]; then
    source "$scriptDir/../../.env"
fi


function login {
    az login --use-device-code -t $TENANT_ID
    az account set --subscription $SUBSCRIPTION_ID
}

function check_login {
    if [ -z "$(az account show)" ]; then
        login
    fi
}

function create_resource_group {
    echo "Creating resource group $RESOURCE_GROUP in $LOCATION..."
    if [ -z "$(az group show --name $RESOURCE_GROUP)" ]; then
        az group create --name $RESOURCE_GROUP --location $LOCATION > /dev/null
    else 
        echo "Resource group $RESOURCE_GROUP already exists. Skipping creation..."
    fi
}

function provision_resources {
    echo "Provisioning resources in resource group $$RESOURCE_GROUP..."
    az deployment group create \
        --resource-group $RESOURCE_GROUP \
        --name $DEPLOYMENT_NAME \
        --template-file main.bicep \
        --parameters location=$LOCATION project=$PROJECT_NAME > /dev/null
}

function setup_environment_variables {
    echo "Setting up environment variables in .env file..."
    # Save output values to variables
    openAIService=$(az deployment group show --name $DEPLOYMENT_NAME --resource-group $RESOURCE_GROUP --query properties.outputs.openai_name.value -o tsv)
    searchService=$(az deployment group show --name $DEPLOYMENT_NAME --resource-group $RESOURCE_GROUP --query properties.outputs.search_name.value -o tsv)
    cosmosService=$(az deployment group show --name $DEPLOYMENT_NAME --resource-group $RESOURCE_GROUP --query properties.outputs.cosmos_name.value -o tsv)
    searchEndpoint=$(az deployment group show --name $DEPLOYMENT_NAME --resource-group $RESOURCE_GROUP --query properties.outputs.search_endpoint.value -o tsv)
    openAIEndpoint=$(az deployment group show --name $DEPLOYMENT_NAME --resource-group $RESOURCE_GROUP --query properties.outputs.openai_endpoint.value -o tsv)
    cosmosEndpoint=$(az deployment group show --name $DEPLOYMENT_NAME --resource-group $RESOURCE_GROUP --query properties.outputs.cosmos_endpoint.value -o tsv)
    mlProjectName=$(az deployment group show --name $DEPLOYMENT_NAME --resource-group $RESOURCE_GROUP --query properties.outputs.mlproject_name.value -o tsv)

    # Get keys from services
    searchKey=$(az search admin-key show --service-name $searchService --resource-group $RESOURCE_GROUP --query primaryKey --output tsv)
    apiKey=$(az cognitiveservices account keys list --name $openAIService --resource-group $RESOURCE_GROUP --query key1 --output tsv)
    cosmosKey=$(az cosmosdb keys list --name $cosmosService --resource-group $RESOURCE_GROUP --query primaryMasterKey --output tsv)

    # Write environment variables to .env file
    echo "# AZURE AI SERVICES  " >> ../../.env
    echo "AZURE_AI_SERVICES_ENDPOINT=$openAIEndpoint" >> ../../.env
    echo "AZURE_AI_SERVICES_KEY=$apiKey" >> ../../.env
    echo "AZURE_AI_SERVICES_VERSION=2024-02-15-preview" >> ../../.env
    echo "AZURE_AI_GPT_DEPLOYMENT=gpt-4o" >> ../../.env
    echo "AZURE_AI_EMBEDDING_DEPLOYMENT=text-embedding-3-small" >> ../../.env      
    echo " " >> ../../.env
    echo "# AZURE COSMOS  " >> ../../.env 
    echo "COSMOS_ENDPOINT=$cosmosEndpoint" >> ../../.env
    echo "COSMOS_KEY=$cosmosKey" >> ../../.env
    echo " " >> ../../.env
    echo "# AZURE SEARCH" >> ../../.env
    echo "AZURE_SEARCH_ENDPOINT=$searchEndpoint" >> ../../.env
    echo "AZURE_SEARCH_KEY=$searchKey" >> ../../.env
    echo "AZURE_SEARCH_INDEX_NAME=azure-well-architected" >> ../../.env
    
}

function write_config_json {
    echo "Writing config.json file for PromptFlow usage..."
    subscriptionId=$(az account show --query id -o tsv)
    echo "{\"subscription_id\": \"$subscriptionId\", \"resource_group\": \"$RESOURCE_GROUP\", \"workspace_name\": \"$mlProjectName\"}" > ../../config.json
}

function main {
    check_login
    create_resource_group
    provision_resources
    setup_environment_variables
    write_config_json

    echo "Provisioning complete!"
}

main
