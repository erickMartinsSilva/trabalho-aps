package com.aps.api.state.espaco;

import com.aps.api.model.Espaco;


public class EspacoDisponivelState implements EspacoState {
    @Override
    public void reservarEspaco(Espaco espaco) {
        espaco.setState(new EspacoReservadoState());
    }

    @Override
    public void liberarEspaco(Espaco espaco) {
        throw new IllegalStateException(
                "Não há reserva a liberar: espaço já está DISPONÍVEL.");
    }

    @Override
    public void iniciarManutencao(Espaco espaco) {
        espaco.setState(new EspacoManutencaoState());
    }

    @Override
    public void finalizarManutencao(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível finalizar manutenção: espaço não está em manutenção.");
    }

    @Override
    public String getNome() {
        return "DISPONIVEL";
    }
}