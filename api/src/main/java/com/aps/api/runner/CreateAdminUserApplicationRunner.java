package com.aps.api.runner;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.aps.api.service.UsuarioService;

@Component 
public class CreateAdminUserApplicationRunner implements ApplicationRunner {
    private final UsuarioService usuarioService;

    public CreateAdminUserApplicationRunner(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Value("${app.bootstrap.admin.cpf:}")
    private String adminCpf;
    @Value("${app.bootstrap.admin.password:}")
    private String adminPassword;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if(usuarioService.hasAdmin()) {
            System.out.println("Banco de dados já possui um usuário admin, encerrando runner...");
            return;
        };

        boolean anyBootstrapCredentialsBlank = adminCpf.equals("")
            || adminPassword.equals("");
        if(anyBootstrapCredentialsBlank) {
            System.out.println("Credenciais de admin para bootstrap não foram configuradas, encerrando runner...");
            return;
        }

        boolean result = usuarioService.cadastrarAdmin(adminCpf, adminPassword);
        if(!result) {
            System.out.println("Erro ao criar administrador por bootstrap. Encerrando runner...");
        } else {
            System.out.println("Administrador criado por bootstrap com sucesso! Encerrando runner...");
        }
    }
}
