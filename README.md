# trabalho-aps

[🇧🇷 Português](README.md) · [🇺🇸 English](README.en.md)

Trabalho final da disciplina de Arquitetura e Padrões de Software - CEFET/RJ.

## Introdução

Este projeto consiste em um sistema de Arquitetura Orientada a Serviços que simula uma aplicação para aluguel de espaços em um condomínio residencial.

## Requisitos

- Node.js 22.12 ou superior;
- npm 10 ou superior;
- JDK 25;
- PostgreSQL 17.

Essas são as versões destinadas à execução do projeto. Versões principais mais recentes podem funcionar, mas não foram necessariamente testadas.

## Como executar

### 1. Clonar o repositório

```console
git clone https://github.com/erickMartinsSilva/trabalho-aps.git
cd trabalho-aps
```

Os próximos passos partem do diretório raiz do repositório.

### 2. Preparar o banco de dados

Certifique-se de que o PostgreSQL esteja em execução. Em seguida, crie um banco de dados chamado `aps`:

```console
psql -U [USUARIO] -c "CREATE DATABASE aps;"
```

Se o comando `psql` não estiver disponível no `PATH`, use o caminho completo do executável ou crie o banco `aps` pelo pgAdmin.

### 3. Configurar o acesso da API ao PostgreSQL

Abra o arquivo `api/src/main/resources/application.properties` e substitua os valores das propriedades abaixo pelas credenciais do seu PostgreSQL:

```properties
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

A URL de conexão padrão pressupõe que o PostgreSQL esteja disponível localmente na porta `5432` e que o banco se chame `aps`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/aps
```

Não envie credenciais pessoais ao repositório.

### 4. Iniciar a API

#### Linux e macOS

```console
cd api
./mvnw spring-boot:run
```

#### Windows PowerShell

```powershell
cd api
.\mvnw.cmd spring-boot:run
```

A API ficará disponível em `http://localhost:8080`. Mantenha esse processo em execução enquanto utilizar qualquer uma das interfaces.

### 5. Iniciar uma interface

#### Interface web

Linux e macOS:

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

#### Interface mobile

Linux e macOS:

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

O Vite normalmente disponibilizará a interface em `http://localhost:5173`. Se as duas interfaces forem iniciadas ao mesmo tempo, ele poderá selecionar outra porta para o segundo processo; consulte o endereço exibido no terminal.

## Verificação

Após concluir a configuração:

1. Confirme no terminal da API que o Spring iniciou sem erros;
2. Acesse `http://localhost:8080/ws/usuario.wsdl` e confirme que o WSDL foi exibido;
3. Acesse o endereço apresentado pelo Vite, normalmente `http://localhost:5173`;
4. Confirme que a interface consegue se comunicar com a API.