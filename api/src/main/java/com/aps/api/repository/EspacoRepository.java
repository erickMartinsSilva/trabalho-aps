package com.aps.api.repository;

import java.util.List;
import java.util.Map;

public interface EspacoRepository {
    boolean cadastrar(String nome, int capacidadeMax);
    boolean atualizar(int id, String nome, Integer capacidadeMax);
    boolean deletar(int id);
    Map<String, Object> buscar(int id);
    List<Map<String, Object>> listar();
    boolean atualizarStatus(int id, String status);
}