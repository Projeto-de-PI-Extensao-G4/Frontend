import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AppLayout from '../../components/AppLayout';
import Campo from '../../components/Campo';
import Botao from '../../components/Botao';
import FolhaInferior from '../../components/FolhaInferior';
import { icones } from '../../components/icones';
import iconePessoa from '../../assets/icons/conta-pessoa.svg';
import iconeCadeado from '../../assets/icons/conta-cadeado.svg';
import iconeDocumento from '../../assets/icons/documento.svg';
import iconePrivacidade from '../../assets/icons/privacidade.svg';
import iconeExterno from '../../assets/icons/link-externo.svg';
import iconeSair from '../../assets/icons/sair.svg';
import iconeCalendario from '../../assets/icons/calendario-campo.svg';
import { getTema, aplicarTema } from '../../utils/tema';
import {
  buscarPerfil,
  atualizarPerfil,
  statusAgenda,
  urlConexaoAgenda,
  desconectarAgenda as desconectarAgendaApi,
} from '../../services/perfil';
import styles from './Perfil.module.css';

// Primeiro desenho com o que o login guardou; o GET /perfil confirma logo depois.
function usuarioDoLogin() {
  try {
    const salvo = JSON.parse(localStorage.getItem('user'));
    return { nome: salvo?.nomeCompleto ?? '', email: salvo?.email ?? '' };
  } catch {
    return { nome: '', email: '' };
  }
}

function deResposta(dto) {
  return { nome: dto.nomeCompleto, email: dto.email };
}

// Codigos que o backend devolve no ?erro= do callback do Google
const ERROS_AGENDA = {
  cancelado: 'Conexão cancelada no Google.',
  estado_invalido: 'A conexão expirou. Tente de novo.',
  codigo_invalido: 'O Google recusou a conexão. Tente de novo.',
};

function iniciais(nome) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '?';
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase();
}

function Icone({ src, largura, altura }) {
  return (
    <span className={styles.icone}>
      <img src={src} width={largura} height={altura} alt="" />
    </span>
  );
}

function ItemLista({ icone, texto, destino, onClick, fim }) {
  const conteudo = (
    <>
      <span className={styles.itemEsquerda}>
        {icone}
        <span className={styles.itemTexto}>{texto}</span>
      </span>
      {fim}
    </>
  );
  if (destino) {
    return (
      <Link to={destino} className={styles.item}>
        {conteudo}
      </Link>
    );
  }
  return (
    <button type="button" className={styles.item} onClick={onClick}>
      {conteudo}
    </button>
  );
}

