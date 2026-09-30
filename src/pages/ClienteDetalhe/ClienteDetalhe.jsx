import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { BotaoBuscaHeader } from '../../components/Header';
import { BadgeStatus } from '../../components/Badge';
import { icones } from '../../components/icones';
import styles from './ClienteDetalhe.module.css';

const CLIENTE = {
  nome: 'Antônio Ferreira',
  cpf: '529.982.247-25',
  telefones: ['(11) 98765-4321 · Celular · principal', '(11) 3333-4444 · Fixo'],
  enderecos: ['Rua das Flores, 123A · Centro, São Paulo'],
  totalCompras: 8,
  totalGasto: 'R$ 4.320,50',
};

const VENDAS = [
  { id: 2934, data: '12 Set 2026', valor: 'R$ 1.450,00', status: 'PENDENTE' },
  { id: 2811, data: '03 Ago 2026', valor: 'R$ 389,90', status: 'PAGA' },
  { id: 2650, data: '21 Jun 2026', valor: 'R$ 120,00', status: 'CANCELADA' },
];

const VENDAS_ANTIGAS = [
  { id: 2544, data: '15 Mai 2026', valor: 'R$ 780,00', status: 'PAGA' },
  { id: 2402, data: '02 Abr 2026', valor: 'R$ 215,50', status: 'PAGA' },
];

export default function ClienteDetalhe() {
  const { id } = useParams();
  const [vendas, setVendas] = useState(VENDAS);
  const [temMais, setTemMais] = useState(true);

  const carregarMais = () => {
    setVendas((v) => [...v, ...VENDAS_ANTIGAS]);
    setTemMais(false);
  };

  return (
    <AppLayout cabecalho={{ titulo: 'Cliente', esquerda: 'voltar', direita: <BotaoBuscaHeader /> }}>
      <Link to="/clientes" className={styles.voltar}>
        ‹ Clientes
      </Link>

      <section className={styles.dados}>
        <h2 className={styles.nome}>{CLIENTE.nome}</h2>
        <p className={styles.cpf}>CPF {CLIENTE.cpf}</p>
        <hr className={styles.divisor} />
        {CLIENTE.telefones.map((t) => (
          <p key={t} className={styles.linha}>
            {t}
          </p>
        ))}
        {CLIENTE.enderecos.map((e) => (
          <p key={e} className={styles.linha}>
            {e}
          </p>
        ))}
        <div className={styles.acoes}>
          <Link to={`/clientes/${id}/editar`} className={styles.botaoSecundario}>
            Editar
          </Link>
          <Link to="/vendas/nova" className={styles.botaoPrimario}>
            Nova venda
          </Link>
        </div>
      </section>

      <div className={styles.totais}>
        <div className={styles.total}>
          <span className="rotulo-secao">COMPRAS</span>
          <strong>{CLIENTE.totalCompras}</strong>
        </div>
        <div className={styles.total}>
          <span className="rotulo-secao">TOTAL GASTO</span>
          <strong>{CLIENTE.totalGasto}</strong>
        </div>
      </div>

      <h3 className="rotulo-secao">HISTÓRICO DE COMPRAS</h3>

      <ul className={styles.vendas}>
        {vendas.map((v) => (
          <li key={v.id}>
            <Link to={`/vendas/${v.id}`} className={styles.venda}>
              <span className={styles.esquerda}>
                <span className={styles.vendaNumero}>Venda #{v.id}</span>
                <span className={styles.vendaData}>{v.data}</span>
              </span>
              <span className={styles.direita}>
                <span className={styles.vendaValor}>{v.valor}</span>
                <BadgeStatus status={v.status} />
              </span>
              <img src={icones.chevronDireita} width={7.4} height={12} alt="" />
            </Link>
          </li>
        ))}
      </ul>

      {temMais && (
        <button type="button" className={styles.botaoSecundario} onClick={carregarMais}>
          Carregar mais compras
        </button>
      )}
    </AppLayout>
  );
}
