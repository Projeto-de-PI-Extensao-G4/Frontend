import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import styles from './Perfil.module.css';

const USUARIO_INICIAL = { nome: 'Cristiano Silva', email: 'cristiano.silva@crisutilidades.com.br' };

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
  const [usuario, setUsuario] = useState(USUARIO_INICIAL);
  const [agendaConectada, setAgendaConectada] = useState(true);
  const [folha, setFolha] = useState(null); // 'dados' | 'desconectar' | null
  const [toast, setToast] = useState(false);
  const [rascunho, setRascunho] = useState(USUARIO_INICIAL);
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const abrirDados = () => {
    setRascunho(usuario);
    setErros({});
    setFolha('dados');
  };

  const salvarDados = (e) => {
    e.preventDefault();
    const nome = rascunho.nome.trim();
    const email = rascunho.email.trim();
    const novosErros = {};
    if (nome.length < 2 || nome.length > 120) novosErros.nome = 'Informe o nome com 2 a 120 caracteres.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) novosErros.email = 'Informe um e-mail válido.';
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;
    setUsuario({ nome, email });
    setFolha(null);
  };

  const conectarAgenda = () => {
    setAgendaConectada(true);
    setToast(true);
  };

  const desconectarAgenda = () => {
    setAgendaConectada(false);
    setFolha(null);
  };

  const chevron = <img src={icones.chevronDireita} width={7.4} height={12} alt="" />;
  const externo = <img src={iconeExterno} width={18} height={18} alt="" />;

  return (
    <AppLayout cabecalho={{ titulo: 'Cris Utilidades', esquerda: null }}>
      <section className={styles.cabecalho}>
        <div className={styles.avatar} aria-hidden="true">
          {iniciais(usuario.nome)}
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
                {agendaConectada && <span className={styles.itemApoio}>Conectado</span>}
              </span>
            </span>
            <Botao
              variante="texto"
              larguraTotal={false}
              onClick={agendaConectada ? () => setFolha('desconectar') : conectarAgenda}
            >
              {agendaConectada ? 'Desconectar' : 'Conectar'}
            </Botao>
          </div>
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
        <Link to="/" className={styles.botaoSair}>
          <img src={iconeSair} width={18} height={18} alt="" />
          Sair da Conta
        </Link>
        <p className={styles.versao}>Versão 2.4.1 (Build 108)</p>
      </section>

      {toast && (
        <div className={styles.toast} role="status">
          Google Agenda conectado ✓
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
          <Botao type="submit">Salvar</Botao>
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
    </AppLayout>
  );
}
