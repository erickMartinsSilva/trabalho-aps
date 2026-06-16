package com.aps.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class UsuarioModel {

    @Id
    @Column(nullable = false, length = 11)
    private String cpf;

    @Column(nullable = false, length = 50)
    private String senha;

    public String getCpf() { 
        return cpf; 
    }
    public void setCpf(String cpf) { 
        this.cpf = cpf; 
    }

    public String getSenha() { 
        return senha; 
    }
    public void setSenha(String senha) { 
        this.senha = senha; 
    }
}
