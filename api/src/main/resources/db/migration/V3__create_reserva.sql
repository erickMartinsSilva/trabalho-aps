-- Create Reserva 


CREATE TABLE IF NOT EXISTS reserva(
    id SERIAL PRIMARY KEY,
    data_hora_inicio TIMESTAMPTZ DEFAULT NOW(),
    data_hora_termino TIMESTAMPTZ DEFAULT NOW(),
    usuario_id INTEGER NOT NULL,
    espaco_id INTEGER NOT NULL,
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)    
        REFERENCES usuario(id),
    CONSTRAINT fk_espaco
        FOREIGN KEY (espaco_id)
        REFERENCES espaco(id)


)