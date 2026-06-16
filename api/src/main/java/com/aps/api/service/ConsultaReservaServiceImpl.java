package com.aps.api.service;

import com.aps.api.config.ConexaoBanco;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ConsultaReservaServiceImpl implements ConsultaReservaService {

    private static final String BASE_QUERY =
        "SELECT r.id, r.espaco_id, e.nome AS nome_espaco, r.usuario_cpf, " +
        "r.data_hora_inicio, r.data_hora_termino, r.status " +
        "FROM reserva r JOIN espaco e ON r.espaco_id = e.id ";

    private JdbcTemplate jdbc() {
        return ConexaoBanco.getInstance().getJdbc();
    }

    @Override
    public List<Map<String, Object>> buscarPorCpf(String cpf) {
        return jdbc().queryForList(BASE_QUERY + "WHERE r.usuario_cpf = ?", cpf);
    }

    @Override
    public List<Map<String, Object>> buscarPorEspaco(int espacoId) {
        return jdbc().queryForList(BASE_QUERY + "WHERE r.espaco_id = ?", espacoId);
    }

    @Override
    public List<Map<String, Object>> buscarPorStatus(String status) {
        return jdbc().queryForList(
            BASE_QUERY + "WHERE r.status = ?::status_reserva_enum", status
        );
    }
}
