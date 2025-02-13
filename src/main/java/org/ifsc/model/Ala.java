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

public class Ala implements InterfaceDAO<Ala> {
	private Integer id;
	private String descricao;
	private String status;

	public Ala(Integer id, String descricao, String status) {
		this.id = id;
		this.descricao = descricao;
		this.status = status;
	}

	public Ala() {
	}

	// Getters e Setters
	public Integer getId() { return id; }
	public void setId(Integer id) { this.id = id; }

	public String getDescricao() { return descricao; }
	public void setDescricao(String descricao) { this.descricao = descricao; }

	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }

	@Override
	public synchronized Ala save() {
		String query;
		List<Object> params = new ArrayList<>();

		if (this.id == null) {
			query = "INSERT INTO ala (descricao, status) VALUES (?, ?)";
			params.add(this.descricao);
			params.add(this.status);
		} else {
			query = "UPDATE ala SET descricao = ?, status = ? WHERE id = ?";
			params.add(this.descricao);
			params.add(this.status);
			params.add(this.id);
		}

		try {
			executeQuery(query, params);
			return findById(Integer.parseInt(this.id != null ? this.id + "" : Utils.getLastInsertedId("ala") + ""));
		} catch (SQLException e) {
			throw new RuntimeException("Erro ao salvar a Ala", e);
		}
	}

	public static Ala findById(Integer id) throws SQLException {
		ResultSet rs = DB.consultQuery("SELECT * FROM ala WHERE id = ?", List.of(id));
		if (rs.next()) {
			return new Ala(rs.getInt("id"), rs.getString("descricao"), rs.getString("status"));
		}
		return null;
	}

	public static List<Ala> findAll() throws SQLException {
		ResultSet rs = DB.consultQuery("SELECT * FROM ala", List.of());
		List<Ala> alas = new ArrayList<>();
		while (rs.next()) {
			alas.add(new Ala(rs.getInt("id"), rs.getString("descricao"), rs.getString("status")));
		}
		return alas;
	}

	public static boolean deleteById(Integer id) {
		try {
			executeQuery("DELETE FROM ala WHERE id = ?", List.of(id));
			return true;
		} catch (SQLException e) {
			return false;
		}
	}

	@Override
	public List<Ala> findByAttribute(String attr, Object value) {
		return List.of();
	}

	@Override
	public void update(Ala objeto) { this.save(); }

	@Override
	public void delete(Ala objeto) { deleteById(objeto.getId()); }
}
