package com.aps.api.scheduler;

import com.aps.api.config.ConexaoBanco;
import com.aps.api.model.ReservaModel;
import com.aps.api.model.StatusReserva;
import com.aps.api.state.reserva.ReservaCriadaState;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@Component
public class ReservaConclusaoScheduler {

    @Scheduled(fixedRate = 60000)
    public void verificarReservasConcluidas() {
        JdbcTemplate jdbc = ConexaoBanco.getInstance().getJdbc();

        List<Map<String, Object>> reservas = jdbc.queryForList(
            "SELECT id, data_hora_inicio, data_hora_termino FROM reserva " +
            "WHERE status = 'CRIADA'::status_reserva_enum AND data_hora_termino < NOW()"
        );

        for (Map<String, Object> row : reservas) {
            int id = ((Number) row.get("id")).intValue();

            ReservaModel reserva = new ReservaModel();
            reserva.setStatus(StatusReserva.CRIADA);
            reserva.setDataHoraInicio(toOffsetDateTime(row.get("data_hora_inicio")));
            reserva.setDataHoraTermino(toOffsetDateTime(row.get("data_hora_termino")));

            new ReservaCriadaState().verificarConclusao(reserva);

            if (StatusReserva.CONCLUIDA.equals(reserva.getStatus())) {
                jdbc.update(
                    "UPDATE reserva SET status = 'CONCLUIDA'::status_reserva_enum WHERE id = ?", id
                );
            }
        }
    }

    private OffsetDateTime toOffsetDateTime(Object value) {
        if (value instanceof OffsetDateTime odt) return odt;
        if (value instanceof java.sql.Timestamp ts) return ts.toInstant().atOffset(java.time.ZoneOffset.UTC);
        return OffsetDateTime.now().minusDays(1);
    }
}
