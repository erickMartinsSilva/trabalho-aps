<h1 align="center">trabalho-aps</h1>

## Introdução

Este repositório consiste num projeto para a avaliação final da disciplina de Arquitetura e Padrões de Software do CEFET/RJ, em que foi proposto a criação de um sistema Orientado a Serviços
para digitalizar o processo de aluguel de espaços num condomínio.

## Arquitetura

Este projeto é composto por três serviços:

- Uma interface gráfica feita para dispositivos mobile, idealmente utilizada pelos moradores e o administrador geral;
- Uma interface gráfica feita para desktops, idealmente utilizada pelo porteiro por meio de um computador;
- Um servidor SOAP conectado a um banco de dados PostgreSQL que hospeda webserviços em WSDL para as duas interfaces gráficas.

As interfaces gráficas realizam requisições e trocam informações com o servidor por meio de requisições SOAP, onde seus corpos são compostos por arquivos XML.

## Requisitos

Para rodar as interfaces gráficas:
- Node >= v20;
- NPM >= v10.

Para rodar o servidor SOAP:
- Java >= v25;
- PostgreSQL >= v17.

## Como rodar

1. Crie um novo banco de dados PostgreSQL chamado "aps":
```
psql=> CREATE DATABASE aps;
```

2. Atualize os campos `spring.datasource` em `api/src/main/resources/application.properties` para refletir as informações do seu servidor PostgreSQL;

3. Instale os requisitos da API e rode o projeto Spring:
```
cd api
./mvnw install
./mvnw spring-boot:run   # disponível em localhost:8080
```

4. Instale os requisitos de cada interface gráfica e rode o projeto Vite: 
```
cd frontend-mobile (ou frontend-web)
npm install
npm run dev   # disponível em localhost:5173 
```

## Créditos

Erick Martins Silva: Criação do repositório, projeto do banco de dados e programação da interface gráfica para mobile;
Gabriel Barretto Galdino dos Santos: Programação da interface gráfica para desktop;
Guilherme Andrade Taveira: Projeto do banco de dados e programação do servidor SOAP;
Rafael Penela Grande Ferreira: Programação do servidor SOAP.
