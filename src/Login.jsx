import { useState } from "react";

import Logo from "./components/Logo";
import InputField from "./components/InputField";
import Button from "./components/Button";

import "./styles/Login.css";

export default function Login() {

  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");

  const handleLogin = () => {

    console.log({
      email,
      senha
    });

  };

  return (
    <div className="login-container">

      <Logo />

      <h1>Cris Utilidades</h1>

      <div className="login-card">

        <InputField
          label="E-mail"
          type="email"
          placeholder="email@exemplo.com"
          value={email}
        />

        <InputField
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
        />

        <a href="/" className="forgot">
          Esqueci a senha
        </a>

        <Button onClick={handleLogin}>
          Entrar
        </Button>

      </div>

      <div className="admin-card">

        <h3>Acesso Administrativo</h3>

        <p>
          Utilize suas credenciais corporativas para acessar
          o painel de gestão e estoque.
        </p>

      </div>

    </div>
  );
}