# trabalho-aps

[🇧🇷 Português](README.md) · [🇺🇸 English](README.en.md)

Final project for the Software Architecture and Patterns course - CEFET/RJ

## Introduction

This project consists of a Service-Oriented Architecture system that simulates an application for renting spaces in a residential apartment complex.

## Requirements

- Node >= v20;
- NPM >= v10;
- Java >= 25;
- PostgreSQL >= 17.

## How to run

1. Create a new database named "aps":
```bash
psql=> CREATE DATABASE aps;
```

2. Update the PostgreSQL username and password in `api/src/main/resources/application.properties` so the API can connect to the database;

3. Run the Spring project:
```bash
cd api
./mvnw spring-boot:run # available at http://localhost:8080
```

4. Install the dependencies for each frontend:
```bash
cd frontend-mobile (or frontend-web)
npm install
```

5. Create the environment variables file based on `.env.example`:
```bash
cp .env.example .env
```

6. Run the Vite project:
```bash
npm run dev # available at http://localhost:5173
```

> NOTE: To use the client application with all its features, the Spring API must be started first.
