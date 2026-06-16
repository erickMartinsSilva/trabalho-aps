package com.aps.api.service;

import java.util.List;

public interface UsuarioService {
    boolean login(String cpf, String senha);
    boolean cadastrarUsuario(String cpf, String senha);
    boolean atualizarSenha(String cpf, String novaSenha, String senhaAtual);
    boolean atualizarUsuario(String cpf, String novaSenha);
    boolean deletarUsuario(String cpf);
    String buscarUsuario(String cpf);
    List<String> listarUsuarios();
    boolean isAdmin(String cpf);
}
