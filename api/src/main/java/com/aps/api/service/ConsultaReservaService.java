package com.aps.api.service;

import java.util.List;
import java.util.Map;

public interface ConsultaReservaService {
    List<Map<String, Object>> buscarPorCpf(String cpf);
    List<Map<String, Object>> buscarPorEspaco(int espacoId);
    List<Map<String, Object>> buscarPorStatus(String status);
}
