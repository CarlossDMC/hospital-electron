package org.ifsc.model;

import org.ifsc.DB.DB;
import org.ifsc.DB.InterfaceDAO;
import org.ifsc.utils.Utils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.ifsc.DB.DB.executeQuery;

public class Fornecedor extends Pessoa implements InterfaceDAO<Fornecedor> {

	private String nomeFantasia;
	private String contato;

	public Fornecedor(Long id, String nome, String fone1, String fone2, String email, String cpfCnpj, String rgInscricaoEstadual, LocalDateTime dataCadastro, String cep, String cidade, String bairro, String logradouro, String complemento, String nomeFantasia, String contato) {
		super(id, nome, fone1, fone2, email, cpfCnpj, rgInscricaoEstadual, dataCadastro, cep, cidade, bairro, logradouro, complemento);
		this.nomeFantasia = nomeFantasia;
		this.contato = contato;
	}

	public Fornecedor() {
		super();
	}

	public String getNomeFantasia() {
		return nomeFantasia;
	}

	public void setNomeFantasia(String nomeFantasia) {
		this.nomeFantasia = nomeFantasia;
	}

	public String getContato() {
		return contato;
	}

	public void setContato(String contato) {
		this.contato = contato;
	}

	@Override
	public synchronized Fornecedor save() {
		String query;
		List<Object> params = new ArrayList<>();

		if (this.getId() == null) {
			query = "INSERT INTO fornecedor (nome, fone1, fone2, email, cpf_cnpj, rg_inscricao_estadual, data_cadastro, " +
					"cep, cidade, bairro, logradouro, complemento, nome_fantasia, contato) " +
					"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			params.add(this.getNome());
			params.add(this.getFone1());
			params.add(this.getFone2());
			params.add(this.getEmail());
			params.add(this.getCpfCnpj());
			params.add(this.getRgInscricaoEstadual());
			params.add(Timestamp.valueOf(LocalDateTime.now()));
			params.add(this.getCep());
			params.add(this.getCidade());
			params.add(this.getBairro());
			params.add(this.getLogradouro());
			params.add(this.getComplemento());
			params.add(this.nomeFantasia);
			params.add(this.contato);
		} else {
			query = "UPDATE fornecedor SET nome = ?, fone1 = ?, fone2 = ?, email = ?, cpf_cnpj = ?, rg_inscricao_estadual = ?, " +
					"cep = ?, cidade = ?, bairro = ?, logradouro = ?, complemento = ?, nome_fantasia = ?, contato = ? " +
					"WHERE id = ?";
			params.add(this.getNome());
			params.add(this.getFone1());
			params.add(this.getFone2());
			params.add(this.getEmail());
			params.add(this.getCpfCnpj());
			params.add(this.getRgInscricaoEstadual());
			params.add(this.getCep());
			params.add(this.getCidade());
			params.add(this.getBairro());
			params.add(this.getLogradouro());
			params.add(this.getComplemento());
			params.add(this.nomeFantasia);
			params.add(this.contato);
			params.add(this.getId());
		}

		try {
			executeQuery(query, params);
			return findById(this.getId() != null ? this.getId() : Utils.getLastInsertedId("fornecedor"));
		} catch (SQLException e) {
			System.err.println("Erro ao salvar o fornecedor: " + e.getMessage());
			e.printStackTrace();
			throw new RuntimeException("Erro ao salvar o fornecedor", e);
		}
	}

	public static Fornecedor findById(Long id) throws SQLException {
		String query = "SELECT * FROM fornecedor WHERE id = ?";
		List<Object> params = List.of(id);

		try (ResultSet rs = DB.consultQuery(query, params)) {
			if (rs.next()) {
				return new Fornecedor(
						rs.getLong("id"),
						rs.getString("nome"),
						rs.getString("fone1"),
						rs.getString("fone2"),
						rs.getString("email"),
						rs.getString("cpf_cnpj"),
						rs.getString("rg_inscricao_estadual"),
						rs.getTimestamp("data_cadastro").toLocalDateTime(),
						rs.getString("cep"),
						rs.getString("cidade"),
						rs.getString("bairro"),
						rs.getString("logradouro"),
						rs.getString("complemento"),
						rs.getString("nome_fantasia"),
						rs.getString("contato")
				);
			}
		}
		return null;
	}

	public static List<Fornecedor> findAll(Map<String, String> filter) throws SQLException {
		StringBuilder query = new StringBuilder("SELECT * FROM fornecedor WHERE 1=1");
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
		List<Fornecedor> resultList = new ArrayList<>();

		while (rs.next()) {
			Fornecedor fornecedor = new Fornecedor(
					rs.getLong("id"),
					rs.getString("nome"),
					rs.getString("fone1"),
					rs.getString("fone2"),
					rs.getString("email"),
					rs.getString("cpf_cnpj"),
					rs.getString("rg_inscricao_estadual"),
					rs.getTimestamp("data_cadastro").toLocalDateTime(),
					rs.getString("cep"),
					rs.getString("cidade"),
					rs.getString("bairro"),
					rs.getString("logradouro"),
					rs.getString("complemento"),
					rs.getString("nome_fantasia"),
					rs.getString("contato")
			);
			resultList.add(fornecedor);
		}
		return resultList;
	}

	public static boolean deleteById(Long id) {
		try {
			List<Object> params = List.of(id);
			DB.executeQuery("DELETE FROM fornecedor WHERE id = ?", params);
			return true;
		} catch (SQLException e) {
			System.err.println("Erro ao excluir o fornecedor: " + e.getMessage());
			return false;
		}
	}

	@Override
	public List<Fornecedor> findByAttribute(String attr, Object value) {
		return List.of();
	}

	@Override
	public void update(Fornecedor objeto) {
		this.save();
	}

	@Override
	public void delete(Fornecedor objeto) {
		deleteById(objeto.getId());
	}
}
