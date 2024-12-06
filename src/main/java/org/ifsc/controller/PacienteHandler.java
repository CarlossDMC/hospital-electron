package org.ifsc.controller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Paciente;
import org.ifsc.service.PacienteService;
import org.ifsc.utils.JsonUtils;
import org.ifsc.utils.Utils;

import java.io.IOException;

public class PacienteHandler implements HttpHandler {
    private final Utils utils = new Utils();
    private final PacienteService pacienteService = new PacienteService();

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        Utils.handleCors(exchange);
        String method = exchange.getRequestMethod();
        String boddy = utils.getRequestBody(exchange);
        String response = "";
        int statusCode = 200;

        try {
            switch (method) {
                case "GET":
                    response = "Método GET ainda não implementado.";
                    statusCode = 405;
                    break;
                case "POST":
                    Paciente paciente = insertPaciente(boddy);
                    response = JsonUtils.toJson(paciente);
                    statusCode = 201;
                    break;
                case "PUT":
                    response = "Método PUT ainda não implementado.";
                    statusCode = 405;
                    break;
                case "DELETE":
                    response = "Método DELETE ainda não implementado.";
                    statusCode = 405;
                    break;
                default:
                    response = "Método HTTP não suportado.";
                    statusCode = 400;
                    break;
            }
        } catch (Exception e) {
            response = "Erro interno no servidor: " + e.getMessage();
            statusCode = 500;
        }

        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        try (var os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }

    private Paciente insertPaciente(String body) {
        try {
            Paciente paciente = JsonUtils.fromJson(body, Paciente.class);
            return paciente.save();
        } catch (Exception e) {
            throw e;
        }
    }
}
