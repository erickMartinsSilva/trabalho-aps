package com.aps.api.repository;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Primary
public class ReservaRepositoryProxy implements ReservaRepository {

    private final ReservaRepositoryImpl bancoReal;

    public ReservaRepositoryProxy(ReservaRepositoryImpl bancoReal) {
        this.bancoReal = bancoReal;
    }

    @Override
    public boolean reservar(String cpf, int espacoId, String inicio, String termino) {
        System.out.println("[PROXY RESERVA] Interceptando nova reserva para o CPF: " + cpf);
        return bancoReal.reservar(cpf, espacoId, inicio, termino);
    }

    @Override
    public boolean atualizar(int id, String inicio, String termino) {
        System.out.println("[PROXY RESERVA] Interceptando atualização da reserva ID: " + id);
        return bancoReal.atualizar(id, inicio, termino);
    }

    @Override
    public boolean deletar(int id) {
        System.out.println("[PROXY RESERVA] Interceptando deleção da reserva ID: " + id);
        return bancoReal.deletar(id);
    }

    @Override
    public String buscarStatus(int id) {
        System.out.println("[PROXY RESERVA] Interceptando busca de status da reserva ID: " + id);
        return bancoReal.buscarStatus(id);
    }

    @Override
    public Map<String, Object> buscar(int id) {
        System.out.println("[PROXY RESERVA] Interceptando busca da reserva ID: " + id);
        return bancoReal.buscar(id);
    }

    @Override
    public List<Map<String, Object>> listar() {
        System.out.println("[PROXY RESERVA] Interceptando listagem de reservas");
        return bancoReal.listar();
    }

    @Override
    public boolean atualizarStatus(int id, String status) {
        System.out.println("[PROXY RESERVA] Interceptando atualização de status da reserva ID: " + id + " para " + status);
        return bancoReal.atualizarStatus(id, status);
    }
}