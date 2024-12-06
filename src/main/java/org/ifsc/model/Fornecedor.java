package org.ifsc.model;

import java.time.LocalDateTime;

public class Fornecedor extends Pessoa{

	private String nomeFantasia;
	private String contato;

	public Fornecedor(Long id, String nome, String fone1, String fone2, String email, String cpfCnpj, String rgInscricaoEstadual, LocalDateTime dataCadastro, String cep, String cidade, String bairro, String logradouro, String complemento, String nomeFantasia, String contato) {
		super(id, nome, fone1, fone2, email, cpfCnpj, rgInscricaoEstadual, dataCadastro, cep, cidade, bairro, logradouro, complemento);
		this.nomeFantasia = nomeFantasia;
		this.contato = contato;
	}

	public Fornecedor(String nomeFantasia, String contato) {
		this.nomeFantasia = nomeFantasia;
		this.contato = contato;
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
}
