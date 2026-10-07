import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';

import CampoBusca from '../../components/CampoBusca';
import Cartao from '../../components/Cartao';
import menos from '../../assets/icons/menos.svg';
import mais from '../../assets/icons/mais-pequeno.svg';
import relogioBranco from '../../assets/images/selecao-itens/relogio-branco.png';
import fone from '../../assets/images/selecao-itens/fone.png';
import relogioPulseira from '../../assets/images/selecao-itens/relogio-pulseira.png';
import styles from './SelecaoItens.module.css';

import { useVenda } from '../../contexts/VendaContext';
import { listarProdutos } from '../../services/produtos';

const moeda = (v) => Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const getImagem = (nomeOuId) => {
  const mapeamento = {
    1: relogioBranco,
    2: fone,
    3: relogioPulseira,
    4: relogioBranco
  };
  return mapeamento[nomeOuId] || relogioPulseira;
};

export default function SelecaoItens() {
  const { itens, adicionarItem } = useVenda();
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      setCarregando(true);
      try {
        const data = await listarProdutos({ busca, status: 'ATIVO', tamanho: 100 });
        setProdutos(data.conteudo || []);
      } catch (err) {
        console.error('Erro ao buscar produtos ativos', err);
      } finally {
        setCarregando(false);
      }
    };
    
    const timeout = setTimeout(buscar, 300);
    return () => clearTimeout(timeout);
  }, [busca]);

  const alterar = (produto, delta) => {
    const itemAtual = itens.find(i => i.produtoId === produto.id);
    const q = itemAtual ? itemAtual.quantidade : 0;
    adicionarItem(produto, Math.max(0, q + delta));
  };

  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0);
  const totalValor = itens.reduce((soma, i) => soma + (i.quantidade * i.preco), 0);

  const rodape = (
    <div className={styles.rodape}>
      <div>
        <p className={styles.rodapeQtd}>
          {totalItens} {totalItens === 1 ? 'ITEM SELECIONADO' : 'ITENS SELECIONADOS'}
        </p>
        <p className={styles.rodapeTotal}>{moeda(totalValor)}</p>
      </div>
      <Link to="/vendas/nova" className={styles.confirmar}>
        Confirmar
      </Link>
    </div>
  );

  return (
    <AppLayout
      cabecalho={{ titulo: 'Selecionar Itens', esquerda: 'voltar' }}
      flutuante={rodape}
    >
      <CampoBusca placeholder="Buscar produto por nome..." valor={busca} onChange={setBusca} />

      {carregando && <p className="texto-apoio" style={{marginTop: '15px'}}>Carregando produtos...</p>}

      <ul className={styles.lista}>
        {!carregando && produtos.map((p) => {
          const itemAdicionado = itens.find(i => i.produtoId === p.id);
          const qtd = itemAdicionado ? itemAdicionado.quantidade : 0;
          
          return (
            <li key={p.id}>
              <Cartao className={styles.cartao}>
                <span className={styles.foto}>
                  <img src={p.imagemUrl || getImagem(p.categoria?.id)} alt="" />
                </span>
                <div className={styles.info}>
                  <p className={styles.nome}>{p.nome}</p>
                  <div className={styles.linhaPreco}>
                    <p className={styles.preco}>{moeda(p.precoVenda)}</p>
                    <div className={styles.contador}>
                      <button
                        type="button"
                        className={styles.botaoContador}
                        aria-label={`Diminuir ${p.nome}`}
                        disabled={qtd === 0}
                        onClick={() => alterar(p, -1)}
                      >
                        <img src={menos} width={10.5} height={1.5} alt="" />
                      </button>
                      <span className={styles.qtd} aria-live="polite">
                        {qtd}
                      </span>
                      <button
                        type="button"
                        className={styles.botaoContador}
                        aria-label={`Aumentar ${p.nome}`}
                        onClick={() => alterar(p, 1)}
                      >
                        <img src={mais} width={10.5} height={10.5} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </Cartao>
            </li>
          );
        })}
      </ul>
      {!carregando && produtos.length === 0 && <p className="texto-apoio" style={{marginTop: '15px'}}>Nenhum produto ativo encontrado.</p>}
    </AppLayout>
  );
}
