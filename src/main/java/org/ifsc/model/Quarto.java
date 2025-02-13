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

public class Quarto implements InterfaceDAO<Quarto> {
	private Integer id;
	private String descricao;
	private String status;
	private Integer alaId;

	public Quarto(Integer id, String descricao, String status, Integer alaId) {
		this.id = id;
		this.descricao = descricao;
		this.status = status;
		this.alaId = alaId;
	}

	public Quarto() {
	}

	// Getters e Setters
	public Integer getId() { return id; }
	public void setId(Integer id) { this.id = id; }

	public String getDescricao() { return descricao; }
	public void setDescricao(String descricao) { this.descricao = descricao; }

	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }

	public Integer getAlaId() { return alaId; }
	public void setAlaId(Integer alaId) { this.alaId = alaId; }

	@Override
	public synchronized Quarto save() {
		String query;
		List<Object> params = new ArrayList<>();

		if (this.id == null) {
			query = "INSERT INTO quarto (descricao, status, ala_id) VALUES (?, ?, ?)";
			params.add(this.descricao);
			params.add(this.status);
			params.add(this.alaId);
		} else {
			query = "UPDATE quarto SET descricao = ?, status = ?, ala_id = ? WHERE id = ?";
			params.add(this.descricao);
			params.add(this.status);
			params.add(this.alaId);
			params.add(this.id);
		}

		try {
			executeQuery(query, params);
			return findById(Integer.parseInt(this.id != null ? this.id + "" : Utils.getLastInsertedId("quarto") + ""));
		} catch (SQLException e) {
			throw new RuntimeException("Erro ao salvar o Quarto", e);
		}
	}

	public static Quarto findById(Integer id) throws SQLException {
		ResultSet rs = DB.consultQuery("SELECT * FROM quarto WHERE id = ?", List.of(id));
		if (rs.next()) {
			return new Quarto(rs.getInt("id"), rs.getString("descricao"), rs.getString("status"), rs.getInt("ala_id"));
		}
		return null;
	}

	public static List<Quarto> findAll() throws SQLException {
		ResultSet rs = DB.consultQuery("SELECT * FROM quarto", List.of());
		List<Quarto> quartos = new ArrayList<>();
		while (rs.next()) {
			quartos.add(new Quarto(rs.getInt("id"), rs.getString("descricao"), rs.getString("status"), rs.getInt("ala_id")));
		}
		return quartos;
	}

	public static boolean deleteById(Integer id) {
		try {
			executeQuery("DELETE FROM quarto WHERE id = ?", List.of(id));
			return true;
		} catch (SQLException e) {
			return false;
		}
	}

	@Override
	public List<Quarto> findByAttribute(String attr, Object value) {
		return List.of();
	}

	@Override
	public void update(Quarto objeto) { this.save(); }

	@Override
	public void delete(Quarto objeto) { deleteById(objeto.getId()); }
}
