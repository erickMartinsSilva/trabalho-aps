package com.aps.api.state.espaco;

import com.aps.api.model.Espaco;

public interface EspacoState {
    void reservarEspaco(Espaco espaco);
    void liberarEspaco(Espaco espaco);
    void iniciarManutencao(Espaco espaco);
    void finalizarManutencao(Espaco espaco);
    String getNome();
}