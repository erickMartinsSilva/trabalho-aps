package com.aps.api.endpoint;

import com.aps.api.service.ConsultaDisponibilidadeService;
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
import java.util.Map;

@Endpoint
public class DisponibilidadeEndpoint {

    private static final String NAMESPACE = "http://www.aps.com/api/disponibilidade";

    @Autowired
    private ConsultaDisponibilidadeService disponibilidadeService;

    private String el(Document doc, String name) {
        var nodes = doc.getElementsByTagNameNS(NAMESPACE, name);
        return nodes.getLength() > 0 ? nodes.item(0).getTextContent() : null;
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "consultarDisponibilidadeRequest")
    @ResponsePayload
    public Source consultarDisponibilidade(@RequestPayload Source request) throws Exception {
        Transformer t = TransformerFactory.newInstance().newTransformer();
        DOMResult result = new DOMResult();
        t.transform(request, result);
        Document doc = (Document) result.getNode();

        int espacoId       = Integer.parseInt(el(doc, "espacoId"));
        String inicio      = el(doc, "dataHoraInicio");
        String termino     = el(doc, "dataHoraTermino");

        Map<String, Object> info = disponibilidadeService.consultarDisponibilidade(espacoId, inicio, termino);

        StringBuilder sb = new StringBuilder();
        sb.append("<tns:consultarDisponibilidadeResponse xmlns:tns=\"").append(NAMESPACE).append("\">");
        if (info != null) {
            sb.append("<tns:disponibilidades>")
              .append("<tns:espacoId>").append(info.get("espacoId")).append("</tns:espacoId>")
              .append("<tns:nomeEspaco>").append(info.get("nomeEspaco")).append("</tns:nomeEspaco>")
              .append("<tns:dataHoraInicio>").append(info.get("dataHoraInicio")).append("</tns:dataHoraInicio>")
              .append("<tns:dataHoraTermino>").append(info.get("dataHoraTermino")).append("</tns:dataHoraTermino>")
              .append("<tns:disponivel>").append(info.get("disponivel")).append("</tns:disponivel>")
              .append("</tns:disponibilidades>");
        }
        sb.append("</tns:consultarDisponibilidadeResponse>");

        return new StreamSource(new StringReader(sb.toString()));
    }
}
