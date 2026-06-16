package com.aps.api.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "reserva")
public class ReservaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "status_reserva_enum", nullable = false)
    private StatusReserva status;

    @Column(name = "data_hora_inicio")
    private OffsetDateTime dataHoraInicio;

    @Column(name = "data_hora_termino")
    private OffsetDateTime dataHoraTermino;

    @ManyToOne
    @JoinColumn(name = "usuario_cpf", nullable = false)
    private UsuarioModel usuario;

    @ManyToOne
    @JoinColumn(name = "espaco_id", nullable = false)
    private EspacoModel espaco;

    public Integer getId() { return id; }
    public void setId(Integer id) { 
        this.id = id; 
    }

    public StatusReserva getStatus() {return status;}
    public void setStatus(StatusReserva status) {this.status = status;}

    public OffsetDateTime getDataHoraInicio() { 
        return dataHoraInicio; 
    }
    public void setDataHoraInicio(OffsetDateTime dataHoraInicio) { 
        this.dataHoraInicio = dataHoraInicio; 
    }

    public OffsetDateTime getDataHoraTermino() { 
        return dataHoraTermino; 
    }
    public void setDataHoraTermino(OffsetDateTime dataHoraTermino) { 
        this.dataHoraTermino = dataHoraTermino; 
    }

    public UsuarioModel getUsuario() { 
        return usuario; 
    }
    public void setUsuario(UsuarioModel usuario) { 
        this.usuario = usuario; 
    }

    public EspacoModel getEspaco() {
         return espaco; }

    public void setEspaco(EspacoModel espaco) { 
        this.espaco = espaco; 
    }
}
