package com.aps.api.repository;

import com.aps.api.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioModel, String> {
    Optional<UsuarioModel> findByCpfAndSenha(String cpf, String senha);
    Optional<UsuarioModel> findByCpf(String cpf);
}
