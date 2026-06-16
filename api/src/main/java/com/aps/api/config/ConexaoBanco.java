package com.aps.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class ConexaoBanco {

    private static ConexaoBanco instancia;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ConexaoBanco(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        instancia = this;
    }

    public static ConexaoBanco getInstance() {
        return instancia;
    }

    public JdbcTemplate getJdbc() {
        return jdbcTemplate;
    }
}
