package com.aps.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "espaco")
public class EspacoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 200)
    private String nome;

    @Column(length = 255)
    private String descricao;

    @Column(name = "capacidademax", nullable = false)
    private Integer capacidadeMax;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "estado_enum", nullable = false)
    private StatusEspaco status;

    public Integer getId() { return id; }
    public void setId(Integer id) { 
        this.id = id; 
    }

    public String getNome() { 
        return nome; 
    }
    public void setNome(String nome) { 
        this.nome = nome; 
    }

    public String getDescricao() { 
        return descricao; 
    }
    public void setDescricao(String descricao) { 
        this.descricao = descricao; 
    }

    public Integer getCapacidadeMax() { 
        return capacidadeMax; 
    }
    public void setCapacidadeMax(Integer capacidadeMax) { 
        this.capacidadeMax = capacidadeMax; 
    }

    public StatusEspaco getStatus() { 
        return status; 
    }
    public void setStatus(StatusEspaco status) { 
        this.status = status; 
    }
}
