package com.aps.api.service;

import com.aps.api.config.ConexaoBanco;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Override
    public boolean login(String cpf, String senha) {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();
        Integer count = jdbc.queryForObject(
            "SELECT COUNT(*) FROM usuario WHERE cpf = ? AND senha = ?",
            Integer.class, cpf, senha
        );
        return count != null && count > 0;
    }

    @Override
    public boolean cadastrarUsuario(String cpf, String senha) {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();
        Integer count = jdbc.queryForObject(
            "SELECT COUNT(*) FROM usuario WHERE cpf = ?",
            Integer.class, cpf
        );
        if (count != null && count > 0) return false;
        jdbc.update("INSERT INTO usuario (cpf, senha) VALUES (?, ?)", cpf, senha);
        return true;
    }

    @Override
    public boolean atualizarSenha(String cpf, String novaSenha, String senhaAtual) {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();
        Integer count = jdbc.queryForObject(
            "SELECT COUNT(*) FROM usuario WHERE cpf = ? AND senha = ?",
            Integer.class, cpf, senhaAtual
        );
        if (count == null || count == 0) return false;
        int rows = jdbc.update("UPDATE usuario SET senha = ? WHERE cpf = ?", novaSenha, cpf);
        return rows > 0;
    }

    @Override
    public boolean atualizarUsuario(String cpf, String novaSenha) {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();
        int rows = jdbc.update("UPDATE usuario SET senha = ? WHERE cpf = ?", novaSenha, cpf);
        return rows > 0;
    }

    @Override
    public boolean deletarUsuario(String cpf) {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();
        int rows = jdbc.update("DELETE FROM usuario WHERE cpf = ?", cpf);
        return rows > 0;
    }

    @Override
    public String buscarUsuario(String cpf) {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();
        List<String> result = jdbc.queryForList("SELECT cpf FROM usuario WHERE cpf = ?", String.class, cpf);
        return result.isEmpty() ? null : result.get(0);
    }

    @Override
    public List<String> listarUsuarios() {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();
        return jdbc.queryForList("SELECT cpf FROM usuario", String.class);
    }

    @Override
    public boolean isAdmin(String cpf) {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();
        List<Boolean> result = jdbc.queryForList(
            "SELECT is_admin FROM usuario WHERE cpf = ?", Boolean.class, cpf
        );
        return !result.isEmpty() && Boolean.TRUE.equals(result.get(0));
    }
}
