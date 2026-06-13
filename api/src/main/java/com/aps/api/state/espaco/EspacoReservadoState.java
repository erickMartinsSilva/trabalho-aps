package com.aps.api.state.espaco;

import com.aps.api.model.Espaco;

public class EspacoReservadoState implements EspacoState {
    @Override
    public void reservarEspaco(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível reservar: espaço já está RESERVADO.");
    }

    @Override
    public void liberarEspaco(Espaco espaco) {
        espaco.setState(new EspacoDisponivelState());
    }

    @Override
    public void iniciarManutencao(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível iniciar manutenção: espaço está RESERVADO.");
    }

    @Override
    public void finalizarManutencao(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível finalizar manutenção: espaço não está em manutenção.");
    }

    @Override
    public String getNome() {
        return "RESERVADO";
    }
}