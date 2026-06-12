-- Create espaco

    CREATE TYPE estado_enum AS ENUM (
    'DISPONIVEL',
    'OCUPADO',
    'FECHADO_PARA_MMANUTENCAO'
);

CREATE TABLE IF NOT EXISTS espaco(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    capacidadeMax INTEGER NOT NULL,
    status estado_enum NOT NULL
);