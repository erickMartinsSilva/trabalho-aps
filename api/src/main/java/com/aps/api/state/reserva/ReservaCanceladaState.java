package com.aps.api.state.reserva;

import com.aps.api.model.Reserva;
import java.time.LocalDateTime;

public class ReservaCanceladaState implements ReservaState {
    @Override
    public void cancelar(Reserva reserva){
        throw new IllegalStateException(
                "Não é possível cancelar uma reserva que já está CANCELADA.");
    }

    @Override
    public void verificarConclusao(Reserva reserva){
        throw new IllegalStateException(
                "Não é possível concluir uma reserva que já está CANCELADA.");
    }

    @Override
    public String getNome(){
        return "CANCELADA";
    }
}