package com.aps.api.repository;

import java.util.List;
import java.util.Map;

public interface ReservaRepository {
    boolean reservar(String cpf, int espacoId, String inicio, String termino);
    boolean atualizar(int id, String inicio, String termino);
    boolean deletar(int id);
    String buscarStatus(int id);
    Map<String, Object> buscar(int id);
    List<Map<String, Object>> listar();
    boolean atualizarStatus(int id, String status);
}