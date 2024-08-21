#!/bin/sh

# Copy the .env.example file to .env

# Service 1 : Paytanet service
(
    cd paytanet-service && cp .env.example .env
)

# Service 2 : Paytanet frontend
(
    cd paytanet-frontend && cp .env.example .env
)

# Service 3 : Metify Shop service
(
    cd metify-shop-service && cp .env.example .env
)

# Service 4 : Metify Shop frontend
(
    cd metify-shop-frontend && cp .env.example .env
)

# Seed data for paytanet service
(
    cd paytanet-service && npm run seed:run
)

# Seed data for metify shop service
(
    cd metify-shop-service && npm run seed:run
)
