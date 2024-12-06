package org.ifsc.DB;

import java.sql.*;

public class DB {

    private static java.sql.Connection connection;

    public static java.sql.Connection getConnection() {
        if (connection == null) {
            openConnection();
        }
        return connection;
    }

    public static void openConnection() {
        try {
            String url = "jdbc:mysql://100.124.136.16:3311/hospital?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8";
            String user = "root";
            String password = "bru!@#";

            connection = DriverManager.getConnection(url, user, password);
            System.out.println("Conexão estabelecida com sucesso!");
        } catch (SQLException e) {
            System.out.println("Error to connect on database: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void closeConnection() {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("Connection closed successfully.");
            } catch (SQLException e) {
                System.out.println("Failed to close the connection: " + e.getMessage());
            }
        }
    }

    /**
     * Retorna um resultset com o resultado da consulta
     * @param query Query do mysql.
     */
    public static ResultSet consultQuery(String query) throws SQLException {
        if (connection == null) {
            openConnection();
        }
        Statement stmt = connection.createStatement();
        System.out.println("Query: " + query);
        return stmt.executeQuery(query);
    }
    public static ResultSet consultQuery(String query, java.util.List<Object> params) throws SQLException {
        if (connection.isClosed()) {
            openConnection();
        }
        PreparedStatement stmt = connection.prepareStatement(query);
        for (int i = 0; i < params.size(); i++) {
            stmt.setObject(i + 1, params.get(i));
        }
        System.out.println("Query: " + stmt);
        return stmt.executeQuery();
    }


    /**
     * Retorna um int com o numero de linhas alteradas
     * @param query Query do mysql.
     */
    public static int executeQuery(String query) throws SQLException {
        if (connection == null) {
            openConnection();
        }
        Statement stmt = connection.createStatement();
        System.out.println("Query: " + query);
        return stmt.executeUpdate(query);
    }

    /**
     * Retorna um int com o numero de linhas alteradas
     * @param query Query do mysql.
     */
    public static int executeQuery(String query, java.util.List<Object> params) throws SQLException {
        if (connection == null) {
            openConnection();
        }
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            for (int i = 0; i < params.size(); i++) {
                stmt.setObject(i + 1, params.get(i));
            }
            System.out.println("Query: " + query);
            System.out.println("Parameters: " + params);
            return stmt.executeUpdate();
        }
    }


}
