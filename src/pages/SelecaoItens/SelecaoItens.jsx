import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { BotaoBuscaHeader } from '../../components/Header';
import CampoBusca from '../../components/CampoBusca';
import Cartao from '../../components/Cartao';
import menos from '../../assets/icons/menos.svg';
import mais from '../../assets/icons/mais-pequeno.svg';
import relogioBranco from '../../assets/images/selecao-itens/relogio-branco.png';
import fone from '../../assets/images/selecao-itens/fone.png';
import relogioPulseira from '../../assets/images/selecao-itens/relogio-pulseira.png';
import styles from './SelecaoItens.module.css';

const PRODUTOS = [
  { id: 1, nome: 'Jogo de Lençol Casal', preco: 299, foto: relogioBranco },
  { id: 2, nome: 'Toalha de Banho Algodão', preco: 549.9, foto: fone },
  { id: 3, nome: 'Toalha de Mesa Linho', preco: 189, foto: relogioPulseira },
];

const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function SelecaoItens() {
  const [busca, setBusca] = useState('');
  const [quantidades, setQuantidades] = useState({});

  const termo = busca.trim().toLowerCase();
  const visiveis = PRODUTOS.filter((p) => p.nome.toLowerCase().includes(termo));

  const alterar = (id, delta) =>
    setQuantidades((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }));

  const totalItens = PRODUTOS.reduce((soma, p) => soma + (quantidades[p.id] ?? 0), 0);
  const totalValor = PRODUTOS.reduce((soma, p) => soma + (quantidades[p.id] ?? 0) * p.preco, 0);

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
      cabecalho={{ titulo: 'Selecionar Itens', esquerda: 'voltar', direita: <BotaoBuscaHeader /> }}
      flutuante={rodape}
    >
      <CampoBusca placeholder="Buscar produto por nome..." valor={busca} onChange={setBusca} />

      <ul className={styles.lista}>
        {visiveis.map((p) => {
          const qtd = quantidades[p.id] ?? 0;
          return (
            <li key={p.id}>
              <Cartao className={styles.cartao}>
                <span className={styles.foto}>
                  <img src={p.foto} alt="" />
                </span>
                <div className={styles.info}>
                  <p className={styles.nome}>{p.nome}</p>
                  <div className={styles.linhaPreco}>
                    <p className={styles.preco}>{moeda(p.preco)}</p>
                    <div className={styles.contador}>
                      <button
                        type="button"
                        className={styles.botaoContador}
                        aria-label={`Diminuir ${p.nome}`}
                        disabled={qtd === 0}
                        onClick={() => alterar(p.id, -1)}
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
                        onClick={() => alterar(p.id, 1)}
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
      {visiveis.length === 0 && <p className="texto-apoio">Nenhum produto encontrado.</p>}
    </AppLayout>
  );
}
