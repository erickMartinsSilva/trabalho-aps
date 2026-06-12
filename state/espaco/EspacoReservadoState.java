package com.condominio.state.espaco;

import com.condominio.model.Espaco;

/**
 * Estado RESERVADA do Espaço.
 * A reserva foi confirmada e o espaço está reservado para uso.
 *
 * Transições permitidas:
 *   - utilizarEspaco() → EspacoDisponivelState  (após uso, espaço volta a ficar livre)
 *   - cancelar()       → EspacoDisponivelState  (reserva cancelada pelo morador/admin)
 */
public class EspacoReservadoState implements EspacoState {

    @Override
    public void iniciarReserva(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível iniciar reserva: espaço já está RESERVADO.");
    }

    @Override
    public void confirmarReserva(Espaco espaco) {
        throw new IllegalStateException(
                "Reserva já confirmada: espaço está RESERVADO.");
    }

    @Override
    public void recusarSolicitacao(Espaco espaco) {
        throw new IllegalStateException(
                "Não há solicitação pendente: espaço já está RESERVADO.");
    }

    @Override
    public void utilizarEspaco(Espaco espaco) {
        espaco.setState(new EspacoDisponivelState());
    }

    @Override
    public void cancelar(Espaco espaco) {
        espaco.setState(new EspacoDisponivelState());
    }

    @Override
    public void iniciarManutencao(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível iniciar manutenção: espaço está RESERVADO.");
    }

    @Override
    public void finalizarManutencao(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível finalizar manutenção: espaço não está em manutenção.");
    }

    @Override
    public String getNome() {
        return "RESERVADA";
    }
}