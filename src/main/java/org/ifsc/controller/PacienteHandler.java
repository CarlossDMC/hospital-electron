package org.ifsc.controller;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Paciente;
import org.ifsc.service.PacienteService;
import org.ifsc.utils.JsonUtils;
import org.ifsc.utils.Utils;

import java.sql.SQLException;
import java.util.List;

import java.io.IOException;
import java.util.Map;

public class PacienteHandler implements HttpHandler {
    private final Utils utils = new Utils();
    private final PacienteService pacienteService = new PacienteService();

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        Utils.handleCors(exchange);
        String method = exchange.getRequestMethod();
        String boddy = utils.getRequestBody(exchange);
        Long id = Utils.extractPatchID(exchange);
        Map<String, String> headers = Utils.extractQueryParams(exchange);
        String response = "";
        int statusCode = 200;

        try {
            switch (method) {
                case "GET":
                    if (id == null) {
                        response = JsonUtils.toJson(getAll(headers));
                    }else{
                        response = JsonUtils.toJson(Paciente.findById(id));
                    }
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
                    if(id != null){
                        Paciente.deleteById(id);
                        break;
                    }else{
                        statusCode = 400;
                        response = "Para excluir é necessário passar o id como parametro.";
                    }
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

    private List<Paciente> getAll(Map<String, String> headers) throws SQLException {
        return Paciente.findAll(headers);
    }
}
