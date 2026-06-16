package com.aps.api.service;

import com.aps.api.config.ConexaoBanco;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RelatorioReservasServiceImpl implements RelatorioReservasService {

    @Override
    public List<Map<String, Object>> gerarRelatorio(String dataHoraInicio, String dataHoraTermino) {
        return ConexaoBanco.getInstance().getJdbc().queryForList(
            "SELECT r.id, r.espaco_id, e.nome AS nome_espaco, r.usuario_cpf, " +
            "r.data_hora_inicio, r.data_hora_termino, r.status " +
            "FROM reserva r JOIN espaco e ON r.espaco_id = e.id " +
            "WHERE r.data_hora_inicio >= ?::TIMESTAMPTZ AND r.data_hora_termino <= ?::TIMESTAMPTZ",
            dataHoraInicio, dataHoraTermino
        );
    }
}
