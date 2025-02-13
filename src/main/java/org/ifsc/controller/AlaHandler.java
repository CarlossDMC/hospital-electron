package org.ifsc.controller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Ala;
import org.ifsc.utils.JsonUtils;
import org.ifsc.utils.Utils;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class AlaHandler implements HttpHandler {
    private final Utils utils = new Utils();

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
                        response = JsonUtils.toJson(getAll());
                    } else {
                        Ala ala = Ala.findById(id);
                        if (ala != null) {
                            response = JsonUtils.toJson(ala);
                        } else {
                            response = "Ala não encontrada.";
                            statusCode = 404;
                        }
                    }
                    break;
                case "POST":
                    Ala newAla = insertAla(body);
                    response = JsonUtils.toJson(newAla);
                    statusCode = 201;
                    break;
                case "PUT":
                    if (id != null) {
                        Ala updatedAla = updateAla(body, id);
                        response = JsonUtils.toJson(updatedAla);
                    } else {
                        statusCode = 400;
                        response = "Para atualizar, é necessário passar o ID.";
                    }
                    break;
                case "DELETE":
                    if (id != null) {
                        boolean deleted = Ala.deleteById(id);
                        if (deleted) {
                            response = "Ala excluída com sucesso.";
                        } else {
                            response = "Erro ao excluir Ala.";
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

    private Ala insertAla(String body) {
        try {
            Ala ala = JsonUtils.fromJson(body, Ala.class);
            return ala.save();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao inserir Ala: " + e.getMessage(), e);
        }
    }

    private Ala updateAla(String body, Integer id) {
        try {
            Ala existingAla = Ala.findById(id);
            if (existingAla != null) {
                Ala updatedAla = JsonUtils.fromJson(body, Ala.class);
                updatedAla.setId(id);
                return updatedAla.save();
            } else {
                throw new RuntimeException("Ala não encontrada para atualização.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar Ala: " + e.getMessage(), e);
        }
    }

    private List<Ala> getAll() throws SQLException {
        return Ala.findAll();
    }
}
