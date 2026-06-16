package com.aps.api.state.reserva;

import com.aps.api.model.ReservaModel;
import com.aps.api.model.StatusReserva;
import java.time.OffsetDateTime;

public class ReservaCriadaState implements ReservaState {
    @Override
    public void cancelar(ReservaModel reserva){
        reserva.setStatus(StatusReserva.CANCELADA);
    }

    @Override
    public void verificarConclusao(ReservaModel reserva){
        OffsetDateTime agora = OffsetDateTime.now();
        if (reserva.getDataHoraTermino() != null && agora.isAfter(reserva.getDataHoraInicio())) {
            reserva.setStatus(StatusReserva.CONCLUIDA);
        }
    }

    @Override
    public String getNome(){
        return StatusReserva.CRIADA.name();
    }
}