package com.aps.api.service;

import com.aps.api.model.ReservaModel;
import com.aps.api.model.StatusReserva;
import com.aps.api.repository.ReservaRepository;
import com.aps.api.state.reserva.ReservaCriadaState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReservaEspacoServiceImpl implements ReservaEspacoService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public boolean reservarEspaco(String cpf, int espacoId, String inicio, String termino) {
        return reservaRepository.reservar(cpf, espacoId, inicio, termino);
    }

    @Override
    public boolean atualizarReserva(int id, String inicio, String termino) {
        String status = reservaRepository.buscarStatus(id);
        if ("CONCLUIDA".equals(status)) return false;
        return reservaRepository.atualizar(id, inicio, termino);
    }

    @Override
    public boolean deletarReserva(int id) {
        String status = reservaRepository.buscarStatus(id);
        if ("CONCLUIDA".equals(status)) return false;
        return reservaRepository.deletar(id);
    }

    @Override
    public boolean cancelarReserva(int id) {
        String status = reservaRepository.buscarStatus(id);
        if (!"CRIADA".equals(status)) return false;

        ReservaModel reserva = new ReservaModel();
        reserva.setStatus(StatusReserva.CRIADA);
        new ReservaCriadaState().cancelar(reserva);
        return reservaRepository.atualizarStatus(id, reserva.getStatus().name());
    }

    @Override
    public Map<String, Object> buscarReserva(int id) {
        return reservaRepository.buscar(id);
    }

    @Override
    public List<Map<String, Object>> listarReservas() {
        return reservaRepository.listar();
    }
}
