package com.condominio.strategy;

import com.condominio.dto.ReservaRequestDTO;
import com.condominio.model.Reserva;
import com.condominio.repository.ReservaRepository;

import java.util.List;

/**
 * Validador de disponibilidade de espaço — implementação do padrão Strategy.
 *
 * Verifica se o espaço solicitado está livre no período informado,
 * consultando o repositório de reservas ativas (status CRIADA).
 *
 * Um conflito ocorre quando, para o mesmo espaço e identificação,
 * existe uma reserva cujo período se sobrepõe ao solicitado:
 *   existente.dataInicio < request.dataFim
 *   AND existente.dataFim   > request.dataInicio
 */
public class ValidadorDisponibilidade implements ValidadorStrategy {

    private final ReservaRepository reservaRepository;

    public ValidadorDisponibilidade(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    @Override
    public void validar(ReservaRequestDTO request) {
        if (request.getEspacoNome() == null || request.getEspacoNome().isBlank())
            throw new IllegalArgumentException("Nome do espaço é obrigatório.");
        if (request.getEspacoIdentificacao() == null || request.getEspacoIdentificacao().isBlank())
            throw new IllegalArgumentException("Identificação do espaço é obrigatória.");
        if (request.getDataInicio() == null)
            throw new IllegalArgumentException("Data de início é obrigatória.");
        if (request.getDataFim() == null)
            throw new IllegalArgumentException("Data de fim é obrigatória.");
        if (!request.getDataInicio().isBefore(request.getDataFim()))
            throw new IllegalArgumentException("Data de início deve ser anterior à data de fim.");

        List<Reserva> conflitos = reservaRepository.buscarReservasAtivasNosPeriodo(
                request.getEspacoNome(),
                request.getEspacoIdentificacao(),
                request.getDataInicio(),
                request.getDataFim()
        );

        if (!conflitos.isEmpty()) {
            throw new IllegalArgumentException(
                    "Espaço '" + request.getEspacoNome() + " " + request.getEspacoIdentificacao() +
                            "' não está disponível no período solicitado: " +
                            request.getDataInicio() + " até " + request.getDataFim() + ".");
        }
    }
}