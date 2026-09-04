# trabalho-aps

[🇧🇷 Português](README.md) · [🇺🇸 English](README.en.md)

Final project for the Software Architecture and Patterns course at CEFET/RJ.

## Introduction

This project consists of a Service-Oriented Architecture system that simulates an application for renting spaces in a residential condominium.

## Requirements

- Node.js 22.12 or newer;
- npm 10 or newer;
- JDK 25;
- PostgreSQL 17.

These are the versions targeted by the project. Newer major versions may work, but they have not necessarily been tested.

## How to run

### 1. Clone the repository

```console
git clone https://github.com/erickMartinsSilva/trabalho-aps.git
cd trabalho-aps
```

The following steps assume that you are in the repository's root directory.

### 2. Prepare the database

Make sure PostgreSQL is running. Then, create a database named `aps`:

```console
psql -U [USERNAME] -c "CREATE DATABASE aps;"
```

If the `psql` command is not available in your `PATH`, use the executable's full path or create the `aps` database through pgAdmin.

### 3. Configure API access to PostgreSQL

Open `api/src/main/resources/application.properties` and replace the values of the following properties with your PostgreSQL credentials:

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

The default connection URL assumes that PostgreSQL is available locally on port `5432` and that the database is named `aps`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/aps
```

Do not commit personal credentials to the repository.

### 4. Start the API

#### Linux and macOS

```console
cd api
./mvnw spring-boot:run
```

#### Windows PowerShell

```powershell
cd api
.\mvnw.cmd spring-boot:run
```

The API will be available at `http://localhost:8080`. Keep this process running while using either frontend.

### 5. Start a frontend

#### Web frontend

Linux and macOS:

```console
cd frontend-web
npm ci
cp .env.example .env
npm run dev
```

Windows PowerShell:

```powershell
cd frontend-web
npm ci
Copy-Item .env.example .env
npm run dev
```

#### Mobile frontend

Linux and macOS:

```console
cd frontend-mobile
npm ci
cp .env.example .env
npm run dev
```

Windows PowerShell:

```powershell
cd frontend-mobile
npm ci
Copy-Item .env.example .env
npm run dev
```

Vite will normally make the frontend available at `http://localhost:5173`. If both frontends are started simultaneously, it may select a different port for the second process; refer to the address displayed in the terminal.

## Verification

After completing the setup:

1. Confirm in the API terminal that Spring started without errors;
2. Open `http://localhost:8080/ws/usuario.wsdl` and confirm that the WSDL is displayed;
3. Open the address displayed by Vite, normally `http://localhost:5173`;
4. Confirm that the frontend can communicate with the API.