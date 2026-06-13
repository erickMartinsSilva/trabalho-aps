package com.aps.api.config;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.ws.config.annotation.EnableWs;
import org.springframework.ws.transport.http.MessageDispatcherServlet;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;
import org.springframework.xml.xsd.XsdSchema;

@EnableWs
@Configuration
public class WebServiceConfig {

    @Bean
    public ServletRegistrationBean<MessageDispatcherServlet> messageDispatcherServlet(
            ApplicationContext context) {
        MessageDispatcherServlet servlet = new MessageDispatcherServlet();
        servlet.setApplicationContext(context);
        servlet.setTransformWsdlLocations(true);
        return new ServletRegistrationBean<>(servlet, "/ws/*");
    }

    @Bean
    public XsdSchema usuarioSchema() {
        return new SimpleXsdSchema(new ClassPathResource("wsdl/usuario.xsd"));
    }

    @Bean(name = "usuario")
    public DefaultWsdl11Definition usuarioWsdl(XsdSchema usuarioSchema) {
        DefaultWsdl11Definition wsdl = new DefaultWsdl11Definition();
        wsdl.setPortTypeName("UsuarioPort");
        wsdl.setLocationUri("/ws");
        wsdl.setTargetNamespace("http://www.aps.com/api/usuario");
        wsdl.setSchema(usuarioSchema);
        return wsdl;
    }

    @Bean
    public XsdSchema espacoSchema() {
        return new SimpleXsdSchema(new ClassPathResource("wsdl/espaco.xsd"));
    }

    @Bean(name = "espaco")
    public DefaultWsdl11Definition espacoWsdl(XsdSchema espacoSchema) {
        DefaultWsdl11Definition wsdl = new DefaultWsdl11Definition();
        wsdl.setPortTypeName("EspacoPort");
        wsdl.setLocationUri("/ws");
        wsdl.setTargetNamespace("http://www.aps.com/api/espaco");
        wsdl.setSchema(espacoSchema);
        return wsdl;
    }

    @Bean
    public XsdSchema reservaSchema() {
        return new SimpleXsdSchema(new ClassPathResource("wsdl/reserva.xsd"));
    }

    @Bean(name = "reserva")
    public DefaultWsdl11Definition reservaWsdl(XsdSchema reservaSchema) {
        DefaultWsdl11Definition wsdl = new DefaultWsdl11Definition();
        wsdl.setPortTypeName("ReservaPort");
        wsdl.setLocationUri("/ws");
        wsdl.setTargetNamespace("http://www.aps.com/api/reserva");
        wsdl.setSchema(reservaSchema);
        return wsdl;
    }
}