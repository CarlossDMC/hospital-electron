package org.ifsc;

import com.sun.net.httpserver.HttpServer;
import org.ifsc.DB.DB;
import org.ifsc.controller.*;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        PacienteHandler pacienteHandler = new PacienteHandler();
        MedicoHandler medicoHandler = new MedicoHandler();
        AcompanhanteHandler acompanhanteHandler = new AcompanhanteHandler();
        EnfermeiroHandler enfermeiroHandler = new EnfermeiroHandler();
        FarmaceuticoHandler farmaceuticoHandler = new FarmaceuticoHandler();
        UsuarioHandler usuarioHandler = new UsuarioHandler();
        FornecedorHandler fornecedorHandler = new FornecedorHandler();
        AlaHandler alaHandler = new AlaHandler();
        QuartoHandler quartoHandler = new QuartoHandler();

        server.setExecutor(null);
        server.start();

        server.createContext("/paciente", pacienteHandler);
        server.createContext("/medico", medicoHandler);
        server.createContext("/acompanhante", acompanhanteHandler);
        server.createContext("/enfermeiro", enfermeiroHandler);
        server.createContext("/farmaceutico", farmaceuticoHandler);
        server.createContext("/usuario", usuarioHandler);
        server.createContext("/fornecedor", fornecedorHandler);
        server.createContext("/ala", alaHandler);
        server.createContext("/quarto", quartoHandler);

        System.out.println("Servidor rodando na porta 8000!");
        try {
            DB.openConnection();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
