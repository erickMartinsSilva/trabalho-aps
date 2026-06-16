package com.aps.api.endpoint;

import com.aps.api.service.EspacoService;
import com.aps.api.service.UsuarioService;
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
public class EspacoEndpoint {

    private static final String NAMESPACE = "http://www.aps.com/api/espaco";
    private static final String NAO_AUTORIZADO = "Acesso negado: apenas administradores podem realizar esta operação";

    @Autowired
    private EspacoService espacoService;

    @Autowired
    private UsuarioService usuarioService;

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

    private Source naoAutorizado(String tag) {
        return resp(tag, "<tns:sucesso>false</tns:sucesso><tns:mensagem>" + NAO_AUTORIZADO + "</tns:mensagem>");
    }

    private String body(boolean sucesso, String ok, String ko) {
        return "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + (sucesso ? ok : ko) + "</tns:mensagem>";
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "cadastrarEspacoRequest")
    @ResponsePayload
    public Source cadastrarEspaco(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        String cpf = el(doc, "cpf");
        if (!usuarioService.isAdmin(cpf)) return naoAutorizado("cadastrarEspacoResponse");
        boolean sucesso = espacoService.cadastrarEspaco(cpf, el(doc, "nome"), Integer.parseInt(el(doc, "capacidadeMaxima")));
        return resp("cadastrarEspacoResponse", body(sucesso, "Espaço cadastrado com sucesso", "Erro ao cadastrar espaço"));
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "atualizarEspacoRequest")
    @ResponsePayload
    public Source atualizarEspaco(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        String cpf = el(doc, "cpf");
        if (!usuarioService.isAdmin(cpf)) return naoAutorizado("atualizarEspacoResponse");
        String capStr = el(doc, "capacidadeMaxima");
        Integer cap = capStr != null && !capStr.isBlank() ? Integer.parseInt(capStr) : null;
        boolean sucesso = espacoService.atualizarEspaco(cpf, Integer.parseInt(el(doc, "id")), el(doc, "nome"), cap);
        return resp("atualizarEspacoResponse", body(sucesso, "Espaço atualizado com sucesso", "Espaço não encontrado"));
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "deletarEspacoRequest")
    @ResponsePayload
    public Source deletarEspaco(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        String cpf = el(doc, "cpf");
        if (!usuarioService.isAdmin(cpf)) return naoAutorizado("deletarEspacoResponse");
        boolean sucesso = espacoService.deletarEspaco(cpf, Integer.parseInt(el(doc, "id")));
        return resp("deletarEspacoResponse", body(sucesso, "Espaço deletado com sucesso", "Espaço não encontrado"));
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "buscarEspacoRequest")
    @ResponsePayload
    public Source buscarEspaco(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        Map<String, Object> e = espacoService.buscarEspaco(Integer.parseInt(el(doc, "id")));
        if (e == null) {
            return resp("buscarEspacoResponse",
                "<tns:espaco><tns:id>0</tns:id><tns:nome></tns:nome>" +
                "<tns:capacidadeMaxima>0</tns:capacidadeMaxima><tns:status></tns:status></tns:espaco>");
        }
        return resp("buscarEspacoResponse",
            "<tns:espaco>" +
              "<tns:id>" + e.get("id") + "</tns:id>" +
              "<tns:nome>" + e.get("nome") + "</tns:nome>" +
              "<tns:capacidadeMaxima>" + e.get("capacidademax") + "</tns:capacidadeMaxima>" +
              "<tns:status>" + e.get("status") + "</tns:status>" +
            "</tns:espaco>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "listarEspacosRequest")
    @ResponsePayload
    public Source listarEspacos(@RequestPayload Source request) throws Exception {
        List<Map<String, Object>> espacos = espacoService.listarEspacos();
        StringBuilder sb = new StringBuilder();
        for (Map<String, Object> e : espacos) {
            sb.append("<tns:espacos>")
              .append("<tns:id>").append(e.get("id")).append("</tns:id>")
              .append("<tns:nome>").append(e.get("nome")).append("</tns:nome>")
              .append("<tns:capacidadeMaxima>").append(e.get("capacidademax")).append("</tns:capacidadeMaxima>")
              .append("<tns:status>").append(e.get("status")).append("</tns:status>")
              .append("</tns:espacos>");
        }
        return resp("listarEspacosResponse", sb.toString());
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "fecharEspacoRequest")
    @ResponsePayload
    public Source fecharEspaco(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        String cpf = el(doc, "cpf");
        if (!usuarioService.isAdmin(cpf)) return naoAutorizado("fecharEspacoResponse");
        boolean sucesso = espacoService.fecharEspaco(cpf, Integer.parseInt(el(doc, "id")));
        return resp("fecharEspacoResponse", body(sucesso, "Espaço fechado para manutenção", "Não foi possível fechar: espaço não está DISPONÍVEL ou não encontrado"));
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "reabrirEspacoRequest")
    @ResponsePayload
    public Source reabrirEspaco(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        String cpf = el(doc, "cpf");
        if (!usuarioService.isAdmin(cpf)) return naoAutorizado("reabrirEspacoResponse");
        boolean sucesso = espacoService.reabrirEspaco(cpf, Integer.parseInt(el(doc, "id")));
        return resp("reabrirEspacoResponse", body(sucesso, "Espaço reaberto com sucesso", "Não foi possível reabrir: espaço não está em MANUTENÇÃO ou não encontrado"));
    }
}
