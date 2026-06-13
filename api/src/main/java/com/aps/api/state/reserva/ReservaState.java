package com.aps.api.state.reserva;

import com.aps.api.model.Reserva;

public interface ReservaState {
    void cancelar(Reserva reserva);
    void verificarConclusao(Reserva reserva);
    String getNome();
}