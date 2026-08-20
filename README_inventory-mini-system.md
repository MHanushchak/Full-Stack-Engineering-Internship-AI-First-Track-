# Test Task: Inventory Mini System

## Goal

Create a simple full-stack application for managing products in inventory.

Recommended time: **about 1 hour**.

The task is intentionally small. Do not try to build a perfect production system. The goal is to show basic full-stack understanding: simple UI, API, database, Docker, and ability to explain the code.

AI tools are allowed for development: ChatGPT, Claude, Cursor, Copilot, etc.  
Do **not** connect any AI API inside the project.


---

## Tech Stack

Preferred backend stack:

- **Node.js** or **Java**

But this is not strict. You may use another backend technology if you are more comfortable with it.

Frontend:

- React / Vue / Angular / plain HTML + JS

Database:

- PostgreSQL is preferred
- SQLite is acceptable if PostgreSQL setup takes too much time

Docker:

- Docker Compose is required
- At minimum, backend and database should run in Docker
- Frontend can run in Docker or separately, but Docker setup is preferred

---

## What to Build

The user should be able to manage products.

Required features:

- View product list
- Add product
- Edit product
- Delete product
- Change product quantity
- Show product status based on quantity

---

## Product Fields

Each product should have:

```txt
id
name
quantity
price
status
createdAt
```

Optional:

```txt
description
updatedAt
```

---

## Product Status

Status can be calculated from quantity:

```txt
quantity = 0          -> out_of_stock
quantity 1 to 5       -> low_stock
quantity more than 5  -> in_stock
```

---

## Frontend Tasks

Create a simple UI with:

- Product list
- Form to add product
- Edit button or edit form
- Delete button
- Visible product status
- Basic loading or error message

The design can be very simple.

---

## Backend Tasks

Create REST API endpoints:

```txt
GET    /products
POST   /products
PATCH  /products/:id
DELETE /products/:id
```

Optional:

```txt
GET /products/:id
```

Basic validation:

- `name` is required
- `quantity` cannot be negative
- `price` cannot be negative

---

## Database

Create one table:

```txt
products
```

Recommended structure:

```txt
id
name
quantity
price
status
created_at
```

You may use:

- Prisma
- TypeORM
- Sequelize
- Spring Data JPA
- Hibernate
- Raw SQL
- Any other simple database approach

The database must store products permanently, not only in memory.

Example database URL:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/inventory_db
```

---

## Docker

The project should run with:

```bash
docker compose up --build
```

Required services:

```txt
backend
database
```

Preferred services:

```txt
frontend
backend
database
```

Recommended ports:

```txt
frontend: http://localhost:3000
backend:  http://localhost:4000
database: localhost:5432
```

Example Docker Compose idea:

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/inventory_db
    depends_on:
      - postgres

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: inventory_db
    ports:
      - "5432:5432"
```

Frontend Docker is a bonus, but recommended.

---

## Suggested Structure

```txt
inventory-mini-system/
  frontend/
  backend/
  docker-compose.yml
  README.md
```

---

## README Requirements

Your final README must include:

- How to run the project
- Technologies used
- API endpoints
- Database description
- Docker description
- What is completed
- What is not completed
- How AI was used

Add this section:

```md
## AI Usage Report

- AI tool used:
- What I used AI for:
- 2–3 example prompts:
- What I changed manually:
- What was difficult:
```

---

## Recording Requirement

Record the development process.

The video does not need to be one continuous recording. You can pause it.

The recording should show:

1. Project setup
2. AI usage
3. Backend implementation
4. Database setup
5. Frontend implementation
6. Docker setup
7. Running the project
8. Creating a product
9. Editing a product
10. Deleting a product
11. Short explanation of the project structure

---

## Submission

Submit:

- Git repository link or project archive
- Video recording link or file
- Short note if something does not work
