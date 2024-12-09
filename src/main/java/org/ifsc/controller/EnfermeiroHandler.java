package org.ifsc.controller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Enfermeiro;
import org.ifsc.utils.JsonUtils;
import org.ifsc.utils.Utils;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class EnfermeiroHandler implements HttpHandler {
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
                        Enfermeiro enfermeiro = Enfermeiro.findById(id);
                        if (enfermeiro != null) {
                            response = JsonUtils.toJson(enfermeiro);
                        } else {
                            response = "Enfermeiro não encontrado.";
                            statusCode = 404;
                        }
                    }
                    break;
                case "POST":
                    Enfermeiro newEnfermeiro = insertEnfermeiro(body);
                    response = JsonUtils.toJson(newEnfermeiro);
                    statusCode = 201;
                    break;
                case "PUT":
                    break;
                case "DELETE":
                    if (id != null) {
                        boolean deleted = Enfermeiro.deleteById(id);
                        if (deleted) {
                            response = "Enfermeiro excluído com sucesso.";
                        } else {
                            response = "Erro ao excluir enfermeiro.";
                            statusCode = 400;
                        }
                    } else {
                        statusCode = 400;
                        response = "Para excluir é necessário passar o ID como parâmetro.";
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

    private Enfermeiro insertEnfermeiro(String body) {
        try {
            Enfermeiro enfermeiro = JsonUtils.fromJson(body, Enfermeiro.class);
            return enfermeiro.save();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao inserir enfermeiro: " + e.getMessage(), e);
        }
    }

    private List<Enfermeiro> getAll(Map<String, String> headers) throws SQLException {
        return Enfermeiro.findAll(headers);
    }
}
