package com.aps.api.repository;

import com.aps.api.config.ConexaoBanco;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ReservaRepository {

    private org.springframework.jdbc.core.JdbcTemplate jdbc() {
        return ConexaoBanco.getInstance().getJdbc();
    }

    public boolean reservar(String cpf, int espacoId, String inicio, String termino) {
        int rows = jdbc().update(
            "INSERT INTO reserva (usuario_cpf, espaco_id, data_hora_inicio, data_hora_termino, status) " +
            "VALUES (?, ?, ?::TIMESTAMPTZ, ?::TIMESTAMPTZ, 'CRIADA'::status_reserva_enum)",
            cpf, espacoId, inicio, termino
        );
        return rows > 0;
    }

    public boolean atualizar(int id, String inicio, String termino) {
        if (inicio != null && termino != null) {
            return jdbc().update(
                "UPDATE reserva SET data_hora_inicio = ?::TIMESTAMPTZ, data_hora_termino = ?::TIMESTAMPTZ WHERE id = ?",
                inicio, termino, id
            ) > 0;
        } else if (inicio != null) {
            return jdbc().update("UPDATE reserva SET data_hora_inicio = ?::TIMESTAMPTZ WHERE id = ?", inicio, id) > 0;
        } else if (termino != null) {
            return jdbc().update("UPDATE reserva SET data_hora_termino = ?::TIMESTAMPTZ WHERE id = ?", termino, id) > 0;
        }
        return false;
    }

    public boolean deletar(int id) {
        return jdbc().update("DELETE FROM reserva WHERE id = ?", id) > 0;
    }

    public String buscarStatus(int id) {
        List<String> rows = jdbc().queryForList(
            "SELECT status FROM reserva WHERE id = ?", String.class, id
        );
        return rows.isEmpty() ? null : rows.get(0);
    }

    public Map<String, Object> buscar(int id) {
        List<Map<String, Object>> rows = jdbc().queryForList(
            "SELECT r.id, r.espaco_id, e.nome AS nome_espaco, r.usuario_cpf, " +
            "r.data_hora_inicio, r.data_hora_termino, r.status " +
            "FROM reserva r JOIN espaco e ON r.espaco_id = e.id WHERE r.id = ?",
            id
        );
        return rows.isEmpty() ? null : rows.get(0);
    }

    public List<Map<String, Object>> listar() {
        return jdbc().queryForList(
            "SELECT r.id, r.espaco_id, e.nome AS nome_espaco, r.usuario_cpf, " +
            "r.data_hora_inicio, r.data_hora_termino, r.status " +
            "FROM reserva r JOIN espaco e ON r.espaco_id = e.id"
        );
    }

    public boolean atualizarStatus(int id, String status) {
        return jdbc().update(
            "UPDATE reserva SET status = ?::status_reserva_enum WHERE id = ?", status, id
        ) > 0;
    }
}
