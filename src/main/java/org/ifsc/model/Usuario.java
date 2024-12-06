package org.ifsc.model;

import java.time.LocalDateTime;

public class Usuario extends Pessoa {

	private String login;
	private String senha;
	private String nomeSocial;

	public Usuario(Long id, String nome, String fone1, String fone2, String email, String cpfCnpj, String rgInscricaoEstadual, LocalDateTime dataCadastro, String cep, String cidade, String bairro, String logradouro, String complemento, String login, String senha, String nomeSocial) {
		super(id, nome, fone1, fone2, email, cpfCnpj, rgInscricaoEstadual, dataCadastro, cep, cidade, bairro, logradouro, complemento);
		this.login = login;
		this.senha = senha;
		this.nomeSocial = nomeSocial;
	}

	public Usuario(String login, String senha, String nomeSocial) {
		this.login = login;
		this.senha = senha;
		this.nomeSocial = nomeSocial;
	}

	public String getLogin() {
		return login;
	}

	public String getSenha() {
		return senha;
	}

	public String getNomeSocial() {
		return nomeSocial;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public void setNomeSocial(String nomeSocial) {
		this.nomeSocial = nomeSocial;
	}
}
