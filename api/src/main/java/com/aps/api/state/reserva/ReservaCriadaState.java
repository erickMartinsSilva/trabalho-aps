package com.aps.api.state.reserva;

import com.aps.api.model.Reserva;
import java.time.LocalDateTime;

public class ReservaCriadaState implements ReservaState {
    @Override
    public void cancelar(Reserva reserva){
        reserva.setState(new ReservaCanceladaState());
    }

    @Override
    public void verificarConclusao(Reserva reserva){
        LocalDateTime agora = LocalDateTime.now();
        if (reserva.getDataFim() != null && agora.isAfter(reserva.getDataFim())) {
            reserva.setState(new ReservaConcluidaState());
        }
    }

    @Override
    public String getNome(){
        return "CRIADA";
    }
}