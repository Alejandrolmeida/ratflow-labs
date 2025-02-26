set -e

scriptDir=$(dirname "$(realpath "$0")")

# Load environment variables from .env file
if [ -f "$scriptDir/../.env" ]; then
    source "$scriptDir/../.env"
fi

function publish_process {
    # Volvemos a crear la carpeta de docker con todos los ficheros actualizados    
    #"$scriptDir/create-docker-folder.sh" "$1" "$2"

    # Creamos la imagen con la receta nueva y carpeta recien generada
    #"$scriptDir/build-image.sh" "$1" "$2"

    # Publicamos al ACR la nueva imagen 
    "$scriptDir/publish-image.sh" "$1" "$2"

    # Actualizamos las settings del App Service para que genere un nuevo contenedor con la imagen actualizada
    #"$scriptDir/update-appservice.sh" "$1" "$2"

    # Mostramos la version actual del contenedor
    #"$scriptDir/read-appservice.sh"
}

function main {
    local image_name="${1:-$DEFAULT_DOCKER_IMAGE_NAME}"
    local image_version="${2:-$DEFAULT_DOCKER_IMAGE_VERSION}"

    # Ejecutamos el proceso completo de publicacion de la imagen
    publish_process "$image_name" "$image_version"

    
    echo "Publicacion correcta de la imagen $DEFAULT_DOCKER_IMAGE_NAME con etiqueta $DEFAULT_DOCKER_IMAGE_VERSION"
}

main "$@"