package com.aps.api.service;

import com.aps.api.config.ConexaoBanco;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ConsultaDisponibilidadeServiceImpl implements ConsultaDisponibilidadeService {

    @Override
    public Map<String, Object> consultarDisponibilidade(int espacoId, String dataHoraInicio, String dataHoraTermino) {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();

        List<Map<String, Object>> espaco = jdbc.queryForList(
            "SELECT id, nome, status FROM espaco WHERE id = ?", espacoId
        );
        if (espaco.isEmpty()) return null;

        String statusEspaco = String.valueOf(espaco.get(0).get("status"));
        String nomeEspaco   = String.valueOf(espaco.get(0).get("nome"));

        boolean espacoDisponivel = "DISPONIVEL".equals(statusEspaco);

        Integer conflitos = jdbc.queryForObject(
            "SELECT COUNT(*) FROM reserva " +
            "WHERE espaco_id = ? AND status = 'CRIADA'::status_reserva_enum " +
            "AND data_hora_inicio < ?::TIMESTAMPTZ AND data_hora_termino > ?::TIMESTAMPTZ",
            Integer.class, espacoId, dataHoraTermino, dataHoraInicio
        );

        boolean disponivel = espacoDisponivel && (conflitos == null || conflitos == 0);

        return Map.of(
            "espacoId",        espacoId,
            "nomeEspaco",      nomeEspaco,
            "dataHoraInicio",  dataHoraInicio,
            "dataHoraTermino", dataHoraTermino,
            "disponivel",      disponivel
        );
    }
}
