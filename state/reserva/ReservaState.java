package com.condominio.state.reserva;

import com.condominio.model.Reserva;

/**
 * Interface do padrão State para a entidade Reserva.
 *
 * Define as transições possíveis conforme o Statemachine Diagram-reserva:
 *   - cancelar:           Criada → Cancelada
 *   - verificarConclusao: Criada → Concluída (when dataAtual > dataFim)
 *
 * Estados concretos que não suportam uma transição devem lançar
 * IllegalStateException com mensagem descritiva.
 */
public interface ReservaState {

    /**
     * Cancela a reserva.
     * Válido somente no estado Criada.
     */
    void cancelar(Reserva reserva);

    /**
     * Verifica se a condição de conclusão foi atingida
     * (dataHoraAtual > dataHoraFinal) e, em caso positivo,
     * transiciona para o estado Concluída.
     * Válido somente no estado Criada.
     */
    void verificarConclusao(Reserva reserva);

    /**
     * Retorna o nome do estado atual como String,
     * usado para persistência e exibição (ex: "CRIADA").
     */
    String getNome();
}