import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Botao from '../../components/Botao';
import { icones } from '../../components/icones';
import campoPessoa from '../../assets/icons/campo-pessoa.svg';
import campoDocumento from '../../assets/icons/campo-documento.svg';
import campoTelefone from '../../assets/icons/campo-telefone.svg';
import styles from './ClienteForm.module.css';

const mascaraCpf = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
};

const mascaraTelefone = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

let proximoId = 100;
const novoTelefone = (dados = {}) => ({ id: proximoId++, telefone: '', tipo: 'CELULAR', ...dados });
const novoEndereco = (dados = {}) => ({ id: proximoId++, logradouro: '', numero: '', bairro: '', cidade: '', ...dados });

const MOCK = {
  nome: 'Antônio Ferreira',
  cpf: '529.982.247-25',
  telefones: [
    { telefone: '(11) 98765-4321', tipo: 'CELULAR' },
    { telefone: '(11) 3333-4444', tipo: 'FIXO' },
  ],
  enderecos: [{ logradouro: 'Rua das Flores', numero: '123A', bairro: 'Centro', cidade: 'São Paulo' }],
};

function CampoIcone({ rotulo, id, icone, tamanho, children }) {
  return (
    <div className={styles.grupo}>
      <label htmlFor={id} className={styles.rotulo}>
        {rotulo}
      </label>
      <div className={styles.caixa}>
        <img src={icone} width={tamanho} height={tamanho} alt="" className={styles.icone} />
        {children}
      </div>
    </div>
  );
}

export default function ClienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const edicao = Boolean(id);

  const [nome, setNome] = useState(edicao ? MOCK.nome : '');
  const [cpf, setCpf] = useState(edicao ? MOCK.cpf : '');
  const [telefones, setTelefones] = useState(() =>
    edicao ? MOCK.telefones.map((t) => novoTelefone(t)) : [novoTelefone()],
  );
  const [principal, setPrincipal] = useState(0);
  const [enderecos, setEnderecos] = useState(() => (edicao ? MOCK.enderecos.map((e) => novoEndereco(e)) : []));

  const alterar = (setLista, itemId, campo, valor) =>
    setLista((lista) => lista.map((i) => (i.id === itemId ? { ...i, [campo]: valor } : i)));

  const removerTelefone = (indice) => {
    setTelefones((l) => l.filter((_, i) => i !== indice));
    setPrincipal((p) => (p === indice ? 0 : p > indice ? p - 1 : p));
  };

  const salvar = (e) => {
    e.preventDefault();
    navigate('/clientes');
  };

  return (
    <AppLayout cabecalho={{ titulo: 'Cadastro de Cliente', esquerda: 'voltar' }} semBarra>
      <form className={styles.form} onSubmit={salvar}>
        <div className={styles.intro}>
          <h2 className={styles.titulo}>{edicao ? 'Editar Cliente' : 'Novo Cliente'}</h2>
          <p className="texto-apoio">
            {edicao
              ? 'Atualize as informações deste contato na sua base de dados.'
              : 'Preencha as informações básicas para registrar um novo contato na sua base de dados.'}
          </p>
        </div>

        <div className={styles.campos}>
          <CampoIcone rotulo="Nome" id="nome" icone={campoPessoa} tamanho={16}>
            <input
              id="nome"
              className={styles.input}
              placeholder="Digite o nome completo..."
              autoComplete="name"
              minLength={2}
              maxLength={150}
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </CampoIcone>

          <CampoIcone rotulo="CPF" id="cpf" icone={campoDocumento} tamanho={20}>
            <input
              id="cpf"
              className={styles.input}
              placeholder="000.000.000-00"
              inputMode="numeric"
              required
              value={cpf}
              onChange={(e) => setCpf(mascaraCpf(e.target.value))}
            />
          </CampoIcone>

          {telefones.map((t, i) => (
            <div key={t.id} className={styles.bloco}>
              <CampoIcone
                rotulo={telefones.length > 1 ? `Telefone ${i + 1}` : 'Telefone'}
                id={`tel-${t.id}`}
                icone={campoTelefone}
                tamanho={18}
              >
                <input
                  id={`tel-${t.id}`}
                  className={styles.input}
                  placeholder="(00) 00000-0000"
                  inputMode="numeric"
                  required
                  value={t.telefone}
                  onChange={(e) => alterar(setTelefones, t.id, 'telefone', mascaraTelefone(e.target.value))}
                />
              </CampoIcone>
              <div className={styles.linhaApoio}>
                <select
                  className={styles.seletor}
                  aria-label="Tipo do telefone"
                  value={t.tipo}
                  onChange={(e) => alterar(setTelefones, t.id, 'tipo', e.target.value)}
                >
                  <option value="CELULAR">Celular</option>
                  <option value="FIXO">Fixo</option>
                </select>
                <label className={styles.principal}>
                  <input type="radio" name="principal" checked={principal === i} onChange={() => setPrincipal(i)} />
                  Principal
                </label>
                {telefones.length > 1 && (
                  <button
                    type="button"
                    className={styles.remover}
                    aria-label={`Remover telefone ${i + 1}`}
                    onClick={() => removerTelefone(i)}
                  >
                    <img src={icones.lixeira} alt="" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button type="button" className={styles.adicionar} onClick={() => setTelefones((l) => [...l, novoTelefone()])}>
            + Adicionar telefone
          </button>

          {enderecos.map((e, i) => (
            <fieldset key={e.id} className={styles.endereco}>
              <legend className={styles.rotulo}>{`Endereço ${i + 1}`}</legend>
              <input
                className={styles.entrada}
                aria-label="Logradouro"
                placeholder="Logradouro"
                required
                value={e.logradouro}
                onChange={(ev) => alterar(setEnderecos, e.id, 'logradouro', ev.target.value)}
              />
              <div className={styles.duas}>
                <input
                  className={styles.entrada}
                  aria-label="Número"
                  placeholder="Número"
                  value={e.numero}
                  onChange={(ev) => alterar(setEnderecos, e.id, 'numero', ev.target.value)}
                />
                <input
                  className={styles.entrada}
                  aria-label="Bairro"
                  placeholder="Bairro"
                  value={e.bairro}
                  onChange={(ev) => alterar(setEnderecos, e.id, 'bairro', ev.target.value)}
                />
              </div>
              <input
                className={styles.entrada}
                aria-label="Cidade"
                placeholder="Cidade"
                required
                value={e.cidade}
                onChange={(ev) => alterar(setEnderecos, e.id, 'cidade', ev.target.value)}
              />
              <button
                type="button"
                className={styles.removerTexto}
                onClick={() => setEnderecos((l) => l.filter((x) => x.id !== e.id))}
              >
                Remover endereço
              </button>
            </fieldset>
          ))}
          <button type="button" className={styles.adicionar} onClick={() => setEnderecos((l) => [...l, novoEndereco()])}>
            + Adicionar endereço
          </button>

          <div className={styles.aviso}>
            <span className={styles.ponto} aria-hidden="true" />
            <p>
              Ao salvar este cadastro, o cliente ficará disponível imediatamente para a emissão de novas vendas e
              relatórios de faturamento.
            </p>
          </div>
        </div>

        <div className={styles.acoes}>
          <Botao type="submit">Salvar Cliente</Botao>
          <Botao variante="secundario" onClick={() => navigate('/clientes')}>
            Cancelar
          </Botao>
        </div>
      </form>
    </AppLayout>
  );
}
