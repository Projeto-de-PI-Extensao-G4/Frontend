import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/login/logo-cris-utilidades.jpg';
import iconeEmail from '../../assets/icons/email.svg';
import iconeCadeado from '../../assets/icons/cadeado.svg';
import iconeOlho from '../../assets/icons/olho.svg';
import iconeInfo from '../../assets/icons/info-circulo.svg';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const entrar = (e) => {
    e.preventDefault();
    navigate('/painel');
  };

  return (
    <div className={styles.tela}>
      <div className={styles.coluna}>
        <div className={styles.marca}>
          <div className={styles.logo}>
            <img src={logo} alt="" className={styles.logoImg} />
          </div>
          <h1 className={styles.nome}>Cris Utilidades</h1>
        </div>

        <form className={styles.cartao} onSubmit={entrar}>
          <div className={styles.campo}>
            <label htmlFor="email" className={styles.rotulo}>E-mail</label>
            <div className={styles.caixa}>
              <img src={iconeEmail} width={20} height={16} alt="" className={styles.iconeEsq} />
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="email@exemplo.com"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.campo}>
            <label htmlFor="senha" className={styles.rotulo}>Senha</label>
            <div className={styles.caixa}>
              <img src={iconeCadeado} width={16} height={21} alt="" className={styles.iconeEsq} />
              <input
                id="senha"
                type={mostrarSenha ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.olho}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={mostrarSenha}
                onClick={() => setMostrarSenha((v) => !v)}
              >
                <img src={iconeOlho} width={22} height={15} alt="" />
              </button>
            </div>
          </div>

          <button type="submit" className={styles.entrar}>Entrar</button>
        </form>

        <div className={styles.aviso}>
          <img src={iconeInfo} width={20} height={22} alt="" />
          <div>
            <h2 className={styles.avisoTitulo}>Acesso Administrativo</h2>
            <p className={styles.avisoTexto}>
              Utilize suas credenciais corporativas para acessar o painel de gestão e estoque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
