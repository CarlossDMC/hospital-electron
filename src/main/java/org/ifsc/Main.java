package org.ifsc;

import com.sun.net.httpserver.HttpServer;
import org.ifsc.DB.DB;
import org.ifsc.controller.PacienteHandler;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        PacienteHandler pacienteHandler = new PacienteHandler();

        server.setExecutor(null);
        server.start();

        server.createContext("/paciente", pacienteHandler);

        System.out.println("Servidor rodando na porta 8000!");
        try {
            DB.openConnection();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
