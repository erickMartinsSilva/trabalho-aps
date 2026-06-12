package com.condominio.service;

import com.condominio.dto.ReservaDTO;
import com.condominio.model.Espaco;
import com.condominio.model.Reserva;
import com.condominio.repository.ReservaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Façade do subsistema de reservas.
 *
 * Centraliza toda a lógica de negócio compartilhada entre os serviços SOAP:
 *   - ReservaEspacoServiceImpl
 *   - ConsultaReservaServiceImpl
 *
 * Responsabilidades:
 *   1. Orquestrar a criação de reservas com atualização de estado do Espaço
 *   2. Cancelar reservas com validação de propriedade (CPF)
 *   3. Atualizar estado de reservas no repositório
 *   4. Converter entidades Reserva em ReservaDTO
 *   5. Fornecer acesso ao repositório para consultas
 */
public class ReservaBusinessService {

    private final ReservaRepository reservaRepository;

    public ReservaBusinessService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    // -------------------------------------------------------------------------
    // Criação
    // -------------------------------------------------------------------------

    /**
     * Persiste a reserva e atualiza o estado do espaço para AGUARDANDO.
     * Retorna o DTO com ID gerado.
     */
    public ReservaDTO criarReserva(Reserva reserva) {
        // Transiciona estado do espaço: disponível → aguardando
        Espaco espaco = reserva.getEspaco();
        if (espaco != null) {
            espaco.iniciarReserva();
            // Nota: a persistência do estado do Espaco é responsabilidade
            // do ReservaRepositoryImpl (terceiro) via coluna status.
        }

        Reserva salva = reservaRepository.salvar(reserva);
        return toDTO(salva);
    }

    // -------------------------------------------------------------------------
    // Cancelamento
    // -------------------------------------------------------------------------

    /**
     * Cancela uma reserva verificando que ela pertence ao CPF informado.
     *
     * @throws IllegalArgumentException se a reserva não existir ou não pertencer ao CPF
     * @throws IllegalStateException    se a reserva não puder ser cancelada (já cancelada/concluída)
     */
    public ReservaDTO cancelarReserva(Long reservaId, String cpf) {
        Optional<Reserva> opt = reservaRepository.buscarPorId(reservaId);

        Reserva reserva = opt.orElseThrow(() ->
                new IllegalArgumentException("Reserva com ID " + reservaId + " não encontrada."));

        if (!reserva.getCpf().equals(cpf)) {
            throw new IllegalArgumentException(
                    "A reserva ID " + reservaId + " não pertence ao CPF informado.");
        }

        // Dispara transição de estado (lança IllegalStateException se inválida)
        reserva.cancelar();

        // Atualiza estado do espaço: reservada/aguardando → disponível
        if (reserva.getEspaco() != null) {
            reserva.getEspaco().cancelar();
        }

        Reserva atualizada = reservaRepository.atualizar(reserva);
        return toDTO(atualizada);
    }

    // -------------------------------------------------------------------------
    // Consultas
    // -------------------------------------------------------------------------

    /**
     * Consulta reservas de um CPF em um intervalo de datas.
     * Retorna entidades (não DTOs) para permitir chamada de verificarConclusao().
     */
    public List<Reserva> buscarReservasPorCpfEPeriodo(String cpf,
                                                      LocalDateTime dataInicio,
                                                      LocalDateTime dataFim) {
        return reservaRepository.buscarPorCpfEPeriodo(cpf, dataInicio, dataFim);
    }

    /**
     * Persiste atualização de estado de uma reserva (ex: CRIADA → CONCLUIDA).
     */
    public void atualizarEstadoReserva(Reserva reserva) {
        reservaRepository.atualizar(reserva);
    }

    // -------------------------------------------------------------------------
    // Mapeamento
    // -------------------------------------------------------------------------

    public ReservaDTO toDTO(Reserva r) {
        return new ReservaDTO(
                r.getId(),
                r.getNomeMorador(),
                r.getCpf(),
                r.getEspaco() != null ? r.getEspaco().getNome() : null,
                r.getEspaco() != null ? r.getEspaco().getIdentificacao() : null,
                r.getDataInicio(),
                r.getDataFim(),
                r.getStatusNome()
        );
    }
}