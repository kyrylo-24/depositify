# Calculations Service

Go back to [README](../../README.md)

## Overview

The Calculations Service is a microservice built using Nest.js that provides various banking-related calculations. This service is responsible for handling all calculations related to banking operations.

## Features

- Deposit calculations (e.g., interest earned, final balance)

## Technology Stack

1. Typescript
2. Nest.js

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run turbo start:dev --filter @depositify/calculations-service`

## API Endpoints

The service exposes various endpoints for different types of calculations. Here are some examples:

- `POST /deposits-savings-calculator/deposits/cash`: Calculate final balance and interest for cash deposits

Refer to the API documentation for a complete list of endpoints and their usage. Available at http://localhost:3000/api
