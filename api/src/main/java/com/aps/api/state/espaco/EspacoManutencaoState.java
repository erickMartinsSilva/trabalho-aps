package com.aps.api.state.espaco;

import com.aps.api.model.Espaco;

public class EspacoManutencaoState implements EspacoState {
    @Override
    public void reservarEspaco(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível reservar: espaço está EM MANUTENÇÃO.");
    }

    @Override
    public void liberarEspaco(Espaco espaco) {
        throw new IllegalStateException(
                "Não há reserva a liberar: espaço está EM MANUTENÇÃO.");
    }

    @Override
    public void iniciarManutencao(Espaco espaco) {
        throw new IllegalStateException(
                "Espaço já está EM MANUTENÇÃO.");
    }

    @Override
    public void finalizarManutencao(Espaco espaco) {
        espaco.setState(new EspacoDisponivelState());
    }

    @Override
    public String getNome() {
        return "EM_MANUTENCAO";
    }
}