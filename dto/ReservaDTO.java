package com.condominio.dto;

import java.time.LocalDateTime;

/**
 * DTO para retorno de dados de uma reserva ao cliente.
 */
public class ReservaDTO {

    private Long id;
    private String nomeMorador;
    private String cpf;
    private String espacoNome;
    private String espacoIdentificacao;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private String status; // CRIADA, CANCELADA, CONCLUIDA

    public ReservaDTO() {}

    public ReservaDTO(Long id, String nomeMorador, String cpf, String espacoNome,
                      String espacoIdentificacao, LocalDateTime dataInicio,
                      LocalDateTime dataFim, String status) {
        this.id = id;
        this.nomeMorador = nomeMorador;
        this.cpf = cpf;
        this.espacoNome = espacoNome;
        this.espacoIdentificacao = espacoIdentificacao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "ReservaDTO{id=" + id + ", nomeMorador='" + nomeMorador + "', cpf='" + cpf +
                "', espacoNome='" + espacoNome + "', espacoIdentificacao='" + espacoIdentificacao +
                "', dataInicio=" + dataInicio + ", dataFim=" + dataFim + ", status='" + status + "'}";
    }
}