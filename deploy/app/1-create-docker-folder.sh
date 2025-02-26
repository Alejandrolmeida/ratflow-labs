#!/bin/bash

set -e

scriptDir=$(dirname "$(realpath "$0")")

# Load environment variables from .env file
if [ -f "$scriptDir/../../.env" ]; then
    source "$scriptDir/../../.env"
fi

# Convert PROJECT_NAME to uppercase
PROJECT_NAME_UPPER=$(echo "$PROJECT_NAME" | tr '[:lower:]' '[:upper:]')


function login {
    az login --use-device-code -t $TENANT_ID
    az account set --subscription $SUBSCRIPTION_ID
}

function check_login {
    if [ -z "$(az account show)" ]; then
        login
    fi
}

function clean_docker_folder {
    local docker_dir="$scriptDir/docker"

    # Eliminar todos los archivos en la carpeta de destino
    if [ -d "$docker_dir" ]; then
        rm -rf "$docker_dir"/*
    else
        mkdir -p "$docker_dir"
    fi
}

function create_docker_folder {
    # Creamos un flujo de promptflow en formato Docker
    pf flow build --source $scriptDir/../../flow/$FLOW_FOLDER --output $scriptDir/docker --format docker

}

function create_env_file {    
    local docker_dir="$scriptDir/docker"
    local env_file="$docker_dir/.env"

    # Crear el archivo settings.json con la estructura especificada
    cat <<EOF > "$env_file"
COSMOS_${PROJECT_NAME_UPPER}_KEY=${COSMOS_KEY^^}
OAI_${PROJECT_NAME_UPPER}_API_KEY=$AZURE_AI_SERVICES_KEY
SEARCH_${PROJECT_NAME_UPPER}_API_KEY=$AZURE_SEARCH_KEY
EOF
}

# crear el archivo settings.json con la estructura especificada 
function  create_settings_file {
    local docker_dir="$scriptDir/docker"
    local settings_file="$docker_dir/settings.json"

    cat <<EOF > "$settings_file"
{
    "COSMOS_${PROJECT_NAME_UPPER}_KEY": "$COSMOS_KEY",
    "OAI_${PROJECT_NAME_UPPER}_API_KEY": "$AZURE_AI_SERVICES_KEY",
    "SEARCH_${PROJECT_NAME_UPPER}_API_KEY": "$AZURE_SEARCH_KEY"    
}
EOF
}

function copy_requirements_file {
    local docker_dir="$scriptDir/docker"
    local requirements_file="$scriptDir/requirements.txt"

    # Copiar el archivo requirements.txt a la carpeta docker
    if [ -f "$requirements_file" ]; then
        cp "$requirements_file" "$docker_dir/flow/"
    else
        echo "WARNING: Si desea agregar su propio fichero requirements.txt personalizado debe copiarlo en este directorio antes de ejecutar el script."
    fi
}

function main {
    check_login
    clean_docker_folder
    create_docker_folder
    copy_requirements_file
    #create_env_file
    #create_settings_file
}

main