import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';

import CampoBusca from '../../components/CampoBusca';
import Chip, { LinhaChips } from '../../components/Chip';
import Cartao from '../../components/Cartao';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import editar from '../../assets/icons/editar.svg';
import olho from '../../assets/icons/olho.svg';
import olhoRiscado from '../../assets/icons/olho-riscado.svg';

// Imagens fallback (ou pegamos as reais caso existam no backend)
import relogio from '../../assets/images/produtos/relogio.png';
import camera from '../../assets/images/produtos/camera.png';
import utensilios from '../../assets/images/produtos/utensilios.png';
import prateleira from '../../assets/images/produtos/prateleira.png';

import styles from './Produtos.module.css';
import { listarProdutos, alterarStatusProduto, formatarMoeda } from '../../services/produtos';

const FILTROS = [
  { chave: 'todos', rotulo: 'Todos' },
  { chave: 'ativos', rotulo: 'Ativos' },
  { chave: 'inativos', rotulo: 'Inativos' },
];

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // 'todos', 'ativos' ou 'inativos'
  const [busca, setBusca] = useState('');
  
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchProdutos = async () => {
      setCarregando(true);
      setErro('');
      try {
        const queryStatus = filtro === 'ativos' ? 'ATIVO' : filtro === 'inativos' ? 'INATIVO' : undefined;
        const data = await listarProdutos({ busca, status: queryStatus });
        setProdutos(data.conteudo || []);
      } catch (err) {
        setErro('Erro ao carregar os produtos.');
      } finally {
        setCarregando(false);
      }
    };
    
    const timeout = setTimeout(fetchProdutos, 300);
    return () => clearTimeout(timeout);
  }, [busca, filtro]);

  const alternarStatus = async (id, statusAtual) => {
    try {
      const novoStatus = statusAtual === 'ATIVO' ? 'INATIVO' : 'ATIVO';
      await alterarStatusProduto(id, novoStatus);
      
      // Atualiza a lista local sem recarregar tudo
      setProdutos((lista) => lista.map((p) => {
        if (p.id === id) {
          return { ...p, status: novoStatus };
        }
        return p;
      }));
    } catch (err) {
      alert('Erro ao alterar status do produto.');
    }
  };
  
  // Função que mapeia o nome da categoria para a imagem mockada correta 
  // caso o backend não tenha upload de imagem implementado
  const getImagem = (nomeOuId) => {
    const mapeamento = {
      1: relogio, // Roupas
      2: camera, // Mesa
      3: utensilios, // Banho
      4: prateleira // Imóveis
    };
    // fallback aleatorio pra nao ficar vazio
    return mapeamento[nomeOuId] || prateleira;
  };

  return (
    <AppLayout
      cabecalho={{ titulo: 'Produtos' }}
      flutuante={<BotaoFlutuante rotulo="Novo produto" para="/produtos/novo" />}
    >
      <div className={styles.filtros}>
        <CampoBusca placeholder="Buscar no catálogo..." valor={busca} onChange={setBusca} />
        <LinhaChips rotulo="Status">
          {FILTROS.map((f) => (
            <Chip key={f.chave} ativo={filtro === f.chave} onClick={() => setFiltro(f.chave)}>
              {f.rotulo}
            </Chip>
          ))}
        </LinhaChips>
      </div>

      <ul className={styles.lista}>
        {carregando && <p className="texto-apoio">Carregando...</p>}
        {!carregando && erro && <p className="texto-apoio" style={{color: 'red'}}>{erro}</p>}
        
        {!carregando && !erro && produtos.map((p) => {
          const ativo = p.status === 'ATIVO';
          
          return (
            <li key={p.id}>
              <Cartao className={`${styles.cartao} ${ativo ? '' : styles.inativo}`}>
                <Link to={`/produtos/${p.id}/editar`} className={styles.corpo}>
                  <span className={styles.foto}>
                    <img src={p.imagemUrl || getImagem(p.categoria?.id)} alt="" />
                  </span>
                  <span className={styles.texto}>
                    <span className={styles.linhaTopo}>
                      <span className={styles.categoria}>{p.categoria?.nome}</span>
                      <span className={`${styles.status} ${ativo ? '' : styles.statusInativo}`}>
                        <span className={styles.ponto} />
                        {ativo ? 'ATIVO' : 'INATIVO'}
                      </span>
                    </span>
                    <span className={styles.nome}>{p.nome}</span>
                    <span className={styles.preco}>{formatarMoeda(p.precoVenda)}</span>
                  </span>
                </Link>
                <div className={styles.acoes}>
                  <Link to={`/produtos/${p.id}/editar`} className={styles.acao} aria-label={`Editar ${p.nome}`}>
                    <img src={editar} width={18} height={18} alt="" />
                  </Link>
                  <button
                    type="button"
                    className={styles.acao}
                    aria-label={ativo ? `Inativar ${p.nome}` : `Ativar ${p.nome}`}
                    onClick={() => alternarStatus(p.id, p.status)}
                  >
                    <img src={ativo ? olho : olhoRiscado} width={22} height={ativo ? 15 : 19.8} alt="" />
                  </button>
                </div>
              </Cartao>
            </li>
          );
        })}
      </ul>
      {!carregando && !erro && produtos.length === 0 && <p className="texto-apoio">Nenhum produto encontrado.</p>}
    </AppLayout>
  );
}
