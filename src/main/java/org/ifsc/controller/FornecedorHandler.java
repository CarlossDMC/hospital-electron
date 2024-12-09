package org.ifsc.controller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.ifsc.model.Fornecedor;
import org.ifsc.utils.JsonUtils;
import org.ifsc.utils.Utils;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class FornecedorHandler implements HttpHandler {

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
                        Fornecedor fornecedor = Fornecedor.findById(id);
                        if (fornecedor != null) {
                            response = JsonUtils.toJson(fornecedor);
                        } else {
                            response = "Fornecedor não encontrado.";
                            statusCode = 404;
                        }
                    }
                    break;
                case "POST":
                    Fornecedor newFornecedor = insertFornecedor(body);
                    response = JsonUtils.toJson(newFornecedor);
                    statusCode = 201;
                    break;
                case "PUT":
                    if (id != null) {
                        Fornecedor updatedFornecedor = updateFornecedor(body, id);
                        response = JsonUtils.toJson(updatedFornecedor);
                    } else {
                        statusCode = 400;
                        response = "Para atualizar, é necessário passar o ID como parâmetro.";
                    }
                    break;
                case "DELETE":
                    if (id != null) {
                        boolean deleted = Fornecedor.deleteById(id);
                        if (deleted) {
                            response = "Fornecedor excluído com sucesso.";
                        } else {
                            response = "Erro ao excluir fornecedor.";
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

    private Fornecedor insertFornecedor(String body) {
        try {
            Fornecedor fornecedor = JsonUtils.fromJson(body, Fornecedor.class);
            return fornecedor.save();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao inserir fornecedor: " + e.getMessage(), e);
        }
    }

    private Fornecedor updateFornecedor(String body, Long id) {
        try {
            Fornecedor existingFornecedor = Fornecedor.findById(id);
            if (existingFornecedor != null) {
                Fornecedor updatedFornecedor = JsonUtils.fromJson(body, Fornecedor.class);
                updatedFornecedor.setId(id);
                return updatedFornecedor.save();
            } else {
                throw new RuntimeException("Fornecedor não encontrado para atualização.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar fornecedor: " + e.getMessage(), e);
        }
    }

    private List<Fornecedor> getAll(Map<String, String> headers) throws SQLException {
        return Fornecedor.findAll(headers);
    }
}
