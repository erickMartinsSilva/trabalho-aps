package com.condominio.strategy;

import com.condominio.dto.ReservaRequestDTO;

/**
 * Interface do padrão Strategy para validação de requisições de reserva.
 *
 * Permite adicionar ou trocar regras de validação sem alterar
 * o código cliente (ReservaBusinessService).
 *
 * Implementações existentes:
 *   - ValidadorCPF:             valida formato e dígitos verificadores do CPF
 *   - ValidadorDisponibilidade: verifica se o espaço está livre no período solicitado
 */
public interface ValidadorStrategy {

    /**
     * Executa a validação sobre o DTO de requisição.
     *
     * @param request dados da requisição de reserva
     * @throws IllegalArgumentException se a validação falhar,
     *         com mensagem descritiva do motivo
     */
    void validar(ReservaRequestDTO request);
}