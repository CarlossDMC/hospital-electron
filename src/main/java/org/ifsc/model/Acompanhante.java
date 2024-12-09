package org.ifsc.model;

import org.ifsc.DB.DB;
import org.ifsc.DB.InterfaceDAO;
import org.ifsc.utils.Utils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.ifsc.DB.DB.executeQuery;

public class Acompanhante implements InterfaceDAO<Acompanhante> {
    private Long id;
    private String nome;
    private String grauParentesco;
    private String cpf;
    private String fone;
    private String email;
    private String status;

    public Acompanhante() {
    }

    public Acompanhante(Long id, String nome, String grauParentesco, String cpf, String fone, String email, String status) {
        this.id = id;
        this.nome = nome;
        this.grauParentesco = grauParentesco;
        this.cpf = cpf;
        this.fone = fone;
        this.email = email;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getGrauParentesco() {
        return grauParentesco;
    }

    public void setGrauParentesco(String grauParentesco) {
        this.grauParentesco = grauParentesco;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getFone() {
        return fone;
    }

    public void setFone(String fone) {
        this.fone = fone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public synchronized Acompanhante save() {
        String query;
        List<Object> params = new ArrayList<>();

        if (this.id == null) {
            query = "INSERT INTO acompanhante (nome, grau_parentesco, cpf, fone, email, status) VALUES (?, ?, ?, ?, ?, ?)";
            params.add(this.nome);
            params.add(this.grauParentesco);
            params.add(this.cpf);
            params.add(this.fone);
            params.add(this.email);
            params.add(this.status);
        } else {
            query = "UPDATE acompanhante SET nome = ?, grau_parentesco = ?, cpf = ?, fone = ?, email = ?, status = ? WHERE id = ?";
            params.add(this.nome);
            params.add(this.grauParentesco);
            params.add(this.cpf);
            params.add(this.fone);
            params.add(this.email);
            params.add(this.status);
            params.add(this.id);
        }

        try {
            executeQuery(query, params);
            return findById(this.id != null ? this.id : Utils.getLastInsertedId("acompanhante"));
        } catch (SQLException e) {
            System.err.println("Erro ao salvar o acompanhante: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erro ao salvar o acompanhante", e);
        }
    }

    public static Acompanhante findById(Long id) throws SQLException {
        String query = "SELECT * FROM acompanhante WHERE id = ?";
        List<Object> params = List.of(id);

        try (ResultSet rs = DB.consultQuery(query, params)) {
            if (rs.next()) {
                return new Acompanhante(
                        rs.getLong("id"),
                        rs.getString("nome"),
                        rs.getString("grau_parentesco"),
                        rs.getString("cpf"),
                        rs.getString("fone"),
                        rs.getString("email"),
                        rs.getString("status")
                );
            }
        }
        return null;
    }

    public static List<Acompanhante> findAll(Map<String, String> filter) throws SQLException {
        StringBuilder query = new StringBuilder("SELECT * FROM acompanhante WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (filter != null) {
            for (Map.Entry<String, String> entry : filter.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();

                if (value != null && !value.trim().isEmpty()) {
                    query.append(" AND ").append(key).append(" LIKE ?");
                    params.add("%" + value + "%");
                }
            }
        }

        ResultSet rs = DB.consultQuery(query.toString(), params);
        List<Acompanhante> resultList = new ArrayList<>();

        while (rs.next()) {
            Acompanhante acompanhante = new Acompanhante(
                    rs.getLong("id"),
                    rs.getString("nome"),
                    rs.getString("grau_parentesco"),
                    rs.getString("cpf"),
                    rs.getString("fone"),
                    rs.getString("email"),
                    rs.getString("status")
            );
            resultList.add(acompanhante);
        }
        return resultList;
    }

    public static boolean deleteById(Long id) {
        try {
            List<Object> params = List.of(id);
            DB.executeQuery("DELETE FROM acompanhante WHERE id = ?", params);
            return true;
        } catch (SQLException e) {
            System.err.println("Erro ao excluir o acompanhante: " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<Acompanhante> findByAttribute(String attr, Object value) {
        return List.of();
    }

    @Override
    public void update(Acompanhante objeto) {
    }

    @Override
    public void delete(Acompanhante objeto) {
    }
}
