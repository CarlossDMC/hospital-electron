package org.ifsc.controller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Acompanhante;
import org.ifsc.utils.JsonUtils;
import org.ifsc.utils.Utils;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class AcompanhanteHandler implements HttpHandler {
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
                        Acompanhante acompanhante = Acompanhante.findById(id);
                        if (acompanhante != null) {
                            response = JsonUtils.toJson(acompanhante);
                        } else {
                            response = "Acompanhante não encontrado.";
                            statusCode = 404;
                        }
                    }
                    break;
                case "POST":
                    Acompanhante newAcompanhante = insertAcompanhante(body);
                    response = JsonUtils.toJson(newAcompanhante);
                    statusCode = 201;
                    break;
                case "PUT":
                    response = "Método HTTP não suportado.";
                    statusCode = 400;
                    break;
                case "DELETE":
                    if (id != null) {
                        boolean deleted = Acompanhante.deleteById(id);
                        if (deleted) {
                            response = "Acompanhante excluído com sucesso.";
                        } else {
                            response = "Erro ao excluir acompanhante.";
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

    private Acompanhante insertAcompanhante(String body) {
        try {
            Acompanhante acompanhante = JsonUtils.fromJson(body, Acompanhante.class);
            return acompanhante.save();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao inserir acompanhante: " + e.getMessage(), e);
        }
    }

    private List<Acompanhante> getAll(Map<String, String> headers) throws SQLException {
        return Acompanhante.findAll(headers);
    }
}
