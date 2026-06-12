package com.condominio.state.espaco;

import com.condominio.model.Espaco;

/**
 * Interface do padrão State para a entidade Espaco.
 *
 * Modela as transições do Statemachine Diagram-espaço:
 *
 *   [inicial]         -registrar espaço->  disponível
 *   disponível        -iniciar reserva->   aguardando
 *   disponível        -iniciar manutenção->em manutenção
 *   aguardando        -confirmar reserva-> reservada
 *   aguardando        -recusar solicitação->disponível
 *   aguardando        -cancelar->          disponível
 *   reservada         -utilizar espaço->   disponível
 *   reservada         -cancelar->          disponível
 *   em manutenção     -finalizar manutenção->disponível
 *
 * Implementações que não suportam uma operação lançam IllegalStateException.
 */
public interface EspacoState {

    void iniciarReserva(Espaco espaco);

    void confirmarReserva(Espaco espaco);

    void recusarSolicitacao(Espaco espaco);

    void utilizarEspaco(Espaco espaco);

    void cancelar(Espaco espaco);

    void iniciarManutencao(Espaco espaco);

    void finalizarManutencao(Espaco espaco);

    /** Nome do estado, usado em DTOs e persistência. */
    String getNome();
}