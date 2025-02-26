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

function remove_dangling_images {
    local dangling_images=$(docker images -f "dangling=true" -q)

    if [ -n "$dangling_images" ]; then
        echo "Eliminando imágenes sin nombre..."
        docker rmi $dangling_images
    else
        echo "No hay imágenes sin nombre para eliminar."
    fi
}

function remove_existing_image {
    local image_name="$1"

    # Verificar si la imagen de Docker ya existe
    if [ "$(docker images -q "$image_name")" ]; then
        echo "La imagen de Docker '$image_name' ya existe. Eliminándola..."

        # Detener y eliminar contenedores que usan la imagen
        local container_ids=$(docker ps -a -q --filter ancestor="$image_name")
        if [ -n "$container_ids" ]; then
            echo "Deteniendo y eliminando contenedores que usan la imagen '$image_name'..."
            docker stop $container_ids
            docker rm $container_ids
        fi

        # Eliminar la imagen
        docker rmi "$image_name"
    else
        echo "La imagen de Docker '$image_name' no existe."
    fi
}

function compile_docker_image {
    local image_name="$1"
    local image_version="${2:-latest}"  # Usar "latest" como valor predeterminado si no se proporciona una versión

    # Eliminar imágenes sin nombre
    remove_dangling_images

    # Eliminar la imagen existente si existe
    remove_existing_image "$image_name:$image_version"

    # Compilamos la imagen de Docker
    docker build -t "$image_name:$image_version" ./docker
}

function print_help {
    echo "Uso: $0 <nombre_imagen_docker> [version_imagen]"
    echo "Si no se proporciona [version_imagen], se usará el valor predeterminado."
}

function main {
    local image_name="${1:-$DEFAULT_DOCKER_IMAGE_NAME}"
    local image_version="${2:-$DEFAULT_DOCKER_IMAGE_VERSION}"

    if [ -z "$image_name" ]; then
        echo "Error: No se ha proporcionado un nombre de imagen de Docker y la variable DEFAULT_DOCKER_IMAGE_NAME no está definida."
        print_help
        exit 1
    fi 

    check_login    
    compile_docker_image "$image_name" "$image_version"
}

main "$@"