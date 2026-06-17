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

    public boolean cadastrar(String nome, String descricao, int capacidadeMax) {
        int rows = jdbc().update(
            "INSERT INTO espaco (nome, descricao, capacidademax, status) VALUES (?, ?, ?, 'DISPONIVEL'::estado_enum)",
            nome, descricao, capacidadeMax
        );
        return rows > 0;
    }

    public boolean atualizar(int id, String nome, String descricao, Integer capacidadeMax) {
        StringBuilder sql = new StringBuilder("UPDATE espaco SET ");
        List<Object> params = new java.util.ArrayList<>();
        if (nome != null) {
            sql.append("nome = ?, ");
            params.add(nome);
        }
        if (descricao != null) {
            sql.append("descricao = ?, ");
            params.add(descricao);
        }
        if (capacidadeMax != null) {
            sql.append("capacidademax = ?, ");
            params.add(capacidadeMax);
        }
        
        if (params.isEmpty()) return false;
        
        // Remove trailing comma and space
        sql.setLength(sql.length() - 2);
        sql.append(" WHERE id = ?");
        params.add(id);

        return jdbc().update(sql.toString(), params.toArray()) > 0;
    }

    public boolean deletar(int id) {
        return jdbc().update("DELETE FROM espaco WHERE id = ?", id) > 0;
    }

    public Map<String, Object> buscar(int id) {
        List<Map<String, Object>> rows = jdbc().queryForList(
            "SELECT id, nome, descricao, capacidademax, status FROM espaco WHERE id = ?", id
        );
        return rows.isEmpty() ? null : rows.get(0);
    }

    public List<Map<String, Object>> listar() {
        return jdbc().queryForList("SELECT id, nome, descricao, capacidademax, status FROM espaco");
    }

    public boolean atualizarStatus(int id, String status) {
        return jdbc().update(
            "UPDATE espaco SET status = ?::estado_enum WHERE id = ?", status, id
        ) > 0;
    }
}
