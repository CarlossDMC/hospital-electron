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

public class Usuario extends Pessoa implements InterfaceDAO<Usuario> {

	private String login;
	private String senha;
	private String nomeSocial;

	public Usuario(Long id, String nome, String fone1, String fone2, String email, String cpfCnpj, String rgInscricaoEstadual, LocalDateTime dataCadastro, String cep, String cidade, String bairro, String logradouro, String complemento, String login, String senha, String nomeSocial) {
		super(id, nome, fone1, fone2, email, cpfCnpj, rgInscricaoEstadual, dataCadastro, cep, cidade, bairro, logradouro, complemento);
		this.login = login;
		this.senha = senha;
		this.nomeSocial = nomeSocial;
	}

	public Usuario() {
		super();
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getNomeSocial() {
		return nomeSocial;
	}

	public void setNomeSocial(String nomeSocial) {
		this.nomeSocial = nomeSocial;
	}

	@Override
	public synchronized Usuario save() {
		String query;
		List<Object> params = new ArrayList<>();

		if (this.getId() == null) {
			query = "INSERT INTO usuario (nome, fone1, fone2, email, cpf_cnpj, rg_inscricao_estadual, data_cadastro, " +
					"cep, cidade, bairro, logradouro, complemento, login, senha, nome_social) " +
					"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
			params.add(this.login);
			params.add(this.senha);
			params.add(this.nomeSocial);
		} else {
			query = "UPDATE usuario SET nome = ?, fone1 = ?, fone2 = ?, email = ?, cpf_cnpj = ?, rg_inscricao_estadual = ?, " +
					"cep = ?, cidade = ?, bairro = ?, logradouro = ?, complemento = ?, login = ?, senha = ?, nome_social = ? " +
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
			params.add(this.login);
			params.add(this.senha);
			params.add(this.nomeSocial);
			params.add(this.getId());
		}

		try {
			executeQuery(query, params);
			return findById(this.getId() != null ? this.getId() : Utils.getLastInsertedId("usuario"));
		} catch (SQLException e) {
			System.err.println("Erro ao salvar o usuário: " + e.getMessage());
			e.printStackTrace();
			throw new RuntimeException("Erro ao salvar o usuário", e);
		}
	}

	public static Usuario findById(Long id) throws SQLException {
		String query = "SELECT * FROM usuario WHERE id = ?";
		List<Object> params = List.of(id);

		try (ResultSet rs = DB.consultQuery(query, params)) {
			if (rs.next()) {
				return new Usuario(
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
						rs.getString("login"),
						rs.getString("senha"),
						rs.getString("nome_social")
				);
			}
		}
		return null;
	}

	public static List<Usuario> findAll(Map<String, String> filter) throws SQLException {
		StringBuilder query = new StringBuilder("SELECT * FROM usuario WHERE 1=1");
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
		List<Usuario> resultList = new ArrayList<>();

		while (rs.next()) {
			Usuario usuario = new Usuario(
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
					rs.getString("login"),
					rs.getString("senha"),
					rs.getString("nome_social")
			);
			resultList.add(usuario);
		}
		return resultList;
	}

	public static boolean deleteById(Long id) {
		try {
			List<Object> params = List.of(id);
			DB.executeQuery("DELETE FROM usuario WHERE id = ?", params);
			return true;
		} catch (SQLException e) {
			System.err.println("Erro ao excluir o usuário: " + e.getMessage());
			return false;
		}
	}

	@Override
	public List<Usuario> findByAttribute(String attr, Object value) {
		return List.of();
	}

	@Override
	public void update(Usuario objeto) {
		this.save();
	}

	@Override
	public void delete(Usuario objeto) {
		deleteById(objeto.getId());
	}
}
