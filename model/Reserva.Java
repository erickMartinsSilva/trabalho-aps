package com.condominio.model;

import com.condominio.state.reserva.ReservaState;
import com.condominio.state.reserva.ReservaCriadaState;

import java.time.LocalDateTime;

/**
 * Entidade Reserva do condomínio.
 *
 * Aplica o padrão State: o ciclo de vida da reserva segue
 * o Statemachine Diagram-reserva:
 *   [inicial] -registrar reserva-> Criada
 *   Criada    -cancelar reserva->  Cancelada (final)
 *   Criada    -when(dataAtual > dataFim)-> Concluída (final)
 */
public class Reserva {

    private Long id;
    private String nomeMorador;
    private String cpf;
    private Espaco espaco;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private LocalDateTime dataCriacao;

    /** Estado atual da reserva — gerenciado via State pattern. */
    private ReservaState state;

    public Reserva() {
        this.dataCriacao = LocalDateTime.now();
        // Estado inicial após "registrar reserva"
        this.state = new ReservaCriadaState();
    }

    public Reserva(Long id, String nomeMorador, String cpf, Espaco espaco,
                   LocalDateTime dataInicio, LocalDateTime dataFim) {
        this.id = id;
        this.nomeMorador = nomeMorador;
        this.cpf = cpf;
        this.espaco = espaco;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.dataCriacao = LocalDateTime.now();
        this.state = new ReservaCriadaState();
    }

    // -------------------------------------------------------------------------
    // Delegação ao State
    // -------------------------------------------------------------------------

    /** Cancela a reserva (Criada → Cancelada). */
    public void cancelar() {
        state.cancelar(this);
    }

    /**
     * Verifica se a reserva deve ser concluída automaticamente
     * when(dataAtual > dataFim) — Criada → Concluída.
     */
    public void verificarConclusao() {
        state.verificarConclusao(this);
    }

    /** Retorna o nome do status atual (CRIADA / CANCELADA / CONCLUIDA). */
    public String getStatusNome() {
        return state.getNome();
    }

    // -------------------------------------------------------------------------
    // Getters / Setters
    // -------------------------------------------------------------------------

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNomeMorador() { return nomeMorador; }
    public void setNomeMorador(String nomeMorador) { this.nomeMorador = nomeMorador; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public Espaco getEspaco() { return espaco; }
    public void setEspaco(Espaco espaco) { this.espaco = espaco; }

    public LocalDateTime getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDateTime dataInicio) { this.dataInicio = dataInicio; }

    public LocalDateTime getDataFim() { return dataFim; }
    public void setDataFim(LocalDateTime dataFim) { this.dataFim = dataFim; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }

    public ReservaState getState() { return state; }
    public void setState(ReservaState state) { this.state = state; }

    @Override
    public String toString() {
        return "Reserva{id=" + id + ", nomeMorador='" + nomeMorador + "', cpf='" + cpf +
                "', espaco=" + (espaco != null ? espaco.getNome() + "-" + espaco.getIdentificacao() : "null") +
                ", dataInicio=" + dataInicio + ", dataFim=" + dataFim +
                ", status='" + getStatusNome() + "'}";
    }
}