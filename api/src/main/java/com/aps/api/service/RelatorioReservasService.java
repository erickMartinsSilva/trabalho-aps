package com.aps.api.service;

import java.util.List;
import java.util.Map;

public interface RelatorioReservasService {
    List<Map<String, Object>> gerarRelatorio(String dataHoraInicio, String dataHoraTermino);
}
