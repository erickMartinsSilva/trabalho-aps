package com.aps.api.dto;

import java.time.OffsetDateTime;

public class RelatorioDTO {
    private Integer id;
    private Integer espacoId;
    private String nomeEspaco;
    private String cpfUsuario;
    private OffsetDateTime dataHoraInicio;
    private OffsetDateTime dataHoraTermino;
    private String status;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getEspacoId() { return espacoId; }
    public void setEspacoId(Integer espacoId) { this.espacoId = espacoId; }

    public String getNomeEspaco() { return nomeEspaco; }
    public void setNomeEspaco(String nomeEspaco) { this.nomeEspaco = nomeEspaco; }

    public String getCpfUsuario() { return cpfUsuario; }
    public void setCpfUsuario(String cpfUsuario) { this.cpfUsuario = cpfUsuario; }

    public OffsetDateTime getDataHoraInicio() { return dataHoraInicio; }
    public void setDataHoraInicio(OffsetDateTime dataHoraInicio) { this.dataHoraInicio = dataHoraInicio; }

    public OffsetDateTime getDataHoraTermino() { return dataHoraTermino; }
    public void setDataHoraTermino(OffsetDateTime dataHoraTermino) { this.dataHoraTermino = dataHoraTermino; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}