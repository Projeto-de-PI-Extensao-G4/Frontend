import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/images/login/logo-cris-utilidades.jpg';
import iconeEmail from '../../assets/icons/email.svg';
import iconeCadeado from '../../assets/icons/cadeado.svg';
import iconeOlho from '../../assets/icons/olho.svg';
import iconeInfo from '../../assets/icons/info-circulo.svg';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login(email, senha);
      navigate('/painel');
    } catch (err) {
      setErro('Credenciais inválidas. Tente novamente.');
    } finally {
      setCarregando(false);
    }
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
          {erro && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{erro}</div>}
          
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
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

          <button type="submit" className={styles.entrar} disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
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
