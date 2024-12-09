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

public class Medico extends Pessoa implements InterfaceDAO<Medico> {

	private String crm;
	private String senha;
	private String login;
	private String nomeSocial;

	public Medico(Long id, String nome, String fone1, String fone2, String email, String cpfCnpj, String rgInscricaoEstadual, LocalDateTime dataCadastro, String cep, String cidade, String bairro, String logradouro, String complemento, String crm, String senha, String login, String nomeSocial) {
		super(id, nome, fone1, fone2, email, cpfCnpj, rgInscricaoEstadual, dataCadastro, cep, cidade, bairro, logradouro, complemento);
		this.crm = crm;
		this.senha = senha;
		this.login = login;
		this.nomeSocial = nomeSocial;
	}

	public Medico() {
		super();
	}

	public String getCrm() {
		return crm;
	}

	public void setCrm(String crm) {
		this.crm = crm;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getNomeSocial() {
		return nomeSocial;
	}

	public void setNomeSocial(String nomeSocial) {
		this.nomeSocial = nomeSocial;
	}

	@Override
	public synchronized Medico save() {
		String query;
		List<Object> params = new ArrayList<>();

		if (this.getId() == null) {
			query = "INSERT INTO medico " +
					"(nome, fone1, fone2, email, cpf_Cnpj, rg_Inscricao_Estadual, data_Cadastro, " +
					"cep, cidade, bairro, logradouro, complemento, crm, senha, login, nome_social) " +
					"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
			params.add(this.getCrm());
			params.add(this.getSenha());
			params.add(this.getLogin());
			params.add(this.getNomeSocial());
		} else {
			query = "UPDATE medico SET nome = ?, fone1 = ?, fone2 = ?, email = ?, " +
					"cpf_Cnpj = ?, rg_Inscricao_Estadual = ?, cep = ?, cidade = ?, " +
					"bairro = ?, logradouro = ?, complemento = ?, crm = ?, senha = ?, login = ?, nome_social = ? " +
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
			params.add(this.getCrm());
			params.add(this.getSenha());
			params.add(this.getLogin());
			params.add(this.getNomeSocial());
			params.add(this.getId());
		}

		try {
			executeQuery(query, params);
			return findById(this.getId() != null ? this.getId() : Utils.getLastInsertedId("medico"));
		} catch (SQLException e) {
			System.err.println("Erro ao salvar o médico: " + e.getMessage());
			throw new RuntimeException("Erro ao salvar o médico", e);
		}
	}

	public static List<Medico> findAll(Map<String, String> filter) throws SQLException {
		StringBuilder sql = new StringBuilder("SELECT * FROM medico WHERE 1=1");
		List<Object> values = new ArrayList<>();

		if (filter != null) {
			for (Map.Entry<String, String> entry : filter.entrySet()) {
				String key = entry.getKey();
				String value = entry.getValue();

				if (value != null && !value.trim().isEmpty()) {
					sql.append(" AND ").append(key).append(" LIKE ?");
					values.add("%" + value + "%");
				}
			}
		}

		ResultSet rs = DB.consultQuery(sql.toString(), values);
		List<Medico> resultList = new ArrayList<>();

		while (rs.next()) {
			Medico medico = new Medico(
					rs.getLong("id"),
					rs.getString("nome"),
					rs.getString("fone1"),
					rs.getString("fone2"),
					rs.getString("email"),
					rs.getString("cpf_Cnpj"),
					rs.getString("rg_Inscricao_Estadual"),
					null,
					rs.getString("cep"),
					rs.getString("cidade"),
					rs.getString("bairro"),
					rs.getString("logradouro"),
					rs.getString("complemento"),
					rs.getString("crm"),
					rs.getString("senha"),
					rs.getString("login"),
					rs.getString("nome_Social")
			);

			resultList.add(medico);
		}
		return resultList;
	}

	public static boolean deleteById(Long id) {
		try {
			List<Object> params = List.of(id);
			DB.executeQuery("DELETE FROM medico WHERE id = ?;", params);
			return true;
		} catch (SQLException e) {
			System.err.println("Erro ao excluir o médico: " + e.getMessage());
			return false;
		}
	}

	public static Medico findById(Long id) throws SQLException {
		String sql = "SELECT * FROM medico WHERE id = ?";
		List<Object> params = List.of(id);

		try (ResultSet rs = DB.consultQuery(sql, params)) {
			if (rs.next()) {
				return new Medico(
						rs.getLong("id"),
						rs.getString("nome"),
						rs.getString("fone1"),
						rs.getString("fone2"),
						rs.getString("email"),
						rs.getString("cpf_Cnpj"),
						rs.getString("rg_Inscricao_Estadual"),
						null,
						rs.getString("cep"),
						rs.getString("cidade"),
						rs.getString("bairro"),
						rs.getString("logradouro"),
						rs.getString("complemento"),
						rs.getString("crm"),
						rs.getString("senha"),
						rs.getString("login"),
						rs.getString("nome_social")
				);
			}
		} catch (SQLException e) {
			System.err.println("Erro ao buscar médico pelo ID: " + e.getMessage());
			throw e;
		}
		return null;
	}

	@Override
	public List<Medico> findByAttribute(String attr, Object value) {
		return List.of();
	}

	@Override
	public void update(Medico objeto) {
	}

	@Override
	public void delete(Medico objeto) {
	}
}
