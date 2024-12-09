package org.ifsc.controller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Medico;
import org.ifsc.utils.JsonUtils;
import org.ifsc.utils.Utils;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class MedicoHandler implements HttpHandler {
    private final Utils utils = new Utils();

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        Utils.handleCors(exchange);
        String method = exchange.getRequestMethod();
        String body = utils.getRequestBody(exchange);
        Long id = Utils.extractPatchID(exchange);
        Map<String, String> headers = Utils.extractQueryParams(exchange);
        String response = "";
        int statusCode = 200;

        try {
            switch (method) {
                case "GET":
                    if (id == null) {
                        response = JsonUtils.toJson(getAll(headers));
                    } else {
                        Medico medico = Medico.findById(id);
                        if (medico != null) {
                            response = JsonUtils.toJson(medico);
                        } else {
                            response = "Médico não encontrado.";
                            statusCode = 404;
                        }
                    }
                    break;
                case "POST":
                    Medico medico = insertMedico(body);
                    response = JsonUtils.toJson(medico);
                    statusCode = 201;
                    break;
                case "PUT":
                    response = "Método PUT ainda não implementado.";
                    statusCode = 405;
                    break;
                case "DELETE":
                    if (id != null) {
                        boolean deleted = Medico.deleteById(id);
                        if (deleted) {
                            response = "Médico excluído com sucesso.";
                        } else {
                            response = "Erro ao excluir médico.";
                            statusCode = 400;
                        }
                    } else {
                        statusCode = 400;
                        response = "Para excluir é necessário passar o id como parâmetro.";
                    }
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

    private Medico insertMedico(String body) {
        try {
            Medico medico = JsonUtils.fromJson(body, Medico.class);
            return medico.save();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao inserir médico: " + e.getMessage(), e);
        }
    }

    private List<Medico> getAll(Map<String, String> headers) throws SQLException {
        return Medico.findAll(headers);
    }
}
