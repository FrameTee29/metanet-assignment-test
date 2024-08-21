#!/bin/sh

# Copy the .env.example file to .env

# Service 1 : Paytanet service
(
    cd paytanet-service && cp .env.example .env && npm install
)

# Service 2 : Paytanet frontend
(
    cd paytanet-frontend && cp .env.example .env.development.local && npm install
)

# Service 3 : Metify Shop service
(
    cd metify-shop-service && cp .env.example .env && npm install
)

# Service 4 : Metify Shop frontend
(
    cd metify-shop-frontend && cp .env.example .env.development.local && npm install
)
