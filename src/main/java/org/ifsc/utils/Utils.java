package org.ifsc.utils;

import com.sun.net.httpserver.HttpExchange;
import org.ifsc.DB.DB;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Utils {
    public String getRequestBody(HttpExchange exchange) throws IOException {
        InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
        BufferedReader bufferedReader = new BufferedReader(reader);
        StringBuilder body = new StringBuilder();
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            body.append(line);
        }
        return body.toString();
    }


    public static Long getLastInsertedId(String tableName) throws SQLException {
        String query = "SELECT LAST_INSERT_ID() AS lastId";
        try (Connection connection = DB.getConnection();
             ResultSet rs = connection.createStatement().executeQuery(query)) {

            if (rs.next()) {
                return rs.getLong("lastId");
            }
        } catch (SQLException e) {
            System.err.println("Erro ao obter o último ID da tabela " + tableName + ": " + e.getMessage());
            throw e;
        }
        return null;
    }

    public static boolean handleCors(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*"); // Permitir todas as origens
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return true;
        }
        return false;
    }
}
