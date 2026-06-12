package com.condominio.state.reserva;

import com.condominio.model.Reserva;

/**
 * Estado CANCELADA da Reserva — estado final.
 *
 * Nenhuma transição é permitida a partir deste estado.
 */
public class ReservaCanceladaState implements ReservaState {

    @Override
    public void cancelar(Reserva reserva) {
        throw new IllegalStateException(
                "Não é possível cancelar uma reserva que já está CANCELADA.");
    }

    @Override
    public void verificarConclusao(Reserva reserva) {
        throw new IllegalStateException(
                "Não é possível concluir uma reserva que já está CANCELADA.");
    }

    @Override
    public String getNome() {
        return "CANCELADA";
    }
}