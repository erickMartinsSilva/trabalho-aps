package com.aps.api.scheduler;

import com.aps.api.model.ReservaModel;
import com.aps.api.model.StatusReserva;
import com.aps.api.repository.ReservaRepository;
import com.aps.api.state.reserva.ReservaCriadaState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@Component
public class ReservaConclusaoScheduler {

    @Autowired
    private ReservaRepository reservaRepository;

    @Scheduled(fixedRate = 60000)
    public void verificarReservasConcluidas() {

        List<Map<String, Object>> reservas = reservaRepository.listar();
        OffsetDateTime agora = OffsetDateTime.now();

        for (Map<String, Object> row : reservas) {
            String statusAtual = String.valueOf(row.get("status"));
            
            if ("CRIADA".equals(statusAtual)) {
                OffsetDateTime termino = toOffsetDateTime(row.get("data_hora_termino"));

                if (termino != null && termino.isBefore(agora)) {
                    int id = ((Number) row.get("id")).intValue();

                    ReservaModel reserva = new ReservaModel();
                    reserva.setStatus(StatusReserva.CRIADA);
                    reserva.setDataHoraInicio(toOffsetDateTime(row.get("data_hora_inicio")));
                    reserva.setDataHoraTermino(termino);

                    new ReservaCriadaState().verificarConclusao(reserva);

                    if (StatusReserva.CONCLUIDA.equals(reserva.getStatus())) {
                        reservaRepository.atualizarStatus(id, "CONCLUIDA");
                    }
                }
            }
        }
    }

    private OffsetDateTime toOffsetDateTime(Object value) {
        if (value == null) return null;
        if (value instanceof OffsetDateTime odt) return odt;
        if (value instanceof java.sql.Timestamp ts) return ts.toInstant().atOffset(java.time.ZoneOffset.UTC);
        return OffsetDateTime.now().minusDays(1);
    }
}