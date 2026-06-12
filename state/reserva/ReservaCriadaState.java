package com.condominio.state.reserva;

import com.condominio.model.Reserva;

import java.time.LocalDateTime;

/**
 * Estado CRIADA da Reserva.
 *
 * Transições permitidas:
 *   - cancelar()            → ReservaCanceladaState
 *   - verificarConclusao()  → ReservaConcluidaState  (quando dataAtual > dataFim)
 */
public class ReservaCriadaState implements ReservaState {

    @Override
    public void cancelar(Reserva reserva) {
        reserva.setState(new ReservaCanceladaState());
    }

    @Override
    public void verificarConclusao(Reserva reserva) {
        LocalDateTime agora = LocalDateTime.now();
        if (reserva.getDataFim() != null && agora.isAfter(reserva.getDataFim())) {
            reserva.setState(new ReservaConcluidaState());
        }
        // Se a condição ainda não foi atingida, permanece no estado CRIADA
    }

    @Override
    public String getNome() {
        return "CRIADA";
    }
}