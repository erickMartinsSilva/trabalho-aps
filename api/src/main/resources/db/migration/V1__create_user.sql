-- Create-user v1

CREATE TABLE IF NOT EXISTS usuario(
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    senha VARCHAR(50) NOT NULL
);