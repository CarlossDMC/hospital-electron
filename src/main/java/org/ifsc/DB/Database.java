package org.ifsc.DB;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Database {

    private static java.sql.Connection connection;

    public static java.sql.Connection getConnection() {
        if (connection == null) {
            openConnection();
        }
        return connection;
    }

    public static void openConnection() {
        try {
            String url = "jdbc:mysql://localhost:3306/hospital?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8";
            String user = "root";
            String password = "98656915";

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


}
