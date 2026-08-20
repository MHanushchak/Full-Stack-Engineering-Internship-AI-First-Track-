# Inventory Mini System

Developed by Mykhailo Hanushchak.

## How to run the project

Make sure you have Docker and Docker Desktop installed and running.

1. Open a terminal in the root directory of the project.
2. Run the following command:
   `docker compose up --build`
3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database: localhost:5432

## Technologies used

- **Backend:** Node.js with NestJS, TypeORM
- **Frontend:** React, Vite, Axios, React Query (TanStack)
- **Database:** PostgreSQL
- **Infrastructure:** Docker & Docker Compose

## API endpoints

- `GET /products` - Retrieve all products
- `GET /products/:id` - Retrieve a specific product by ID
- `POST /products` - Create a new product
- `PATCH /products/:id` - Update an existing product (e.g., quantity)
- `DELETE /products/:id` - Delete a product

## Database description

The database is PostgreSQL, running inside a Docker container. It contains a single table named `products` with the following structure:

- `id` (UUID, Primary Key)
- `name` (String, Required)
- `description` (Text, Optional)
- `quantity` (Integer, Required, Minimum: 0)
- `price` (Decimal/Float, Required, Minimum: 0)
- `status` (Enum: 'out_of_stock', 'low_stock', 'in_stock' - automatically calculated via TypeORM hooks)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Docker description

The project uses Docker Compose to orchestrate three services:

1. **postgres:** Uses the `postgres:16-alpine` image, maps to port 5432, and includes a health check. A named volume is used for data persistence.
2. **backend:** Uses `node:22-alpine` to build and run the NestJS API. It waits for the database to be healthy before starting and maps to port 4000.
3. **frontend:** Uses `node:22-alpine` to run the React development server via Vite, mapping to port 3000. It proxies requests to the backend.

## What is completed

- Full-stack project setup with NestJS and React.
- REST API with validation (name required, non-negative price/quantity).
- PostgreSQL database integration via TypeORM.
- Automated product status calculation based on quantity.
- React UI with product listing, creation, editing, and deletion.
- State and loading/error management using React Query.
- Fully working Docker Compose setup for all three services.

## What is not completed

- All required features and bonus Docker requirements were completed successfully.

## AI Usage Report

- **AI tool used:** Gemini
- **What I used AI for:** I used AI to generate the initial Dockerfile configurations, set up the TypeORM entity and validation DTOs, and troubleshoot environment-specific bugs during the Docker build process.
- **2–3 example prompts:**
  1. "Write docker compose and Docker files for empty projects with Nest and React."
  2. "Use Typeorm, create Products model, and DTO with fields id, name, quantity, price, status."
  3. "I am getting an npm error 'Cannot read properties of undefined (reading extraneous)' when building the frontend Docker container."
- **What I changed manually:** I manually integrated the AI-generated React Query hooks into my UI component structure, adjusted the frontend styling, and controlled the Docker volume resets to fix database schema conflicts.
- **What was difficult:** Troubleshooting the Docker-specific network issues (like `ECONNREFUSED` when the backend tried to connect to the database via localhost instead of the Docker service name) and resolving the `npm install` lockfile conflicts inside the Alpine Linux container.
