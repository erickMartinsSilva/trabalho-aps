-- Create Reserva 

    CREATE TYPE status_reserva_enum AS ENUM (
    'CRIADA',
    'CANCELADA',
    'CONCLUIDA'
);

CREATE TABLE IF NOT EXISTS reserva(
    id SERIAL PRIMARY KEY,
    data_hora_inicio TIMESTAMPTZ DEFAULT NOW(),
    data_hora_termino TIMESTAMPTZ DEFAULT NOW(),
    status status_reserva_enum NOT NULL DEFAULT 'CRIADA',
    usuario_cpf VARCHAR(11) NOT NULL,
    espaco_id INTEGER NOT NULL,
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_cpf)
        REFERENCES usuario(cpf),
    CONSTRAINT fk_espaco
        FOREIGN KEY (espaco_id)
        REFERENCES espaco(id)
);