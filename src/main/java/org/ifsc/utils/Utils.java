package org.ifsc.utils;

import com.sun.net.httpserver.HttpExchange;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
}
