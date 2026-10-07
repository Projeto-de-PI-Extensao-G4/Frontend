import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { BotaoFiltroHeader } from '../../components/Header';
import CampoBusca from '../../components/CampoBusca';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import { icones } from '../../components/icones';
import styles from './Clientes.module.css';
import { listarClientes, formatarTelefone, formatarCpf, obterResumoClientes } from '../../services/clientes';

export default function Clientes() {
  const [busca, setBusca] = useState('');
  const [clientes, setClientes] = useState([]);
  const [resumo, setResumo] = useState({ totalClientes: 0, novosNoPeriodo: 0 });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Busca do backend
  useEffect(() => {
    const fetchClientes = async () => {
      setCarregando(true);
      setErro('');
      try {
        const data = await listarClientes({ busca });
        setClientes(data.conteudo || []);
      } catch (err) {
        setErro('Erro ao carregar clientes da API.');
      } finally {
        setCarregando(false);
      }
    };
    
    // Pequeno debounce na busca
    const timeout = setTimeout(fetchClientes, 300);
    return () => clearTimeout(timeout);
  }, [busca]);

  // Busca do resumo (KPIs)
  useEffect(() => {
    const fetchResumo = async () => {
      try {
        const hoje = new Date();
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split('T')[0];
        const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().split('T')[0];
        const data = await obterResumoClientes(inicioMes, fimMes);
        setResumo(data);
      } catch (err) {
        console.error('Erro ao buscar resumo:', err);
      }
    };
    fetchResumo();
  }, []);

  const progressoNovos = resumo.totalClientes > 0 
    ? Math.min(100, (resumo.novosNoPeriodo / Math.max(1, resumo.totalClientes)) * 100) 
    : 0;

  return (
    <AppLayout
      cabecalho={{ titulo: 'Clientes', direita: <BotaoFiltroHeader /> }}
      flutuante={<BotaoFlutuante rotulo="Novo cliente" para="/clientes/novo" />}
    >

      <CampoBusca placeholder="Buscar por nome ou CPF..." valor={busca} onChange={setBusca} />

      <div className={styles.resumo}>
        <div className={styles.cartaoResumo}>
          <span className="rotulo-secao">TOTAL CLIENTES</span>
          <strong className={styles.numero}>{resumo.totalClientes}</strong>
        </div>
        <div className={styles.cartaoResumo}>
          <span className="rotulo-secao">NOVOS (MÊS)</span>
          <strong className={styles.numero}>{resumo.novosNoPeriodo}</strong>
          <div className={styles.trilho}>
            <div className={styles.progresso} style={{ width: `${progressoNovos}%` }}/>
          </div>
        </div>
      </div>

      <div className={styles.lista}>
        {carregando && <p className="texto-apoio">Carregando...</p>}
        {!carregando && erro && <p className="texto-apoio" style={{color: 'red'}}>{erro}</p>}
        
        {!carregando && !erro && clientes.length === 0 && (
          <p className="texto-apoio">Nenhum cliente encontrado.</p>
        )}

        {!carregando && !erro && clientes.map((c) => {
          const numeroFormatado = c.telefonePrincipal ? formatarTelefone(c.telefonePrincipal) : 'Sem telefone';
          
          return (
            <Link key={c.id} to={`/clientes/${c.id}`} className={styles.item}>
              <span className={styles.avatar}>
                <img src={icones.pessoa} width={16} height={16} alt="" />
              </span>
              <span className={styles.dados}>
                <span className={styles.nome}>{c.nomeCompleto}</span>
                <span className={styles.contato}>
                  <span>{numeroFormatado}</span>
                  <span className={styles.cpf}>{formatarCpf(c.cpf)}</span>
                </span>
              </span>
              <img src={icones.chevronDireita} width={7.4} height={12} alt="" />
            </Link>
          );
        })}
      </div>
    </AppLayout>
  );
}
