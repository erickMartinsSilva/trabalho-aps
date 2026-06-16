package com.aps.api.endpoint;

import com.aps.api.service.RelatorioReservasService;
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
public class RelatorioEndpoint {

    private static final String NAMESPACE = "http://www.aps.com/api/relatorio";

    @Autowired
    private RelatorioReservasService relatorioService;

    private String el(Document doc, String name) {
        var nodes = doc.getElementsByTagNameNS(NAMESPACE, name);
        return nodes.getLength() > 0 ? nodes.item(0).getTextContent() : null;
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "gerarRelatorioRequest")
    @ResponsePayload
    public Source gerarRelatorio(@RequestPayload Source request) throws Exception {
        Transformer t = TransformerFactory.newInstance().newTransformer();
        DOMResult result = new DOMResult();
        t.transform(request, result);
        Document doc = (Document) result.getNode();

        List<Map<String, Object>> reservas = relatorioService.gerarRelatorio(
            el(doc, "dataHoraInicio"),
            el(doc, "dataHoraTermino")
        );

        StringBuilder sb = new StringBuilder();
        sb.append("<tns:gerarRelatorioResponse xmlns:tns=\"").append(NAMESPACE).append("\">");
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
        sb.append("</tns:gerarRelatorioResponse>");

        return new StreamSource(new StringReader(sb.toString()));
    }
}
