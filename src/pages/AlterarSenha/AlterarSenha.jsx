import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Campo from '../../components/Campo';
import Botao from '../../components/Botao';
import styles from './AlterarSenha.module.css';

function CampoSenha({ rotulo, id, valor, onChange, erro, autoComplete }) {
  const [visivel, setVisivel] = useState(false);
  return (
    <Campo
      rotulo={rotulo}
      id={id}
      erro={erro}
    >
      <input
        id={id}
        type={visivel ? 'text' : 'password'}
        autoComplete={autoComplete}
        autoCapitalize="none"
        spellCheck={false}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className={styles.mostrar}
        aria-pressed={visivel}
        aria-label={`${visivel ? 'Ocultar' : 'Mostrar'} ${rotulo.toLowerCase()}`}
        onClick={() => setVisivel((v) => !v)}
      >
        {visivel ? 'Ocultar' : 'Mostrar'}
      </button>
    </Campo>
  );
}

export default function AlterarSenha() {
  const navigate = useNavigate();
  const [atual, setAtual] = useState('');
  const [nova, setNova] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erros, setErros] = useState({});

  const salvar = (e) => {
    e.preventDefault();
    const novos = {};
    if (!atual) novos.atual = 'Informe a senha atual.';
    if (nova.length < 8) novos.nova = 'A nova senha precisa ter no mínimo 8 caracteres.';
    else if (nova === atual) novos.nova = 'A nova senha não pode ser igual à atual.';
    if (confirmacao !== nova) novos.confirmacao = 'A confirmação não é igual à nova senha.';
    setErros(novos);
    if (Object.keys(novos).length === 0) navigate('/perfil');
  };

  return (
    <AppLayout cabecalho={{ titulo: 'Alterar Senha', esquerda: 'voltar' }} semBarra>
      <form className={styles.formulario} onSubmit={salvar} noValidate>
        <CampoSenha
          rotulo="Senha atual"
          id="senha-atual"
          autoComplete="current-password"
          valor={atual}
          onChange={setAtual}
          erro={erros.atual}
        />
        <CampoSenha
          rotulo="Nova senha"
          id="senha-nova"
          autoComplete="new-password"
          valor={nova}
          onChange={setNova}
          erro={erros.nova}
        />
        <CampoSenha
          rotulo="Confirmar nova senha"
          id="senha-confirmacao"
          autoComplete="new-password"
          valor={confirmacao}
          onChange={setConfirmacao}
          erro={erros.confirmacao}
        />
        <p className="texto-apoio">Mínimo de 8 caracteres. A nova senha não pode ser igual à atual.</p>
        <Botao type="submit">Salvar</Botao>
      </form>
    </AppLayout>
  );
}
