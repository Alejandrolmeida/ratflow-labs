#!/bin/bash

set -e

scriptDir=$(dirname "$(realpath "$0")")

# Cargar variables de entorno desde .env si existe
if [ -f "$scriptDir/../../.env" ]; then
    source "$scriptDir/../../.env"
fi

# Función para verificar que las variables requeridas estén definidas
function check_required_vars {
    local missing=false

    for var in ACR_NAME TENANT_ID SUBSCRIPTION_ID DEFAULT_DOCKER_IMAGE_NAME DEFAULT_DOCKER_IMAGE_VERSION; do
        if [ -z "${!var}" ]; then
            echo "Error: La variable de entorno '$var' no está definida."
            missing=true
        fi
    done

    if [ "$missing" = true ]; then
        exit 1
    fi
}

function login {
    az login --use-device-code -t $TENANT_ID
    az account set --subscription $SUBSCRIPTION_ID
}

function check_login {
    if [ -z "$(az account show)" ]; then
        login
    fi
}

function remove_existing_image_acr {
    local image_name="$1"
    local image_version="$2"

    # Eliminar la imagen existente en ACR si existe
    if az acr repository show --name "$ACR_NAME" --image "$image_name:$image_version" > /dev/null 2>&1; then
        az acr repository delete --name "$ACR_NAME" --image "$image_name:$image_version" --yes
    else
        echo "La imagen $image_name:$image_version no existe en el registro ACR."
    fi
}

function publish_docker_image {
    local image_name="$1"
    local image_version="$2"

    # Etiquetar la imagen de Docker
    docker tag "$image_name:$image_version" "$ACR_NAME.azurecr.io/$image_name:$image_version"

    # Iniciar sesión en el registro de contenedores de Azure
    az acr login --name "$ACR_NAME"

    # Subir la imagen de Docker al registro de contenedores de Azure
    docker push "$ACR_NAME.azurecr.io/$image_name:$image_version"
}

function print_help {
    echo "Uso: $0 <nombre_imagen_docker> <version_imagen>"
    echo "Si no se proporciona <nombre_imagen_docker>, se usará el valor predeterminado: $DEFAULT_DOCKER_IMAGE_NAME."
    echo "Si no se proporciona <version_imagen>, se usará la versión predeterminada: $DEFAULT_DOCKER_IMAGE_VERSION."
}

function main {
    check_required_vars

    local image_name="${1:-$DEFAULT_DOCKER_IMAGE_NAME}"
    local image_version="${2:-$DEFAULT_DOCKER_IMAGE_VERSION}"

    if [ -z "$image_name" ]; then
        echo "Error: No se ha proporcionado un nombre de imagen de Docker y la variable DEFAULT_DOCKER_IMAGE_NAME no está definida."
        print_help
        exit 1
    fi

    check_login
    remove_existing_image_acr "$image_name" "$image_version"
    publish_docker_image "$image_name" "$image_version"
}

main "$@"