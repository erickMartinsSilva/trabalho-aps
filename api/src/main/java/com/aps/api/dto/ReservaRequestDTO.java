package com.aps.api.dto;

import java.time.OffsetDateTime;

public class ReservaRequestDTO {
    private String cpf;
    private Integer espacoId;
    private OffsetDateTime dataHoraInicio;
    private OffsetDateTime dataHoraTermino;

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public Integer getEspacoId() { return espacoId; }
    public void setEspacoId(Integer espacoId) { this.espacoId = espacoId; }

    public OffsetDateTime getDataHoraInicio() { return dataHoraInicio; }
    public void setDataHoraInicio(OffsetDateTime dataHoraInicio) { this.dataHoraInicio = dataHoraInicio; }

    public OffsetDateTime getDataHoraTermino() { return dataHoraTermino; }
    public void setDataHoraTermino(OffsetDateTime dataHoraTermino) { this.dataHoraTermino = dataHoraTermino; }
}