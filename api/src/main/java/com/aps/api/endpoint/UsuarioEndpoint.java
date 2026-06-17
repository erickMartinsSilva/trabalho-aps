package com.aps.api.endpoint;

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

@Endpoint
public class UsuarioEndpoint {

    private static final String NAMESPACE = "http://www.aps.com/api/usuario";

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

    @PayloadRoot(namespace = NAMESPACE, localPart = "loginRequest")
    @ResponsePayload
    public Source login(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        String cpf = el(doc, "cpf");
        boolean sucesso = usuarioService.login(cpf, el(doc, "senha"));
        String mensagem = sucesso ? "Login realizado com sucesso" : "CPF ou senha incorretos";
        boolean isAdmin = sucesso && usuarioService.isAdmin(cpf);
        return resp("loginResponse", "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + mensagem + "</tns:mensagem><tns:isAdmin>" + isAdmin + "</tns:isAdmin>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "cadastrarUsuarioRequest")
    @ResponsePayload
    public Source cadastrarUsuario(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        boolean sucesso = usuarioService.cadastrarUsuario(el(doc, "cpf"), el(doc, "senha"));
        String mensagem = sucesso ? "Usuário cadastrado com sucesso" : "CPF já cadastrado";
        return resp("cadastrarUsuarioResponse", "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + mensagem + "</tns:mensagem>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "atualizarUsuarioRequest")
    @ResponsePayload
    public Source atualizarUsuario(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        boolean sucesso = usuarioService.atualizarUsuario(el(doc, "cpf"), el(doc, "senha"));
        String mensagem = sucesso ? "Usuário atualizado com sucesso" : "Usuário não encontrado";
        return resp("atualizarUsuarioResponse", "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + mensagem + "</tns:mensagem>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "alterarSenhaRequest")
    @ResponsePayload
    public Source alterarSenha(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        boolean sucesso = usuarioService.atualizarSenha(el(doc, "cpf"), el(doc, "senhaNova"), el(doc, "senhaAtual"));
        String mensagem = sucesso ? "Senha alterada com sucesso" : "Senha atual incorreta ou usuário não encontrado";
        return resp("alterarSenhaResponse", "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + mensagem + "</tns:mensagem>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "deletarUsuarioRequest")
    @ResponsePayload
    public Source deletarUsuario(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        boolean sucesso = usuarioService.deletarUsuario(el(doc, "cpf"));
        String mensagem = sucesso ? "Usuário deletado com sucesso" : "Usuário não encontrado";
        return resp("deletarUsuarioResponse", "<tns:sucesso>" + sucesso + "</tns:sucesso><tns:mensagem>" + mensagem + "</tns:mensagem>");
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "buscarUsuarioRequest")
    @ResponsePayload
    public Source buscarUsuario(@RequestPayload Source request) throws Exception {
        Document doc = parse(request);
        String cpf = usuarioService.buscarUsuario(el(doc, "cpf"));
        String body = cpf != null ? "<tns:cpf>" + cpf + "</tns:cpf>" : "<tns:cpf></tns:cpf>";
        return resp("buscarUsuarioResponse", body);
    }

    @PayloadRoot(namespace = NAMESPACE, localPart = "listarUsuariosRequest")
    @ResponsePayload
    public Source listarUsuarios(@RequestPayload Source request) throws Exception {
        List<String> usuarios = usuarioService.listarUsuarios();
        StringBuilder sb = new StringBuilder();
        for (String cpf : usuarios) {
            sb.append("<tns:usuarios><tns:cpf>").append(cpf).append("</tns:cpf></tns:usuarios>");
        }
        return resp("listarUsuariosResponse", sb.toString());
    }

    private Source resp(String tag, String body) {
        String xml = "<tns:" + tag + " xmlns:tns=\"" + NAMESPACE + "\">" + body + "</tns:" + tag + ">";
        return new StreamSource(new StringReader(xml));
    }
}
