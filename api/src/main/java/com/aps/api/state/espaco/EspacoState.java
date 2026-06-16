package com.aps.api.state.espaco;

import com.aps.api.model.EspacoModel;

public interface EspacoState {
    void reservarEspaco(EspacoModel espaco);
    void liberarEspaco(EspacoModel espaco);
    void iniciarManutencao(EspacoModel espaco);
    void finalizarManutencao(EspacoModel espaco);
    String getNome();
}