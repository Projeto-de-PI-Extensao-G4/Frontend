import { useState } from "react";

import Header from "./components/Header";
import InputField from "./components/InputField";
import Button from "./components/Button";

import "./styles/ClienteCadastro.css";

export default function ClienteCadastro() {

  const [nome,setNome] = useState("");
  const [cpf,setCpf] = useState("");
  const [telefone,setTelefone] = useState("");

  const salvarCliente = () => {

    console.log({
      nome,
      cpf,
      telefone
    });

  };

  return (
    <div className="cliente-container">

      <Header title="Cadastro de Cliente" />

      <main className="content">

        <h2>Novo Cliente</h2>

        <p className="subtitle">
          Preencha as informações básicas para registrar
          um novo contato na sua base de dados.
        </p>

        <InputField
          label="Nome"
          placeholder="Digite o nome completo"
          value={nome}
        />

        <InputField
          label="CPF/CNPJ"
          placeholder="000.000.000-00"
          value={cpf}
        />

        <InputField
          label="Telefone"
          placeholder="(00) 00000-0000"
          value={telefone}
        />

        <div className="info-box">

          <p>
            Ao salvar este cadastro o cliente ficará
            disponível imediatamente para novas vendas.
          </p>

        </div>

        <div className="actions">

          <Button onClick={salvarCliente}>
            Salvar Cliente
          </Button>

          <Button variant="secondary">
            Cancelar
          </Button>

        </div>

      </main>

    </div>
  );
}