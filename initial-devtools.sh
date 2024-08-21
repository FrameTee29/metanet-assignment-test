#!/bin/sh

# Check if the network already exists
if ! docker network inspect metanet >/dev/null 2>&1; then
    echo "Creating Docker network 'metanet'..."
    docker network create metanet
else
    echo "Docker network 'metanet' already exists, skipping creation."
fi

# Start MySQL service
(
    cd devtools/mysql-metanet && docker compose up -d
)

# Start Redis service
(
    cd devtools/redis-metanet && docker compose up -d
)

# Wait for MySQL to start
echo "Waiting for MySQL to be ready..."
until docker exec mysql-container mysqladmin ping -h "localhost" --silent; do
    sleep 1
done

# Create databases
echo "Creating databases paytanet and metify_shop..."
docker exec -i mysql-container mysql -uroot -p1234 -e "CREATE DATABASE IF NOT EXISTS paytanet; CREATE DATABASE IF NOT EXISTS metify_shop;"