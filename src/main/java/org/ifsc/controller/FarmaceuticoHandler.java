package org.ifsc.controller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Farmaceutico;
import org.ifsc.utils.JsonUtils;
import org.ifsc.utils.Utils;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class FarmaceuticoHandler implements HttpHandler {

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
                        Farmaceutico farmaceutico = Farmaceutico.findById(id);
                        if (farmaceutico != null) {
                            response = JsonUtils.toJson(farmaceutico);
                        } else {
                            response = "Farmacêutico não encontrado.";
                            statusCode = 404;
                        }
                    }
                    break;
                case "POST":
                    Farmaceutico newFarmaceutico = insertFarmaceutico(body);
                    response = JsonUtils.toJson(newFarmaceutico);
                    statusCode = 201;
                    break;
                case "PUT":
                    if (id != null) {
                        Farmaceutico updatedFarmaceutico = updateFarmaceutico(body, id);
                        response = JsonUtils.toJson(updatedFarmaceutico);
                    } else {
                        statusCode = 400;
                        response = "Para atualizar, é necessário passar o ID como parâmetro.";
                    }
                    break;
                case "DELETE":
                    if (id != null) {
                        boolean deleted = Farmaceutico.deleteById(id);
                        if (deleted) {
                            response = "Farmacêutico excluído com sucesso.";
                        } else {
                            response = "Erro ao excluir farmacêutico.";
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

    private Farmaceutico insertFarmaceutico(String body) {
        try {
            Farmaceutico farmaceutico = JsonUtils.fromJson(body, Farmaceutico.class);
            return farmaceutico.save();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao inserir farmacêutico: " + e.getMessage(), e);
        }
    }

    private Farmaceutico updateFarmaceutico(String body, Long id) {
        try {
            Farmaceutico existingFarmaceutico = Farmaceutico.findById(id);
            if (existingFarmaceutico != null) {
                Farmaceutico updatedFarmaceutico = JsonUtils.fromJson(body, Farmaceutico.class);
                updatedFarmaceutico.setId(id);
                return updatedFarmaceutico.save();
            } else {
                throw new RuntimeException("Farmacêutico não encontrado para atualização.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar farmacêutico: " + e.getMessage(), e);
        }
    }

    private List<Farmaceutico> getAll(Map<String, String> headers) throws SQLException {
        return Farmaceutico.findAll(headers);
    }
}
