package com.aps.api.service;

import java.util.List;
import java.util.Map;

public interface ReservaEspacoService {
    boolean reservarEspaco(String cpf, int espacoId, String inicio, String termino);
    boolean atualizarReserva(int id, String inicio, String termino);
    boolean deletarReserva(int id);
    boolean cancelarReserva(int id);
    Map<String, Object> buscarReserva(int id);
    List<Map<String, Object>> listarReservas();
}
