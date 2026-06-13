package com.aps.api.state.espaco;

import com.aps.api.model.EspacoModel;
import com.aps.api.model.StatusEspaco;


public class EspacoDisponivelState implements EspacoState {
    @Override
    public void reservarEspaco(EspacoModel espaco) {
        espaco.setStatus(StatusEspaco.OCUPADO);
    }

    @Override
    public void liberarEspaco(EspacoModel espaco) {
        throw new IllegalStateException(
                "Não há reserva a liberar: espaço já está DISPONÍVEL.");
    }

    @Override
    public void iniciarManutencao(EspacoModel espaco) {
        espaco.setStatus(StatusEspaco.FECHADO_PARA_MANUTENCAO);
    }

    @Override
    public void finalizarManutencao(EspacoModel espaco) {
        throw new IllegalStateException(
                "Não é possível finalizar manutenção: espaço não está em manutenção.");
    }

    @Override
    public String getNome() {
        return StatusEspaco.DISPONIVEL.name();
    }
}