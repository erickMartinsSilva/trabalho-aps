# trabalho-aps
Trabalho final da disciplina de Arquitetura e Padrões de Software - CEFET/RJ

## Introdução

Este projeto consiste num sistema de Arquitetura Orientada a Serviços que simula uma aplicação para aluguel de espaços num condomínio residencial.

## Requisitos

- Node v20 ou maior;
- NPM v10 ou maior;
- Java 25 ou maior;
- PostgreSQL 17 ou maior.

## Como executar

1. Crie um novo banco de dados PostgreSQL chamado "aps":
```
psql=> CREATE DATABASE aps;
```

2. Instale os requisitos da API e rode o projeto Spring (ele ficará disponível na porta 8080 do seu localhost):
```
cd api
./mvnw install
./mvnw spring-boot:run
```

3. Instale os requisitos de cada interface e rode o projeto Vite (ele ficará disponível na porta 5173 do seu localhost):
```
cd frontend-mobile (ou frontend-web)
npm install
npm run dev
```