package org.ifsc.controller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;

public class PacienteHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        switch (method) {
            case "GET":
                return;
            case "POST":
                return;
            case "PUT":
                return;
            case "DELETE":
                return;
        }
    }


}
