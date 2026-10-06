import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { BotaoBuscaHeader, BotaoFiltroHeader } from '../../components/Header';
import CampoBusca from '../../components/CampoBusca';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import { icones } from '../../components/icones';
import styles from './Clientes.module.css';

const CLIENTES = [
  { id: 1, nome: 'João Silva', telefone: '(11) 99999-0000', cpf: '529.982.247-25' },
  { id: 2, nome: 'Maria Oliveira', telefone: '(11) 98888-1111', cpf: '111.444.777-35' },
  { id: 3, nome: 'Ricardo Santos', telefone: '(11) 97777-2222', cpf: '390.533.447-05' },
  { id: 4, nome: 'Ana Costa', telefone: '(11) 96666-3333', cpf: '168.995.350-09' },
];

const soDigitos = (t) => t.replace(/\D/g, '');

export default function Clientes() {
  const [busca, setBusca] = useState('');

  const termo = busca.trim().toLowerCase();
  const digitos = soDigitos(busca);
  const filtrados = CLIENTES.filter(
    (c) =>
      !termo ||
      c.nome.toLowerCase().includes(termo) ||
      (digitos && soDigitos(c.telefone).includes(digitos)),
  );

  return (
    <AppLayout
      cabecalho={{ direita: <BotaoBuscaHeader /> }}
      flutuante={<BotaoFlutuante rotulo="Novo cliente" para="/clientes/novo" />}
    >
      <div className={styles.titulo}>
        <h2>Clientes</h2>
        <BotaoFiltroHeader />
      </div>

      <CampoBusca placeholder="Buscar por nome ou telefone..." valor={busca} onChange={setBusca} />

      <div className={styles.lista}>
        {filtrados.map((c) => (
          <Link key={c.id} to={`/clientes/${c.id}`} className={styles.item}>
            <span className={styles.avatar}>
              <img src={icones.pessoa} width={16} height={16} alt="" />
            </span>
            <span className={styles.dados}>
              <span className={styles.nome}>{c.nome}</span>
              <span className={styles.contato}>
                <span>{c.telefone}</span>
                <span className={styles.cpf}>{c.cpf}</span>
              </span>
            </span>
            <img src={icones.chevronDireita} width={7.4} height={12} alt="" />
          </Link>
        ))}
        {filtrados.length === 0 && <p className="texto-apoio">Nenhum cliente encontrado.</p>}
      </div>

      <div className={styles.resumo}>
        <div className={styles.cartaoResumo}>
          <span className="rotulo-secao">TOTAL CLIENTES</span>
          <strong className={styles.numero}>1.240</strong>
          <span className={styles.tendencia}>
            <img src={icones.tendenciaAlta} width={13.333} height={8} alt="" />
            +8%
          </span>
        </div>
        <div className={styles.cartaoResumo}>
          <span className="rotulo-secao">NOVOS (MÊS)</span>
          <strong className={styles.numero}>42</strong>
          <div className={styles.trilho}>
            <div className={styles.progresso} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
