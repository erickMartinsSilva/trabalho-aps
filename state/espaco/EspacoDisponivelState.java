package com.condominio.state.espaco;

import com.condominio.model.Espaco;

/**
 * Estado DISPONIVEL do Espaço.
 *
 * Transições permitidas:
 *   - iniciarReserva()    → EspacoAguardandoState
 *   - iniciarManutencao() → EspacoManutencaoState
 */
public class EspacoDisponivelState implements EspacoState {

    @Override
    public void iniciarReserva(Espaco espaco) {
        espaco.setState(new EspacoAguardandoState());
    }

    @Override
    public void confirmarReserva(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível confirmar reserva: espaço está DISPONÍVEL (sem solicitação pendente).");
    }

    @Override
    public void recusarSolicitacao(Espaco espaco) {
        throw new IllegalStateException(
                "Não há solicitação a recusar: espaço está DISPONÍVEL.");
    }

    @Override
    public void utilizarEspaco(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível utilizar espaço: não há reserva confirmada.");
    }

    @Override
    public void cancelar(Espaco espaco) {
        throw new IllegalStateException(
                "Não há reserva a cancelar: espaço já está DISPONÍVEL.");
    }

    @Override
    public void iniciarManutencao(Espaco espaco) {
        espaco.setState(new EspacoManutencaoState());
    }

    @Override
    public void finalizarManutencao(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível finalizar manutenção: espaço não está em manutenção.");
    }

    @Override
    public String getNome() {
        return "DISPONIVEL";
    }
}