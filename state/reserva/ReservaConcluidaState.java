package com.condominio.state.reserva;

import com.condominio.model.Reserva;

/**
 * Estado CONCLUIDA da Reserva — estado final.
 *
 * Atingido automaticamente quando:
 *   dataHoraAtual > dataHoraFinal  (conforme Statemachine Diagram-reserva)
 *
 * Nenhuma transição é permitida a partir deste estado.
 */
public class ReservaConcluidaState implements ReservaState {

    @Override
    public void cancelar(Reserva reserva) {
        throw new IllegalStateException(
                "Não é possível cancelar uma reserva que já está CONCLUÍDA.");
    }

    @Override
    public void verificarConclusao(Reserva reserva) {
        // Já está concluída; não faz nada (idempotente)
    }

    @Override
    public String getNome() {
        return "CONCLUIDA";
    }
}