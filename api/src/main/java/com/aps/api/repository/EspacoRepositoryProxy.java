package com.aps.api.repository;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Primary
public class EspacoRepositoryProxy implements EspacoRepository {

    private final EspacoRepositoryImpl bancoReal;

    public EspacoRepositoryProxy(EspacoRepositoryImpl bancoReal) {
        this.bancoReal = bancoReal;
    }

    @Override
    public boolean cadastrar(String nome, String descricao, int capacidadeMax) {
        System.out.println("[PROXY ESPAÇO] Interceptando cadastro: " + nome);
        return bancoReal.cadastrar(nome, descricao, capacidadeMax);
    }

    @Override
    public boolean atualizar(int id, String nome, String descricao, Integer capacidadeMax) {
        System.out.println("[PROXY ESPAÇO] Interceptando atualização do ID: " + id);
        return bancoReal.atualizar(id, nome, descricao, capacidadeMax);
    }

    @Override
    public boolean deletar(int id) {
        System.out.println("[PROXY ESPAÇO] Interceptando deleção do ID: " + id);
        return bancoReal.deletar(id);
    }

    @Override
    public Map<String, Object> buscar(int id) {
        System.out.println("[PROXY ESPAÇO] Interceptando busca do ID: " + id);
        return bancoReal.buscar(id);
    }

    @Override
    public List<Map<String, Object>> listar() {
        System.out.println("[PROXY ESPAÇO] Interceptando listagem de espaços");
        return bancoReal.listar();
    }

    @Override
    public boolean atualizarStatus(int id, String status) {
        System.out.println("[PROXY ESPAÇO] Interceptando atualização de status do ID: " + id + " para " + status);
        return bancoReal.atualizarStatus(id, status);
    }
}