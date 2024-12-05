package org.ifsc.controller;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Paciente;
import org.ifsc.utils.Utils;

import java.io.IOException;
import java.io.InputStream;

public class PacienteHandler implements HttpHandler {
    private final Utils utils = new Utils();

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        String boddy = utils.getRequestBody(exchange);

        switch (method) {
            case "GET":
                return;
            case "POST":
                return;
            case "PUT":
                return;
            case "DELETE":
                return;
        }
    }

    private Paciente insertPaciente(String boddy){
        Gson gson = new Gson();
        Paciente paciente = gson.fromJson(boddy, Paciente.class);
        return null;
    }


}
