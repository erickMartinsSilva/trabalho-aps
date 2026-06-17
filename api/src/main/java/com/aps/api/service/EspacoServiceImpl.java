package com.aps.api.service;

import com.aps.api.model.EspacoModel;
import com.aps.api.model.StatusEspaco;
import com.aps.api.repository.EspacoRepository;
import com.aps.api.state.espaco.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EspacoServiceImpl implements EspacoService {

    @Autowired
    private EspacoRepository espacoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public boolean cadastrarEspaco(String cpf, String nome, String descricao, int capacidadeMax) {
        if (!usuarioService.isAdmin(cpf)) return false;
        return espacoRepository.cadastrar(nome, descricao, capacidadeMax);
    }

    @Override
    public boolean atualizarEspaco(String cpf, int id, String nome, String descricao, Integer capacidadeMax) {
        if (!usuarioService.isAdmin(cpf)) return false;
        return espacoRepository.atualizar(id, nome, descricao, capacidadeMax);
    }

    @Override
    public boolean deletarEspaco(String cpf, int id) {
        if (!usuarioService.isAdmin(cpf)) return false;
        return espacoRepository.deletar(id);
    }

    @Override
    public Map<String, Object> buscarEspaco(int id) {
        return espacoRepository.buscar(id);
    }

    @Override
    public List<Map<String, Object>> listarEspacos() {
        return espacoRepository.listar();
    }

    @Override
    public boolean fecharEspaco(String cpf, int id) {
        if (!usuarioService.isAdmin(cpf)) return false;

        Map<String, Object> row = espacoRepository.buscar(id);
        if (row == null) return false;

        StatusEspaco statusAtual = StatusEspaco.valueOf(String.valueOf(row.get("status")));
        EspacoModel espaco = new EspacoModel();
        espaco.setId(id);
        espaco.setStatus(statusAtual);

        EspacoState state = switch (statusAtual) {
            case DISPONIVEL -> new EspacoDisponivelState();
            case OCUPADO -> new EspacoReservadoState();
            case FECHADO_PARA_MANUTENCAO -> new EspacoManutencaoState();
        };

        try {
            state.iniciarManutencao(espaco);
        } catch (IllegalStateException e) {
            return false;
        }

        return espacoRepository.atualizarStatus(id, espaco.getStatus().name());
    }

    @Override
    public boolean reabrirEspaco(String cpf, int id) {
        if (!usuarioService.isAdmin(cpf)) return false;

        Map<String, Object> row = espacoRepository.buscar(id);
        if (row == null) return false;

        StatusEspaco statusAtual = StatusEspaco.valueOf(String.valueOf(row.get("status")));
        EspacoModel espaco = new EspacoModel();
        espaco.setId(id);
        espaco.setStatus(statusAtual);

        EspacoState state = switch (statusAtual) {
            case DISPONIVEL -> new EspacoDisponivelState();
            case OCUPADO -> new EspacoReservadoState();
            case FECHADO_PARA_MANUTENCAO -> new EspacoManutencaoState();
        };

        try {
            state.finalizarManutencao(espaco);
        } catch (IllegalStateException e) {
            return false;
        }

        return espacoRepository.atualizarStatus(id, espaco.getStatus().name());
    }
}
