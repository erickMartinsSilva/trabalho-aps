package com.aps.api.service;

import java.util.List;
import java.util.Map;

public interface EspacoService {
    boolean cadastrarEspaco(String cpf, String nome, int capacidadeMax);
    boolean atualizarEspaco(String cpf, int id, String nome, Integer capacidadeMax);
    boolean deletarEspaco(String cpf, int id);
    Map<String, Object> buscarEspaco(int id);
    List<Map<String, Object>> listarEspacos();
    boolean fecharEspaco(String cpf, int id);
    boolean reabrirEspaco(String cpf, int id);
}
