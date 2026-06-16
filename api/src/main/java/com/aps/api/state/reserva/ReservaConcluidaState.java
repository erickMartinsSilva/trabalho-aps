package com.aps.api.state.reserva;

import com.aps.api.model.ReservaModel;
import com.aps.api.model.StatusReserva;

public class ReservaConcluidaState implements ReservaState {
    @Override
    public void cancelar(ReservaModel reserva) {
        throw new IllegalStateException(
                "Não é possível cancelar uma reserva que já está CONCLUÍDA.");
    }

    @Override
    public void verificarConclusao(ReservaModel reserva) {
        // Já está concluída, não faz nada
    }

    @Override
    public String getNome() {
        return StatusReserva.CONCLUIDA.name();
    }
}