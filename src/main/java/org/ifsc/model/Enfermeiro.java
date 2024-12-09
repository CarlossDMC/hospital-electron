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

public class Enfermeiro extends Pessoa implements InterfaceDAO<Enfermeiro> {

	private String cre;
	private String senha;
	private String login;
	private String nomeSocial;

	public Enfermeiro(Long id, String nome, String fone1, String fone2, String email, String cpfCnpj, String rgInscricaoEstadual, LocalDateTime dataCadastro, String cep, String cidade, String bairro, String logradouro, String complemento, String cre, String senha, String login, String nomeSocial) {
		super(id, nome, fone1, fone2, email, cpfCnpj, rgInscricaoEstadual, dataCadastro, cep, cidade, bairro, logradouro, complemento);
		this.cre = cre;
		this.senha = senha;
		this.login = login;
		this.nomeSocial = nomeSocial;
	}

	public Enfermeiro() {
		super();
	}

	public String getCre() {
		return cre;
	}

	public void setCre(String cre) {
		this.cre = cre;
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
	public synchronized Enfermeiro save() {
		String query;
		List<Object> params = new ArrayList<>();

		if (this.getId() == null) {
			query = "INSERT INTO enfermeiro (nome, fone1, fone2, email, cpf_Cnpj, rg_Inscricao_Estadual, data_Cadastro, " +
					"cep, cidade, bairro, logradouro, complemento, cre, senha, login, nome_social) " +
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
			params.add(this.cre);
			params.add(this.senha);
			params.add(this.login);
			params.add(this.nomeSocial);
		} else {
			query = "UPDATE enfermeiro SET nome = ?, fone1 = ?, fone2 = ?, email = ?, cpf_Cnpj = ?, rg_Inscricao_Estadual = ?, " +
					"cep = ?, cidade = ?, bairro = ?, logradouro = ?, complemento = ?, cre = ?, senha = ?, login = ?, nome_social = ? " +
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
			params.add(this.cre);
			params.add(this.senha);
			params.add(this.login);
			params.add(this.nomeSocial);
			params.add(this.getId());
		}

		try {
			executeQuery(query, params);
			return findById(this.getId() != null ? this.getId() : Utils.getLastInsertedId("enfermeiro"));
		} catch (SQLException e) {
			System.err.println("Erro ao salvar o enfermeiro: " + e.getMessage());
			e.printStackTrace();
			throw new RuntimeException("Erro ao salvar o enfermeiro", e);
		}
	}

	public static Enfermeiro findById(Long id) throws SQLException {
		String query = "SELECT * FROM enfermeiro WHERE id = ?";
		List<Object> params = List.of(id);

		try (ResultSet rs = DB.consultQuery(query, params)) {
			if (rs.next()) {
				return new Enfermeiro(
						rs.getLong("id"),
						rs.getString("nome"),
						rs.getString("fone1"),
						rs.getString("fone2"),
						rs.getString("email"),
						rs.getString("cpf_Cnpj"),
						rs.getString("rg_Inscricao_Estadual"),
						rs.getTimestamp("data_Cadastro").toLocalDateTime(),
						rs.getString("cep"),
						rs.getString("cidade"),
						rs.getString("bairro"),
						rs.getString("logradouro"),
						rs.getString("complemento"),
						rs.getString("cre"),
						rs.getString("senha"),
						rs.getString("login"),
						rs.getString("nome_social")
				);
			}
		}
		return null;
	}

	public static List<Enfermeiro> findAll(Map<String, String> filter) throws SQLException {
		StringBuilder query = new StringBuilder("SELECT * FROM enfermeiro WHERE 1=1");
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
		List<Enfermeiro> resultList = new ArrayList<>();

		while (rs.next()) {
			Enfermeiro enfermeiro = new Enfermeiro(
					rs.getLong("id"),
					rs.getString("nome"),
					rs.getString("fone1"),
					rs.getString("fone2"),
					rs.getString("email"),
					rs.getString("cpf_Cnpj"),
					rs.getString("rg_Inscricao_Estadual"),
					rs.getTimestamp("data_Cadastro").toLocalDateTime(),
					rs.getString("cep"),
					rs.getString("cidade"),
					rs.getString("bairro"),
					rs.getString("logradouro"),
					rs.getString("complemento"),
					rs.getString("cre"),
					rs.getString("senha"),
					rs.getString("login"),
					rs.getString("nome_social")
			);
			resultList.add(enfermeiro);
		}
		return resultList;
	}

	public static boolean deleteById(Long id) {
		try {
			List<Object> params = List.of(id);
			DB.executeQuery("DELETE FROM enfermeiro WHERE id = ?", params);
			return true;
		} catch (SQLException e) {
			System.err.println("Erro ao excluir o enfermeiro: " + e.getMessage());
			return false;
		}
	}

	@Override
	public List<Enfermeiro> findByAttribute(String attr, Object value) {
		return List.of();
	}

	@Override
	public void update(Enfermeiro objeto) {
		this.save();
	}

	@Override
	public void delete(Enfermeiro objeto) {
		deleteById(objeto.getId());
	}
}
