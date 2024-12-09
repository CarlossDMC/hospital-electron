package org.ifsc;

import com.sun.net.httpserver.HttpServer;
import org.ifsc.DB.DB;
import org.ifsc.controller.AcompanhanteHandler;
import org.ifsc.controller.EnfermeiroHandler;
import org.ifsc.controller.MedicoHandler;
import org.ifsc.controller.PacienteHandler;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        PacienteHandler pacienteHandler = new PacienteHandler();
        MedicoHandler medicoHandler = new MedicoHandler();
        AcompanhanteHandler acompanhanteHandler = new AcompanhanteHandler();
        EnfermeiroHandler enfermeiroHandler = new EnfermeiroHandler();

        server.setExecutor(null);
        server.start();

        server.createContext("/paciente", pacienteHandler);
        server.createContext("/medico", medicoHandler);
        server.createContext("/acompanhante", acompanhanteHandler);
        server.createContext("/enfermeiro", enfermeiroHandler);

        System.out.println("Servidor rodando na porta 8000!");
        try {
            DB.openConnection();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
