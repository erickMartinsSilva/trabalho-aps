package com.condominio.repository;

import com.condominio.model.Reserva;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Interface do repositório de Reservas.
 *
 * Define o contrato de acesso a dados — a implementação concreta
 * (ReservaRepositoryImpl, via JDBC/SQL sobre BancoCondominio)
 * é responsabilidade de outro membro da equipe.
 *
 * Assinaturas definidas conforme os serviços SOAP do sistema:
 *   - ReservaEspacoService    → salvar
 *   - ConsultaReservaService  → buscarPorCpfEPeriodo
 *   - RelatorioReservasService→ buscarTodosPorPeriodo  (implementado pelo amigo)
 *   - ValidadorDisponibilidade→ buscarReservasAtivasNosPeriodo
 */
public interface ReservaRepository {

    /**
     * Persiste uma nova reserva e retorna a entidade com o ID gerado.
     */
    Reserva salvar(Reserva reserva);

    /**
     * Atualiza o estado de uma reserva existente (ex: CRIADA → CANCELADA).
     */
    Reserva atualizar(Reserva reserva);

    /**
     * Busca uma reserva pelo seu identificador.
     */
    Optional<Reserva> buscarPorId(Long id);

    /**
     * Retorna todas as reservas de um CPF dentro do intervalo de datas.
     * Usado pelo ConsultaReservaService.
     *
     * @param cpf         CPF do morador
     * @param dataInicio  início do intervalo (inclusive)
     * @param dataFim     fim do intervalo (inclusive)
     */
    List<Reserva> buscarPorCpfEPeriodo(String cpf, LocalDateTime dataInicio, LocalDateTime dataFim);

    /**
     * Retorna todas as reservas de todos os moradores dentro do intervalo.
     * Usado pelo RelatorioReservasService (administrativo).
     *
     * @param dataInicio início do intervalo (inclusive)
     * @param dataFim    fim do intervalo (inclusive)
     */
    List<Reserva> buscarTodosPorPeriodo(LocalDateTime dataInicio, LocalDateTime dataFim);

    /**
     * Retorna reservas ativas (status CRIADA) que se sobrepõem ao período
     * informado para um determinado espaço.
     * Usado pelo ValidadorDisponibilidade (Strategy).
     *
     * Condição de sobreposição:
     *   reserva.dataInicio < dataFim AND reserva.dataFim > dataInicio
     *
     * @param espacoNome          nome do espaço (ex: "Churrasqueira")
     * @param espacoIdentificacao identificação do espaço (ex: "A")
     * @param dataInicio          início do intervalo solicitado
     * @param dataFim             fim do intervalo solicitado
     */
    List<Reserva> buscarReservasAtivasNosPeriodo(String espacoNome,
                                                 String espacoIdentificacao,
                                                 LocalDateTime dataInicio,
                                                 LocalDateTime dataFim);
}