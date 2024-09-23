# Depositify

This document contains information about the project structure, services, and how to run the project.

To read about the development approach, please refer to the [development approach](./docs/development-approach.md) document.

## Overview

Depositify is a modern banking platform that provides a range of services to its customers. The platform is built using a microservices architecture, with each service being responsible for a specific feature or functionality.

## Project Structure

Project is organized as a monorepo using Turborepo and npm workspaces.

- `backend` - Contains all backend services
- `frontend` - Contains all frontend applications

## Services

- [Calculations Service](./backend/calculations-service/README.md) - The calculations service for Depositify

## Frontend

- [Web](./frontend/web/README.md) - The web frontend for Depositify

## Prerequisites

- Node.js (v22.9.0) - use Volta to select Node.js version
- npm (v10.9.0)
- Docker
- Docker Compose

## How to run (preffered)

Just run `docker compose up` to start calculations service, web frontend and Caddy.

## Installation and running manually

You can install dependencies and run apps and services locally using the following commands:

1. Install dependencies:

Local setup uses Caddy as a reverse proxy and a local .env file for environment variables.
Caddy points to the local frontend and backend services from docker services. As I'm using Mac it points to `host.docker.internal`.
Might be different for other operating systems.

```
npm install
```

2. Run apps and services:

```
npm run turbo start:all
```

3. Run Caddy:

```
docker compose up -f docker-compose.local.yml -d
```

## Applications

Access the applications via the following URLs:

- Web: http://localhost:3000
- API: http://localhost:4000/api/calculations
- Open API Docs: http://localhost:4000/api/calculations/docs

## Tests

You can find unit tests for calculations in `backend/calculations-service/src/calculators/calculators.service.spec.ts`.

End to end tests for backend API you can find in `backend/calculations-service/src/deposits-savings-calculator/deposits-savings-calculator.controller.spec.ts`.

Frontend unit tests you can find in `frontend/web/src/components/__tests__/Header.spec.ts`.

~~Frontend end to end tests you can find in `frontend/web/e2e`.~~
