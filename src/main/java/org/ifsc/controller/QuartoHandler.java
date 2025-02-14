package org.ifsc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Quarto;
import org.ifsc.service.QuartoService;
import org.ifsc.utils.JsonUtils;
import org.ifsc.utils.Utils;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class QuartoHandler implements HttpHandler {
    private final Utils utils = new Utils();
    private final QuartoService quartoService = new QuartoService();


    @Override
    public void handle(HttpExchange exchange) throws IOException {
        Utils.handleCors(exchange);
        String method = exchange.getRequestMethod();
        String body = utils.getRequestBody(exchange);
        Integer id = Utils.extractPatchID(exchange) != null ? Utils.extractPatchID(exchange).intValue() : null;
        Map<String, String> headers = Utils.extractQueryParams(exchange);
        String response = "";
        int statusCode = 200;

        try {
            switch (method) {
                case "GET":
                    if (id == null) {
                        response = String.valueOf(getAll());
                    } else {
                        Quarto quarto = Quarto.findById(id);
                        if (quarto != null) {
                            response = JsonUtils.toJson(quarto);
                        } else {
                            response = "Quarto não encontrado.";
                            statusCode = 404;
                        }
                    }
                    break;
                case "POST":
                    Quarto newQuarto = insertQuarto(body);
                    response = JsonUtils.toJson(newQuarto);
                    statusCode = 201;
                    break;
                case "PUT":
                    if (id != null) {
                        Quarto updatedQuarto = updateQuarto(body, id);
                        response = JsonUtils.toJson(updatedQuarto);
                    } else {
                        statusCode = 400;
                        response = "Para atualizar, é necessário passar o ID.";
                    }
                    break;
                case "DELETE":
                    if (id != null) {
                        boolean deleted = Quarto.deleteById(id);
                        if (deleted) {
                            response = "Quarto excluído com sucesso.";
                        } else {
                            response = "Erro ao excluir Quarto.";
                            statusCode = 400;
                        }
                    } else {
                        statusCode = 400;
                        response = "Para excluir, é necessário passar o ID.";
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

    private Quarto insertQuarto(String body) {
        try {
            Quarto quarto = JsonUtils.fromJson(body, Quarto.class);
            return quarto.save();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao inserir Quarto: " + e.getMessage(), e);
        }
    }

    private Quarto updateQuarto(String body, Integer id) {
        try {
            Quarto existingQuarto = Quarto.findById(id);
            if (existingQuarto != null) {
                Quarto updatedQuarto = JsonUtils.fromJson(body, Quarto.class);
                updatedQuarto.setId(id);
                return updatedQuarto.save();
            } else {
                throw new RuntimeException("Quarto não encontrado para atualização.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar Quarto: " + e.getMessage(), e);
        }
    }

    private List<String> getAll() throws SQLException {
        java.util.List<Quarto> quarto = Quarto.findAll();

        List<String> mappedResponse = quarto.stream().map(e -> {
            try {
                return this.quartoService.mappedQuarto(e);
            } catch (SQLException | JsonProcessingException ex) {
                throw new RuntimeException(ex);
            }
        }).toList();

        return mappedResponse;
    }


}
