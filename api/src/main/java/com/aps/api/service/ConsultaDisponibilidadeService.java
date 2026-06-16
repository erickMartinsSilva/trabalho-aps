package com.aps.api.service;

import java.util.Map;

public interface ConsultaDisponibilidadeService {
    Map<String, Object> consultarDisponibilidade(int espacoId, String dataHoraInicio, String dataHoraTermino);
}
