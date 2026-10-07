import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Botao from '../../components/Botao';
import campoPessoa from '../../assets/icons/campo-pessoa.svg';
import campoDocumento from '../../assets/icons/campo-documento.svg';
import campoTelefone from '../../assets/icons/campo-telefone.svg';
import { icones } from '../../components/icones';
import styles from './ClienteForm.module.css';

import { 
  buscarCliente, 
  cadastrarCliente, 
  atualizarCliente, 
  mensagemDeErro, 
  formatarCpf,
  formatarTelefone 
} from '../../services/clientes';

const mascaraCpf = (v) => formatarCpf(v);
const mascaraTelefone = (v) => formatarTelefone(v);

let proximoId = 100;
const novoTelefone = (dados = {}) => ({ id: proximoId++, telefone: '', tipo: 'CELULAR', principal: false, ...dados });
const novoEndereco = (dados = {}) => ({ id: proximoId++, logradouro: '', numero: '', bairro: '', cidade: '', complemento: '', ...dados });

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

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefones, setTelefones] = useState([novoTelefone({ principal: true })]);
  const [enderecos, setEnderecos] = useState([]);
  
  const [carregando, setCarregando] = useState(edicao);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!edicao) return;
    
    const carregar = async () => {
      try {
        const cliente = await buscarCliente(id);
        setNome(cliente.nomeCompleto);
        setCpf(mascaraCpf(cliente.cpf));
        
        if (cliente.telefones?.length > 0) {
          setTelefones(cliente.telefones.map(t => novoTelefone({
            telefone: mascaraTelefone(t.telefone),
            tipo: t.tipoTelefone,
            principal: t.principal
          })));
        }
        
        if (cliente.enderecos?.length > 0) {
          setEnderecos(cliente.enderecos.map(e => novoEndereco({
            logradouro: e.logradouro,
            numero: e.numero,
            bairro: e.bairro,
            cidade: e.cidade,
            complemento: e.complemento || ''
          })));
        }
      } catch (err) {
        setErro('Erro ao carregar dados do cliente.');
      } finally {
        setCarregando(false);
      }
    };
    
    carregar();
  }, [id, edicao]);

  const alterar = (setLista, itemId, campo, valor) =>
    setLista((lista) => lista.map((i) => (i.id === itemId ? { ...i, [campo]: valor } : i)));

  const setPrincipal = (indice) => {
    setTelefones((lista) => lista.map((t, i) => ({ ...t, principal: i === indice })));
  };

  const removerTelefone = (indice) => {
    setTelefones((l) => {
      const nova = l.filter((_, i) => i !== indice);
      // Se remover o principal, seta o primeiro como principal
      if (l[indice].principal && nova.length > 0) {
        nova[0].principal = true;
      }
      return nova;
    });
  };

  const salvar = async (e) => {
    e.preventDefault();
    setErro('');
    setSalvando(true);
    
    try {
      if (edicao) {
        await atualizarCliente(id, { 
          nomeCompleto: nome, 
          cpf, 
          telefones: telefones.map(t => ({ telefone: t.telefone, tipoTelefone: t.tipo, principal: t.principal })),
          enderecos 
        });
      } else {
        // O cadastro original só aceita 1 telefone principal, mas vamos mandar o payload ajustado.
        // O backend do cadastro (v1) aceita apenas (nomeCompleto, cpf, telefone)
        // Se a API for a versão simplificada que criamos, faremos o post usando a primeira entrada de telefone
        const telefonePrincipal = telefones.find(t => t.principal) || telefones[0];
        await cadastrarCliente({ 
          nomeCompleto: nome, 
          cpf, 
          telefone: telefonePrincipal.telefone
        });
      }
      navigate('/clientes');
    } catch (err) {
      setErro(mensagemDeErro(err));
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <AppLayout cabecalho={{ titulo: 'Cadastro de Cliente', esquerda: 'voltar' }} semBarra>
        <p className="texto-apoio" style={{padding: '20px'}}>Carregando...</p>
      </AppLayout>
    );
  }

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

        {erro && <div style={{color: 'red', marginBottom: '15px'}}>{erro}</div>}

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
                  <input type="radio" name={`principal`} checked={t.principal} onChange={() => setPrincipal(i)} />
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
          {edicao && (
             <button type="button" className={styles.adicionar} onClick={() => setTelefones((l) => [...l, novoTelefone()])}>
               + Adicionar telefone
             </button>
          )}

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
          {edicao && (
            <button type="button" className={styles.adicionar} onClick={() => setEnderecos((l) => [...l, novoEndereco()])}>
              + Adicionar endereço
            </button>
          )}
          {!edicao && (
            <p className="texto-apoio" style={{fontSize: '0.8rem', marginTop: '10px'}}>
              (Endereços e telefones adicionais poderão ser adicionados na edição do cliente)
            </p>
          )}

          <div className={styles.aviso}>
            <span className={styles.ponto} aria-hidden="true" />
            <p>
              Ao salvar este cadastro, o cliente ficará disponível imediatamente para a emissão de novas vendas e
              relatórios de faturamento.
            </p>
          </div>
        </div>

        <div className={styles.acoes}>
          <Botao type="submit" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar Cliente'}</Botao>
          <Botao variante="secundario" onClick={() => navigate('/clientes')} disabled={salvando}>
            Cancelar
          </Botao>
        </div>
      </form>
    </AppLayout>
  );
}