export default function Perfil() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [parametros, setParametros] = useSearchParams();
  const [usuario, setUsuario] = useState(usuarioDoLogin);
  // null enquanto carrega; disponivel=false quando o backend roda sem Google Agenda
  const [agenda, setAgenda] = useState(null);
  const [conectando, setConectando] = useState(false);
  const [folha, setFolha] = useState(null); // 'dados' | 'desconectar' | 'aparencia' | null
  const [temaAtual, setTemaAtual] = useState(getTema());
  const [toast, setToast] = useState('');
  const [rascunho, setRascunho] = useState(usuario);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    buscarPerfil()
      .then((dto) => setUsuario(deResposta(dto)))
      .catch(() => setToast('Não foi possível carregar seus dados.'));
    statusAgenda()
      .then(setAgenda)
      .catch(() => setAgenda({ disponivel: false, conectado: false }));
  }, []);

  // Volta do Google: o backend redireciona para /perfil?status=conectado ou ?erro=...
  useEffect(() => {
    const status = parametros.get('status');
    const erro = parametros.get('erro');
    if (!status && !erro) return;
    setToast(status === 'conectado' ? 'Google Agenda conectado ✓' : ERROS_AGENDA[erro] || 'Não foi possível conectar o Google Agenda.');
    setParametros({}, { replace: true });
  }, [parametros, setParametros]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const abrirDados = () => {
    setRascunho(usuario);
    setErros({});
    setFolha('dados');
  };

  const salvarDados = async (e) => {
    e.preventDefault();
    const nome = rascunho.nome.trim();
    const email = rascunho.email.trim();
    const novosErros = {};
    if (nome.length < 2 || nome.length > 120) novosErros.nome = 'Informe o nome com 2 a 120 caracteres.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) novosErros.email = 'Informe um e-mail válido.';
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;
    setSalvando(true);
    try {
      const dto = await atualizarPerfil({ nomeCompleto: nome, email });
      setUsuario(deResposta(dto));
      const salvo = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...salvo, nomeCompleto: dto.nomeCompleto, email: dto.email }));
      setFolha(null);
    } catch (err) {
      setErros({ email: err?.response?.data?.mensagem || 'Não foi possível salvar.' });
    } finally {
      setSalvando(false);
    }
  };

  // Sai do app para a tela de consentimento do Google: e la que a pessoa
  // escolhe a conta. O backend devolve o navegador para /perfil no fim.
  const conectarAgenda = async () => {
    setConectando(true);
    try {
      window.location.assign(await urlConexaoAgenda());
    } catch {
      setToast('Não foi possível iniciar a conexão com o Google.');
      setConectando(false);
    }
  };

  const desconectarAgenda = async () => {
    try {
      await desconectarAgendaApi();
      setAgenda((a) => ({ ...a, conectado: false }));
    } catch {
      setToast('Não foi possível desconectar o Google Agenda.');
    } finally {
      setFolha(null);
    }
  };

  const agendaConectada = Boolean(agenda?.conectado);
  const apoioAgenda = !agenda ? 'Verificando…' : !agenda.disponivel ? 'Indisponível neste ambiente' : agendaConectada ? 'Conectado' : null;
  
  const handleSair = () => {
    logout();
    navigate('/');
  };

  const chevron = <img src={icones.chevronDireita} width={7.4} height={12} alt="" />;
  const externo = <img src={iconeExterno} width={18} height={18} alt="" />;

  return (
    <AppLayout cabecalho={{ titulo: 'Cris Utilidades', esquerda: null }}>
      <section className={styles.cabecalho}>
        <div className={styles.avatar} aria-hidden="true">
          {iniciais(usuario.nome || '?')}
        </div>
        <div className={styles.identidade}>
          <h2 className={styles.nome}>{usuario.nome}</h2>
          <p className={styles.email}>{usuario.email}</p>
        </div>
      </section>

      <section className={styles.secao}>
        <h3 className={styles.titulo}>MINHA CONTA</h3>
        <div className={styles.lista}>
          <ItemLista
            icone={<Icone src={iconePessoa} largura={16} altura={16} />}
            texto="Dados Pessoais"
            onClick={abrirDados}
            fim={chevron}
          />
          <ItemLista
            icone={<Icone src={iconeCadeado} largura={16} altura={21} />}
            texto="Alterar Senha"
            destino="/perfil/senha"
            fim={chevron}
          />
          <div className={`${styles.item} ${styles.itemAgenda}`}>
            <span className={styles.itemEsquerda}>
              <Icone src={iconeCalendario} largura={16} altura={16} />
              <span>
                <span className={styles.itemTexto}>Google Agenda</span>
                {apoioAgenda && <span className={styles.itemApoio}>{apoioAgenda}</span>}
              </span>
            </span>
            {agenda?.disponivel && (
              <Botao
                variante="texto"
                larguraTotal={false}
                disabled={conectando}
                onClick={agendaConectada ? () => setFolha('desconectar') : conectarAgenda}
              >
                {agendaConectada ? 'Desconectar' : conectando ? 'Abrindo…' : 'Conectar'}
              </Botao>
            )}
          </div>
        </div>
      </section>

      <section className={styles.secao}>
        <h3 className={styles.titulo}>APARÊNCIA</h3>
        <div className={styles.lista}>
          <ItemLista
            icone={
              <span className={styles.icone} style={{ fontSize: '16px', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                🎨
              </span>
            }
            texto={
              <span>
                Estilo de Cores{' '}
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 'normal', color: 'var(--cor-texto-secundario)' }}>
                  {temaAtual === 'classico' ? 'Clássico (Original Figma)' : 'Acolhedor (Viva & Humana)'}
                </span>
              </span>
            }
            onClick={() => setFolha('aparencia')}
            fim={chevron}
          />
        </div>
      </section>

      <section className={styles.secao}>
        <h3 className={styles.titulo}>SOBRE</h3>
        <div className={styles.lista}>
          <ItemLista
            icone={<Icone src={iconeDocumento} largura={16} altura={20} />}
            texto="Termos de Uso"
            fim={externo}
          />
          <ItemLista
            icone={<Icone src={iconePrivacidade} largura={16} altura={20} />}
            texto="Política de Privacidade"
            fim={externo}
          />
        </div>
      </section>

      <section className={styles.sair}>
        <button onClick={handleSair} className={styles.botaoSair}>
          <img src={iconeSair} width={18} height={18} alt="" />
          Sair da Conta
        </button>
        <p className={styles.versao}>Versão 2.4.1 (Build 108)</p>
      </section>

      {toast && (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      )}

      <FolhaInferior aberta={folha === 'dados'} onFechar={() => setFolha(null)} titulo="Dados Pessoais">
        <form className={styles.formulario} onSubmit={salvarDados} noValidate>
          <Campo
            rotulo="Nome completo"
            id="perfil-nome"
            autoComplete="name"
            value={rascunho.nome}
            erro={erros.nome}
            onChange={(e) => setRascunho((r) => ({ ...r, nome: e.target.value }))}
          />
          <Campo
            rotulo="E-mail"
            id="perfil-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={rascunho.email}
            erro={erros.email}
            onChange={(e) => setRascunho((r) => ({ ...r, email: e.target.value }))}
          />
          <Botao type="submit" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</Botao>
          <Botao variante="secundario" onClick={() => setFolha(null)}>
            Cancelar
          </Botao>
        </form>
      </FolhaInferior>

      <FolhaInferior aberta={folha === 'desconectar'} onFechar={() => setFolha(null)} titulo="Desconectar o Google Agenda?">
        <p className="texto-apoio">Os vencimentos serão removidos da sua agenda.</p>
        <Botao onClick={desconectarAgenda}>Desconectar</Botao>
        <Botao variante="secundario" onClick={() => setFolha(null)}>
          Cancelar
        </Botao>
      </FolhaInferior>

      <FolhaInferior aberta={folha === 'aparencia'} onFechar={() => setFolha(null)} titulo="Estilo de Cores">
        <p className="texto-apoio" style={{ marginBottom: '12px' }}>
          Escolha a paleta visual do sistema:
        </p>
        <div className={styles.opcoesTema}>
          <button
            type="button"
            className={`${styles.cartaoTema} ${temaAtual !== 'classico' ? styles.cartaoTemaAtivo : ''}`}
            onClick={() => {
              setTemaAtual('acolhedor');
              aplicarTema('acolhedor');
              setFolha(null);
            }}
          >
            <div className={styles.temaInfo}>
              <span className={styles.temaTitulo}>Acolhedor (Viva & Humana)</span>
              <span className={styles.temaDescricao}>Terracota solar, marfim e areia quente.</span>
            </div>
            <div className={styles.amostrasCor}>
              <span className={styles.amostra} style={{ background: '#E0583E' }} title="Terracota Solar" />
              <span className={styles.amostra} style={{ background: '#FAF7F2' }} title="Marfim" />
              <span className={styles.amostra} style={{ background: '#FDDCD0' }} title="Damasco / Pêssego" />
            </div>
          </button>

          <button
            type="button"
            className={`${styles.cartaoTema} ${temaAtual === 'classico' ? styles.cartaoTemaAtivo : ''}`}
            onClick={() => {
              setTemaAtual('classico');
              aplicarTema('classico');
              setFolha(null);
            }}
          >
            <div className={styles.temaInfo}>
              <span className={styles.temaTitulo}>Clássico (Original Figma)</span>
              <span className={styles.temaDescricao}>Monocromático industrial em preto, cinza e branco.</span>
            </div>
            <div className={styles.amostrasCor}>
              <span className={styles.amostra} style={{ background: '#000000' }} title="Preto" />
              <span className={styles.amostra} style={{ background: '#F9F9F9' }} title="Cinza Claro" />
              <span className={styles.amostra} style={{ background: '#C4C7C7' }} title="Borda Metálica" />
            </div>
          </button>
        </div>
        <Botao variante="secundario" onClick={() => setFolha(null)}>
          Fechar
        </Botao>
      </FolhaInferior>
    </AppLayout>
  );
}
