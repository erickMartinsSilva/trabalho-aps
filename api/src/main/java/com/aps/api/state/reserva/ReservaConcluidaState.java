package com.aps.api.state.reserva;

import com.aps.api.model.Reserva;

public class ReservaConcluidaState implements ReservaState {
    @Override
    public void cancelar(Reserva reserva) {
        throw new IllegalStateException(
                "Não é possível cancelar uma reserva que já está CONCLUÍDA.");
    }

    @Override
    public void verificarConclusao(Reserva reserva) {
        // Já está concluída, não faz nada
    }

    @Override
    public String getNome() {
        return "CONCLUIDA";
    }
}