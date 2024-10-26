from dotenv import load_dotenv
load_dotenv()
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
import os
import json

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Specify the index name
index_name = "wellness_resources"

# Create a Pinecone index if it doesn't already exist
if index_name not in pc.list_indexes():
    pc.create_index(
        name=index_name,
        dimension=1536,  # Adjust as necessary for your embeddings
        metric="cosine",  # You can keep this or change it based on your needs
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )
else:
    print(f"Index '{index_name}' already exists.")

# Load the wellness resource data
data = json.load(open("wellness_resources.json"))

processed_data = []
client = OpenAI()

# Create embeddings for each resource
for resource in data["wellness_resources"]:
    response = client.embeddings.create(
        input=resource['description'],  # Use the description for embedding
        model="text-embedding-3-small"
    )
    embedding = response.data[0].embedding
    processed_data.append(
        {
            "values": embedding,
            "id": resource["title"],  # Using title as the unique ID
            "metadata": {
                "title": resource["title"],
                "category": resource["category"],
            }
        }
    )

# Insert the embeddings into the Pinecone index
index = pc.Index(index_name)
upsert_response = index.upsert(
    vectors=processed_data,
    namespace="ns1",
)
print(f"Upserted count: {upsert_response['upserted_count']}")

# Print index statistics
print(index.describe_index_stats())
