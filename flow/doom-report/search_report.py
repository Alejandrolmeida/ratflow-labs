from promptflow import tool
from azure.cosmos import CosmosClient
from promptflow.connections import CustomConnection

# The inputs section will change based on the arguments of the tool function, after you save the code
# Adding type to arguments and return value will help the system show the types properly
# Please update the function name/signature per need
@tool
def my_python_tool(customerId: str, conn: CustomConnection) -> str:
    client = CosmosClient(url=conn.configs["endpoint"], credential=conn.secrets["key"])
    db = client.get_database_client(conn.configs["databaseId"])    
    container = db.get_container_client(conn.configs["containerId"])
    
    response = container.read_item(item=customerId, partition_key=customerId)
    services = response["services"]
    services = sorted(services, key=lambda x: x["Severity"], reverse=True)
    response["services"] = services[-10:]
    return response
