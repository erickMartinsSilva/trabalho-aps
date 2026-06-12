package com.condominio.model;

import com.condominio.state.espaco.EspacoState;
import com.condominio.state.espaco.EspacoDisponivelState;

/**
 * Entidade Espaço do condomínio (churrasqueira, salão de festa, etc.).
 *
 * Aplica o padrão State: o comportamento muda conforme o estado atual
 * (disponível, aguardando, reservada, em manutenção) — conforme o
 * Statemachine Diagram-espaço nos diagramas UML.
 */
public class Espaco {

    private Long id;
    private String nome;           // ex: "Churrasqueira", "Salão de Festa"
    private String identificacao;  // ex: "A", "B", "1"

    /** Estado atual do espaço — injetado via State pattern. */
    private EspacoState state;

    public Espaco() {
        // Estado inicial: disponível após registrar espaço
        this.state = new EspacoDisponivelState();
    }

    public Espaco(Long id, String nome, String identificacao) {
        this.id = id;
        this.nome = nome;
        this.identificacao = identificacao;
        this.state = new EspacoDisponivelState();
    }

    // -------------------------------------------------------------------------
    // Delegação de comportamento ao State
    // -------------------------------------------------------------------------

    /** Solicitar reserva do espaço (morador inicia reserva → aguardando). */
    public void iniciarReserva() {
        state.iniciarReserva(this);
    }

    /** Admin confirma a reserva (aguardando → reservada). */
    public void confirmarReserva() {
        state.confirmarReserva(this);
    }

    /** Admin ou sistema recusa solicitação (aguardando → disponível). */
    public void recusarSolicitacao() {
        state.recusarSolicitacao(this);
    }

    /** Espaço foi utilizado e volta a ficar disponível (reservada → disponível). */
    public void utilizarEspaco() {
        state.utilizarEspaco(this);
    }

    /** Cancelar reserva antes de confirmação (aguardando/reservada → disponível). */
    public void cancelar() {
        state.cancelar(this);
    }

    /** Iniciar manutenção (disponível → em manutenção). */
    public void iniciarManutencao() {
        state.iniciarManutencao(this);
    }

    /** Finalizar manutenção (em manutenção → disponível). */
    public void finalizarManutencao() {
        state.finalizarManutencao(this);
    }

    /** Retorna o nome do estado atual como String (útil para persistência/DTO). */
    public String getStatusNome() {
        return state.getNome();
    }

    // -------------------------------------------------------------------------
    // Getters / Setters
    // -------------------------------------------------------------------------

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getIdentificacao() { return identificacao; }
    public void setIdentificacao(String identificacao) { this.identificacao = identificacao; }

    public EspacoState getState() { return state; }
    public void setState(EspacoState state) { this.state = state; }

    @Override
    public String toString() {
        return "Espaco{id=" + id + ", nome='" + nome + "', identificacao='" + identificacao +
                "', status='" + getStatusNome() + "'}";
    }
}