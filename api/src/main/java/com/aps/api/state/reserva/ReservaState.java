package com.aps.api.state.reserva;

import com.aps.api.model.ReservaModel;

public interface ReservaState {
    void cancelar(ReservaModel reserva);
    void verificarConclusao(ReservaModel reserva);
    String getNome();
}