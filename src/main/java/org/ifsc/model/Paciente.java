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

import static org.ifsc.DB.DB.executeQuery;

public class Paciente extends Pessoa implements InterfaceDAO<Paciente> {

	private String tipoSanguineo;
	private String sexo;
	private String nomeSocial;

	public Paciente(Long id, String nome, String fone1, String fone2, String email, String cpfCnpj,
					String rgInscricaoEstadual, LocalDateTime dataCadastro, String cep, String cidade, String bairro,
					String logradouro, String complemento, String tipoSanguineo, String sexo, String nomeSocial) {
		super(id, nome, fone1, fone2, email, cpfCnpj, rgInscricaoEstadual, dataCadastro, cep, cidade, bairro,
				logradouro, complemento);
		this.tipoSanguineo = tipoSanguineo;
		this.sexo = sexo;
		this.nomeSocial = nomeSocial;
	}

	public Paciente() {
		super();
	}

	public String getTipoSanguineo() {
		return tipoSanguineo;
	}

	public void setTipoSanguineo(String tipoSanguineo) {
		this.tipoSanguineo = tipoSanguineo;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getNomeSocial() {
		return nomeSocial;
	}

	public void setNomeSocial(String nomeSocial) {
		this.nomeSocial = nomeSocial;
	}

	@Override
	public synchronized Paciente save() {
		String query;
		List<Object> params = new ArrayList<>();

		if (this.getId() == null) {
			query = "INSERT INTO paciente " +
					"(nome, fone1, fone2, email, cpf_Cnpj, rg_Inscricao_Estadual, data_Cadastro, " +
					"cep, cidade, bairro, logradouro, complemento, tipo_Sanguineo, sexo, nome_Social) " +
					"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			params.add(this.getNome());
			params.add(this.getFone1());
			params.add(this.getFone2());
			params.add(this.getEmail());
			params.add(this.getCpfCnpj());
			params.add(this.getRgInscricaoEstadual());
			params.add(Timestamp.valueOf(LocalDateTime.now())); // Define dataCadastro somente no INSERT
			params.add(this.getCep());
			params.add(this.getCidade());
			params.add(this.getBairro());
			params.add(this.getLogradouro());
			params.add(this.getComplemento());
			params.add(this.getTipoSanguineo());
			params.add(this.getSexo());
			params.add(this.getNomeSocial());
		} else {
			query = "UPDATE paciente SET nome = ?, fone1 = ?, fone2 = ?, email = ?, " +
					"cpf_Cnpj = ?, rg_Inscricao_Estadual = ?, cep = ?, cidade = ?, " +
					"bairro = ?, logradouro = ?, complemento = ?, tipo_Sanguineo = ?, sexo = ?, nomeSocial = ? " +
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
			params.add(this.getTipoSanguineo());
			params.add(this.getSexo());
			params.add(this.getNomeSocial());
			params.add(this.getId());
		}

		try {
			executeQuery(query, params); // Executa a query com os parâmetros
			return findById(this.getId() != null ? this.getId() : Utils.getLastInsertedId("paciente"));
		} catch (SQLException e) {
			System.err.println("Erro ao salvar o paciente: " + e.getMessage());
			e.printStackTrace();
			throw new RuntimeException("Erro ao salvar o paciente", e);
		}
	}

	public static List<Paciente> findAll() throws SQLException {
		String sql = "SELECT * FROM paciente";
		ResultSet rs = DB.consultQuery(sql);
		List<Paciente> resultList = new ArrayList<>();
		while (rs.next()){
			Paciente paciente = new Paciente(
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
					rs.getString("tipo_Sanguineo"),
					rs.getString("sexo"),
					rs.getString("nome_Social"));

			resultList.add(paciente);
		}
		return resultList;
	}

	@Override
	public Paciente findById(Long id) throws SQLException {
		String sql = "SELECT * FROM paciente WHERE id = ?";
		List<Object> params = List.of(id);

		try (ResultSet rs = DB.consultQuery(sql, params)) {
			if (rs.next()) {
				return new Paciente(
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
						rs.getString("tipo_Sanguineo"),
						rs.getString("sexo"),
						rs.getString("nome_Social")
				);
			}
		} catch (SQLException e) {
			System.err.println("Erro ao buscar paciente pelo ID: " + e.getMessage());
			throw e;
		}
		return null;
	}


	@Override
	public List<Paciente> findByAttribute(String attr, Object value) {
		return List.of();
	}


	@Override
	public void update(Paciente objeto) {

	}

	@Override
	public void delete(Paciente objeto) {

	}
}
