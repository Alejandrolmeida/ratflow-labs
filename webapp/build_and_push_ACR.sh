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

# Variables
acrName=$ACR_NAME
acrLoginServer="$acrName.azurecr.io"
imageName="rat_flow_app"
imageTag="0.1"
fullImageName="${acrLoginServer}/${imageName}:${imageTag}"

# Iniciar sesión en Azure
check_login

# Construir la imagen de Docker
docker build -t "${imageName}:${imageTag}" .

# Etiquetar la imagen
docker tag "${imageName}:${imageTag}" "$fullImageName"

# Iniciar sesión en ACR
az acr login --name "$acrName"

# Comprobar si la imagen existe en el ACR
imageExists=$(az acr repository show-tags --name "$acrName" --repository "$imageName" --query "contains(@, '$imageTag')" --output tsv)

if [ "$imageExists" == "true" ]; then
    # Eliminar la imagen existente del ACR
    az acr repository delete --name "$acrName" --image "${imageName}:${imageTag}" --yes
    echo "La imagen $fullImageName existente ha sido eliminada del ACR."
else
    echo "No se encontró una imagen existente con el nombre $imageName y la etiqueta $imageTag en el ACR."
fi

# Subir la nueva imagen a ACR
docker push "$fullImageName"

echo "La imagen $fullImageName se ha subido correctamente a $acrLoginServer"