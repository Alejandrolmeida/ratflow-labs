# Variables
$acrName = "acrcopilotcspfpinas"
$acrLoginServer = "$acrName.azurecr.io"
$imageName = "ratflow-app"
$imageTag = "0.1"
$fullImageName = "${acrLoginServer}/${imageName}:${imageTag}"

# Iniciar sesión en Azure
az login

# Construir la imagen de Docker
docker build -t "${imageName}:${imageTag}" .

# Etiquetar la imagen
docker tag "${imageName}:${imageTag}" $fullImageName

# Iniciar sesión en ACR
az acr login --name $acrName

# Comprobar si la imagen existe en el ACR
$imageExists = az acr repository show-tags --name $acrName --repository $imageName --query "contains(@, '$imageTag')" --output tsv

if ($imageExists -eq "true") {
    # Eliminar la imagen existente del ACR
    az acr repository delete --name $acrName --image "${imageName}:${imageTag}" --yes
    Write-Host "La imagen $fullImageName existente ha sido eliminada del ACR."
} else {
    Write-Host "No se encontró una imagen existente con el nombre $imageName y la etiqueta $imageTag en el ACR."
}

# Subir la nueva imagen a ACR
docker push $fullImageName

Write-Host "La imagen $fullImageName se ha subido correctamente a $acrLoginServer"