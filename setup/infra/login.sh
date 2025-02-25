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
    account_output=$(az account show 2>/dev/null)
    if [ -z "$account_output" ]; then
        login
        return
    fi

    current_tenant=$(echo "$account_output" | jq -r '.tenantId')
    current_subscription=$(echo "$account_output" | jq -r '.id')

    if [ "$current_tenant" != "$TENANT_ID" ] || [ "$current_subscription" != "$SUBSCRIPTION_ID" ]; then
        login
        return
    fi
}

function show_login_success {
    echo "Se ha realizado login correctamente en el Tenant $TENANT_ID y la suscripción $SUBSCRIPTION_ID."
}

function main {
    check_login
    show_login_success
}

main