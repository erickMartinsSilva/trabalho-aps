package com.condominio.state.espaco;

import com.condominio.model.Espaco;

/**
 * Estado AGUARDANDO do Espaço.
 * Ocorre quando um morador iniciou uma solicitação de reserva
 * e está aguardando confirmação.
 *
 * Transições permitidas:
 *   - confirmarReserva()   → EspacoReservadoState
 *   - recusarSolicitacao() → EspacoDisponivelState
 *   - cancelar()           → EspacoDisponivelState
 */
public class EspacoAguardandoState implements EspacoState {

    @Override
    public void iniciarReserva(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível iniciar nova reserva: espaço já está AGUARDANDO confirmação.");
    }

    @Override
    public void confirmarReserva(Espaco espaco) {
        espaco.setState(new EspacoReservadoState());
    }

    @Override
    public void recusarSolicitacao(Espaco espaco) {
        espaco.setState(new EspacoDisponivelState());
    }

    @Override
    public void utilizarEspaco(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível utilizar espaço: reserva ainda não foi confirmada.");
    }

    @Override
    public void cancelar(Espaco espaco) {
        espaco.setState(new EspacoDisponivelState());
    }

    @Override
    public void iniciarManutencao(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível iniciar manutenção: espaço está AGUARDANDO confirmação de reserva.");
    }

    @Override
    public void finalizarManutencao(Espaco espaco) {
        throw new IllegalStateException(
                "Não é possível finalizar manutenção: espaço não está em manutenção.");
    }

    @Override
    public String getNome() {
        return "AGUARDANDO";
    }
}