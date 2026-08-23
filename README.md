# trabalho-aps

[🇧🇷 Português](README.md) · [🇺🇸 English](README.en.md)

Trabalho final da disciplina de Arquitetura e Padrões de Software - CEFET/RJ

## Introdução

Este projeto consiste num sistema de Arquitetura Orientada a Serviços que simula uma aplicação para aluguel de espaços num condomínio residencial.

## Requisitos

- Node >= v20;
- NPM >= v10;
- Java >= 25;
- PostgreSQL >= 17.

## Como executar

1. Crie um novo banco de dados chamado "aps":
```bash
psql=> CREATE DATABASE aps;
```

2. Atualize o nome de usuário e senha do PostgreSQL utilizado em `api/src/main/resources/application.properties` para que a API tenha acesso ao banco de dados;

3. Rode o projeto Spring:
```bash
cd api
./mvnw spring-boot:run # disponível em http://localhost:8080
```

4. Instale os requisitos de cada interface:
```bash
cd frontend-mobile (ou frontend-web)
npm install
```

5. Crie o arquivo de variáveis de ambiente com base no `.env.example`:
```bash
cp .env.example .env
```

6. Execute o projeto Vite:
```bash
npm run dev # disponível em http://localhost:5173
```

> OBS: Para utilizar a aplicação cliente com todas as suas funcionalidades, a API Spring deve ser iniciada antes.