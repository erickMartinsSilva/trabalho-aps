package com.aps.api.state.espaco;

import com.aps.api.model.EspacoModel;
import com.aps.api.model.StatusEspaco;

public class EspacoManutencaoState implements EspacoState {
    @Override
    public void reservarEspaco(EspacoModel espaco) {
        throw new IllegalStateException(
                "Não é possível reservar: espaço está FECHADO PARA MANUTENÇÃO.");
    }

    @Override
    public void liberarEspaco(EspacoModel espaco) {
        throw new IllegalStateException(
                "Não há reserva a liberar: espaço está FECHADO PARA MANUTENÇÃO.");
    }

    @Override
    public void iniciarManutencao(EspacoModel espaco) {
        throw new IllegalStateException(
                "Espaço já está FECHADO PARA MANUTENÇÃO.");
    }

    @Override
    public void finalizarManutencao(EspacoModel espaco) {
        espaco.setStatus(StatusEspaco.DISPONIVEL);
    }

    @Override
    public String getNome() {
        return StatusEspaco.FECHADO_PARA_MANUTENCAO.name();
    }
}