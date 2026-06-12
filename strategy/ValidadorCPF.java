package com.condominio.strategy;

import com.condominio.dto.ReservaRequestDTO;

/**
 * Validador de CPF — implementação do padrão Strategy.
 *
 * Verifica:
 *   1. Presença e não-nullidade do campo CPF
 *   2. Formato: apenas dígitos, 11 caracteres
 *   3. CPFs com todos os dígitos iguais (ex: 111.111.111-11) são inválidos
 *   4. Dígitos verificadores (algoritmo oficial da Receita Federal)
 */
public class ValidadorCPF implements ValidadorStrategy {

    @Override
    public void validar(ReservaRequestDTO request) {
        String cpf = request.getCpf();

        if (cpf == null || cpf.isBlank()) {
            throw new IllegalArgumentException("CPF é obrigatório.");
        }

        // Remove pontuação, se houver
        String cpfLimpo = cpf.replaceAll("[.\\-]", "").trim();

        if (cpfLimpo.length() != 11) {
            throw new IllegalArgumentException(
                    "CPF inválido: deve conter exatamente 11 dígitos. Recebido: " + cpf);
        }

        if (!cpfLimpo.matches("\\d{11}")) {
            throw new IllegalArgumentException(
                    "CPF inválido: deve conter apenas dígitos. Recebido: " + cpf);
        }

        // Rejeita CPFs com todos os dígitos iguais
        if (cpfLimpo.chars().distinct().count() == 1) {
            throw new IllegalArgumentException(
                    "CPF inválido: sequência de dígitos repetidos não é permitida.");
        }

        if (!validarDigitosCPF(cpfLimpo)) {
            throw new IllegalArgumentException(
                    "CPF inválido: dígitos verificadores incorretos. Recebido: " + cpf);
        }
    }

    // -------------------------------------------------------------------------
    // Algoritmo de validação dos dígitos verificadores (Receita Federal)
    // -------------------------------------------------------------------------

    private boolean validarDigitosCPF(String cpf) {
        int d1 = calcularDigito(cpf, 10);
        int d2 = calcularDigito(cpf, 11);
        return d1 == Character.getNumericValue(cpf.charAt(9))
                && d2 == Character.getNumericValue(cpf.charAt(10));
    }

    private int calcularDigito(String cpf, int pesoInicial) {
        int soma = 0;
        for (int i = 0; i < pesoInicial - 1; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (pesoInicial - i);
        }
        int resto = soma % 11;
        return (resto < 2) ? 0 : (11 - resto);
    }
}