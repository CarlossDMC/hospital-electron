package org.ifsc.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.ifsc.DB.DB;
import org.ifsc.model.Ala;
import org.ifsc.model.Quarto;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class QuartoService {
    public String mappedQuarto(Quarto quarto) throws JsonProcessingException, SQLException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> response = new HashMap<>();
        Ala ala = this.getAlaByIdQuarto(quarto.getId());

        response.put("id", quarto.getId());
        response.put("descricao", quarto.getDescricao());
        response.put("status", quarto.getStatus());
        response.put("alaId", quarto.getAlaId());
        response.put("alaDescricao", ala.getDescricao());
        response.put("alaStatus", ala.getStatus());
        String json = objectMapper.writeValueAsString(response);

        return json;
    }

    public Ala getAlaByIdQuarto(Integer id) throws SQLException {
        Ala ala = new Ala();
        ResultSet rs =  DB.consultQuery("""
                SELECT a.* FROM ala a
                      left join quarto q on a.id = q.ala_id
                      where q.id = ?;
                """,  java.util.List.of(id));

        while (rs.next()){
            ala.setId(rs.getInt("id"));
            ala.setDescricao(rs.getString("descricao"));
            ala.setStatus(rs.getString("status"));
        }

        return ala;
    }

}
