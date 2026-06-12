package com.condominio.dto;

import java.time.LocalDateTime;

/**
 * DTO de entrada para criação de uma reserva.
 * Corresponde ao payload do serviço ReservaEspacoService.
 */
public class ReservaRequestDTO {

    private String nomeMorador;       // nome do morador
    private String cpf;               // CPF do morador (validado via strategy)
    private String espacoNome;        // ex: "Churrasqueira", "Salão de Festa"
    private String espacoIdentificacao; // ex: "A", "B", "1"
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;

    public ReservaRequestDTO() {}

    public ReservaRequestDTO(String nomeMorador, String cpf, String espacoNome,
                             String espacoIdentificacao, LocalDateTime dataInicio,
                             LocalDateTime dataFim) {
        this.nomeMorador = nomeMorador;
        this.cpf = cpf;
        this.espacoNome = espacoNome;
        this.espacoIdentificacao = espacoIdentificacao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    public String getNomeMorador() { return nomeMorador; }
    public void setNomeMorador(String nomeMorador) { this.nomeMorador = nomeMorador; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getEspacoNome() { return espacoNome; }
    public void setEspacoNome(String espacoNome) { this.espacoNome = espacoNome; }

    public String getEspacoIdentificacao() { return espacoIdentificacao; }
    public void setEspacoIdentificacao(String espacoIdentificacao) { this.espacoIdentificacao = espacoIdentificacao; }

    public LocalDateTime getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDateTime dataInicio) { this.dataInicio = dataInicio; }

    public LocalDateTime getDataFim() { return dataFim; }
    public void setDataFim(LocalDateTime dataFim) { this.dataFim = dataFim; }

    @Override
    public String toString() {
        return "ReservaRequestDTO{nomeMorador='" + nomeMorador + "', cpf='" + cpf +
                "', espacoNome='" + espacoNome + "', espacoIdentificacao='" + espacoIdentificacao +
                "', dataInicio=" + dataInicio + ", dataFim=" + dataFim + "}";
    }
}