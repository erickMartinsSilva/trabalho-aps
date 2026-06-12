package com.condominio.state.espaco;

import com.condominio.model.Espaco;

/**
 * Estado EM_MANUTENCAO do Espaço.
 *
 * Transições permitidas:
 *   - finalizarManutencao() → EspacoDisponivelState
 */
public class EspacoManutencaoState implements EspacoState {

    @Override
    public void iniciarReserva(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível reservar: espaço está EM MANUTENÇÃO.");
    }

    @Override
    public void confirmarReserva(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível confirmar reserva: espaço está EM MANUTENÇÃO.");
    }

    @Override
    public void recusarSolicitacao(Espaco espaco) {
        throw new IllegalStateException(
                "Não há solicitação pendente: espaço está EM MANUTENÇÃO.");
    }

    @Override
    public void utilizarEspaco(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível utilizar espaço: está EM MANUTENÇÃO.");
    }

    @Override
    public void cancelar(Espaco espaco) {
        throw new IllegalStateException(
                "Não há reserva a cancelar: espaço está EM MANUTENÇÃO.");
    }

    @Override
    public void iniciarManutencao(Espaco espaco) {
        // Idempotente — já está em manutenção
        throw new IllegalStateException(
                "Espaço já está EM MANUTENÇÃO.");
    }

    @Override
    public void finalizarManutencao(Espaco espaco) {
        espaco.setState(new EspacoDisponivelState());
    }

    @Override
    public String getNome() {
        return "EM_MANUTENCAO";
    }
}