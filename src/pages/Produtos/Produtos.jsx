import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { BotaoBuscaHeader } from '../../components/Header';
import CampoBusca from '../../components/CampoBusca';
import Chip, { LinhaChips } from '../../components/Chip';
import Cartao from '../../components/Cartao';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import editar from '../../assets/icons/editar.svg';
import olho from '../../assets/icons/olho.svg';
import olhoRiscado from '../../assets/icons/olho-riscado.svg';
import relogio from '../../assets/images/produtos/relogio.png';
import camera from '../../assets/images/produtos/camera.png';
import utensilios from '../../assets/images/produtos/utensilios.png';
import prateleira from '../../assets/images/produtos/prateleira.png';
import styles from './Produtos.module.css';

const INICIAIS = [
  { id: 1, categoria: 'Roupas', nome: 'Jogo de Lençol Casal', preco: 'R$ 299,90', ativo: true, foto: relogio },
  { id: 2, categoria: 'Mesa', nome: 'Toalha de Mesa Linho', preco: 'R$ 549,00', ativo: false, foto: camera },
  { id: 3, categoria: 'Banho', nome: 'Toalha de Banho Algodão', preco: 'R$ 185,50', ativo: true, foto: utensilios },
  { id: 4, categoria: 'Imóveis', nome: 'Aparador de Madeira', preco: 'R$ 75,00', ativo: true, foto: prateleira },
];

const FILTROS = [
  { chave: 'todos', rotulo: 'Todos' },
  { chave: 'ativos', rotulo: 'Ativos' },
  { chave: 'inativos', rotulo: 'Inativos' },
];

export default function Produtos() {
  const [produtos, setProdutos] = useState(INICIAIS);
  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');

  const termo = busca.trim().toLowerCase();
  const visiveis = produtos.filter((p) => {
    if (filtro === 'ativos' && !p.ativo) return false;
    if (filtro === 'inativos' && p.ativo) return false;
    return p.nome.toLowerCase().includes(termo);
  });

  const alternarStatus = (id) =>
    setProdutos((lista) => lista.map((p) => (p.id === id ? { ...p, ativo: !p.ativo } : p)));

  return (
    <AppLayout
      cabecalho={{ titulo: 'Produtos', direita: <BotaoBuscaHeader /> }}
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
        {visiveis.map((p) => (
          <li key={p.id}>
            <Cartao className={`${styles.cartao} ${p.ativo ? '' : styles.inativo}`}>
              <Link to={`/produtos/${p.id}/editar`} className={styles.corpo}>
                <span className={styles.foto}>
                  <img src={p.foto} alt="" />
                </span>
                <span className={styles.texto}>
                  <span className={styles.linhaTopo}>
                    <span className={styles.categoria}>{p.categoria}</span>
                    <span className={`${styles.status} ${p.ativo ? '' : styles.statusInativo}`}>
                      <span className={styles.ponto} />
                      {p.ativo ? 'ATIVO' : 'INATIVO'}
                    </span>
                  </span>
                  <span className={styles.nome}>{p.nome}</span>
                  <span className={styles.preco}>{p.preco}</span>
                </span>
              </Link>
              <div className={styles.acoes}>
                <Link to={`/produtos/${p.id}/editar`} className={styles.acao} aria-label={`Editar ${p.nome}`}>
                  <img src={editar} width={18} height={18} alt="" />
                </Link>
                <button
                  type="button"
                  className={styles.acao}
                  aria-label={p.ativo ? `Inativar ${p.nome}` : `Ativar ${p.nome}`}
                  onClick={() => alternarStatus(p.id)}
                >
                  <img src={p.ativo ? olho : olhoRiscado} width={22} height={p.ativo ? 15 : 19.8} alt="" />
                </button>
              </div>
            </Cartao>
          </li>
        ))}
      </ul>
      {visiveis.length === 0 && <p className="texto-apoio">Nenhum produto encontrado.</p>}
    </AppLayout>
  );
}
