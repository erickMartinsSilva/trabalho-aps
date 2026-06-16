package com.aps.api.state.espaco;

import com.aps.api.model.EspacoModel;
import com.aps.api.model.StatusEspaco;

public class EspacoReservadoState implements EspacoState {
    @Override
    public void reservarEspaco(EspacoModel espaco) {
        throw new IllegalStateException(
                "Não é possível reservar: espaço já está OCUPADO.");
    }

    @Override
    public void liberarEspaco(EspacoModel espaco) {
        espaco.setStatus(StatusEspaco.DISPONIVEL);
    }

    @Override
    public void iniciarManutencao(EspacoModel espaco) {
        throw new IllegalStateException(
                "Não é possível iniciar manutenção: espaço está OCUPADO.");
    }

    @Override
    public void finalizarManutencao(EspacoModel espaco) {
        throw new IllegalStateException(
                "Não é possível finalizar manutenção: espaço não está em manutenção.");
    }

    @Override
    public String getNome() {
        return StatusEspaco.OCUPADO.name();
    }
}