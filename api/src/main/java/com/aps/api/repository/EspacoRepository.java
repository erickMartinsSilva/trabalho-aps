package com.aps.api.repository;

import com.aps.api.config.ConexaoBanco;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class EspacoRepository {

    private org.springframework.jdbc.core.JdbcTemplate jdbc() {
        return ConexaoBanco.getInstance().getJdbc();
    }

    public boolean cadastrar(String nome, int capacidadeMax) {
        int rows = jdbc().update(
            "INSERT INTO espaco (nome, capacidademax, status) VALUES (?, ?, 'DISPONIVEL'::estado_enum)",
            nome, capacidadeMax
        );
        return rows > 0;
    }

    public boolean atualizar(int id, String nome, Integer capacidadeMax) {
        if (nome != null && capacidadeMax != null) {
            return jdbc().update(
                "UPDATE espaco SET nome = ?, capacidademax = ? WHERE id = ?", nome, capacidadeMax, id
            ) > 0;
        } else if (nome != null) {
            return jdbc().update("UPDATE espaco SET nome = ? WHERE id = ?", nome, id) > 0;
        } else if (capacidadeMax != null) {
            return jdbc().update("UPDATE espaco SET capacidademax = ? WHERE id = ?", capacidadeMax, id) > 0;
        }
        return false;
    }

    public boolean deletar(int id) {
        return jdbc().update("DELETE FROM espaco WHERE id = ?", id) > 0;
    }

    public Map<String, Object> buscar(int id) {
        List<Map<String, Object>> rows = jdbc().queryForList(
            "SELECT id, nome, capacidademax, status FROM espaco WHERE id = ?", id
        );
        return rows.isEmpty() ? null : rows.get(0);
    }

    public List<Map<String, Object>> listar() {
        return jdbc().queryForList("SELECT id, nome, capacidademax, status FROM espaco");
    }

    public boolean atualizarStatus(int id, String status) {
        return jdbc().update(
            "UPDATE espaco SET status = ?::estado_enum WHERE id = ?", status, id
        ) > 0;
    }
}
