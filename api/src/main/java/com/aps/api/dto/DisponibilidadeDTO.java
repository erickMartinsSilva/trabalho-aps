package com.aps.api.dto;

import java.time.OffsetDateTime;

public class DisponibilidadeDTO {
    private Integer espacoId;
    private String nomeEspaco;
    private OffsetDateTime dataHoraInicio;
    private OffsetDateTime dataHoraTermino;
    private boolean disponivel;

    public Integer getEspacoId() { return espacoId; }
    public void setEspacoId(Integer espacoId) { this.espacoId = espacoId; }

    public String getNomeEspaco() { return nomeEspaco; }
    public void setNomeEspaco(String nomeEspaco) { this.nomeEspaco = nomeEspaco; }

    public OffsetDateTime getDataHoraInicio() { return dataHoraInicio; }
    public void setDataHoraInicio(OffsetDateTime dataHoraInicio) { this.dataHoraInicio = dataHoraInicio; }

    public OffsetDateTime getDataHoraTermino() { return dataHoraTermino; }
    public void setDataHoraTermino(OffsetDateTime dataHoraTermino) { this.dataHoraTermino = dataHoraTermino; }

    public boolean isDisponivel() { return disponivel; }
    public void setDisponivel(boolean disponivel) { this.disponivel = disponivel; }
}