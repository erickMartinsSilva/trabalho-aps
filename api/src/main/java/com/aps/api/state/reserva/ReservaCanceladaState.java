package com.aps.api.state.reserva;

import com.aps.api.model.ReservaModel;
import com.aps.api.model.StatusReserva;

public class ReservaCanceladaState implements ReservaState {
    @Override
    public void cancelar(ReservaModel reserva) {
        throw new IllegalStateException(
                "Não é possível cancelar uma reserva que já está CANCELADA.");
    }

    @Override
    public void verificarConclusao(ReservaModel reserva) {
        throw new IllegalStateException(
                "Não é possível concluir uma reserva que já está CANCELADA.");
    }

    @Override
    public String getNome() {
        return StatusReserva.CANCELADA.name();
    }
}