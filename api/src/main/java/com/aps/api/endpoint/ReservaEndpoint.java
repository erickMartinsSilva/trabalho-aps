package com.aps.api.endpoint;

import com.aps.api.service.ReservaEspacoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import org.w3c.dom.Document;

import javax.xml.transform.*;
import javax.xml.transform.dom.DOMResult;
import javax.xml.transform.stream.StreamSource;
import java.io.StringReader;
import java.util.List;
import java.util.Map;

@Endpoint
public class ReservaEndpoint {

    private static final String NAMESPACE = "http://www.aps.com/api/reserva";

    @Autowired
    private ReservaEspacoService reservaService;

    private String el(Document doc, String name) {
        var nodes = doc.getElementsByTagNameNS(NAMESPACE, name);
        return nodes.getLength() > 0 ? nodes.item(0).getTextContent() : null;
    }

    private Document parse(Source request) throws Exception {
        Transformer t = TransformerFactory.newInstance().newTransformer();
        DOMResult result = new DOMResult();
        t.transform(request, result);
        return (Document) result.getNode();
    }

    private Source resp(String tag, String body) {
        String xml = "<tns:" + tag + " xmlns:tns=\"" + NAMESPACE + "\">" + body + "</tns:" + tag + ">";
        return new StreamSource(new StringReader(xml));
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "reservarEspacoRequest")
    @ResponsePayload
    public Source reservarEspaco(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        boolean sucesso = reservaService.reservarEspaco(
            el(doc, "cpf"),
            Integer.parseInt(el(doc, "espacoId")),
            el(doc, "dataHoraInicio"),
            el(doc, "dataHoraTermino")
        );
        String mensagem = sucesso ? "Reserva criada com sucesso" : "Erro ao criar reserva";
        return resp("reservarEspacoResponse",
            "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + mensagem + "</tns:mensagem>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "atualizarReservaRequest")
    @ResponsePayload
    public Source atualizarReserva(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        int id = Integer.parseInt(el(doc, "id"));
        boolean sucesso = reservaService.atualizarReserva(id, el(doc, "dataHoraInicio"), el(doc, "dataHoraTermino"));
        String mensagem = sucesso ? "Reserva atualizada com sucesso" : "Não é possível atualizar (reserva concluída ou não encontrada)";
        return resp("atualizarReservaResponse",
            "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + mensagem + "</tns:mensagem>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "deletarReservaRequest")
    @ResponsePayload
    public Source deletarReserva(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        boolean sucesso = reservaService.deletarReserva(Integer.parseInt(el(doc, "id")));
        String mensagem = sucesso ? "Reserva deletada com sucesso" : "Não é possível deletar (reserva concluída ou não encontrada)";
        return resp("deletarReservaResponse",
            "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + mensagem + "</tns:mensagem>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "cancelarReservaRequest")
    @ResponsePayload
    public Source cancelarReserva(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        boolean sucesso = reservaService.cancelarReserva(Integer.parseInt(el(doc, "id")));
        String mensagem = sucesso ? "Reserva cancelada com sucesso" : "Não é possível cancelar (reserva não está no estado CRIADA)";
        return resp("cancelarReservaResponse",
            "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + mensagem + "</tns:mensagem>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "buscarReservaRequest")
    @ResponsePayload
    public Source buscarReserva(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        Map<String, Object> r = reservaService.buscarReserva(Integer.parseInt(el(doc, "id")));
        if (r == null) {
            return resp("buscarReservaResponse",
                "<tns:reserva><tns:id>0</tns:id><tns:espacoId>0</tns:espacoId>" +
                "<tns:nomeEspaco></tns:nomeEspaco><tns:cpfUsuario></tns:cpfUsuario>" +
                "<tns:dataHoraInicio></tns:dataHoraInicio><tns:dataHoraTermino></tns:dataHoraTermino>" +
                "<tns:status></tns:status></tns:reserva>");
        }
        return resp("buscarReservaResponse",
            "<tns:reserva>" +
              "<tns:id>" + r.get("id") + "</tns:id>" +
              "<tns:espacoId>" + r.get("espaco_id") + "</tns:espacoId>" +
              "<tns:nomeEspaco>" + r.get("nome_espaco") + "</tns:nomeEspaco>" +
              "<tns:cpfUsuario>" + r.get("usuario_cpf") + "</tns:cpfUsuario>" +
              "<tns:dataHoraInicio>" + r.get("data_hora_inicio") + "</tns:dataHoraInicio>" +
              "<tns:dataHoraTermino>" + r.get("data_hora_termino") + "</tns:dataHoraTermino>" +
              "<tns:status>" + r.get("status") + "</tns:status>" +
            "</tns:reserva>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "listarReservasRequest")
    @ResponsePayload
    public Source listarReservas(@RequestPayload Source request) throws Exception {
        List<Map<String, Object>> reservas = reservaService.listarReservas();
        StringBuilder sb = new StringBuilder();
        for (Map<String, Object> r : reservas) {
            sb.append("<tns:reservas>")
              .append("<tns:id>").append(r.get("id")).append("</tns:id>")
              .append("<tns:espacoId>").append(r.get("espaco_id")).append("</tns:espacoId>")
              .append("<tns:nomeEspaco>").append(r.get("nome_espaco")).append("</tns:nomeEspaco>")
              .append("<tns:cpfUsuario>").append(r.get("usuario_cpf")).append("</tns:cpfUsuario>")
              .append("<tns:dataHoraInicio>").append(r.get("data_hora_inicio")).append("</tns:dataHoraInicio>")
              .append("<tns:dataHoraTermino>").append(r.get("data_hora_termino")).append("</tns:dataHoraTermino>")
              .append("<tns:status>").append(r.get("status")).append("</tns:status>")
              .append("</tns:reservas>");
        }
        return resp("listarReservasResponse", sb.toString());
    }
}
