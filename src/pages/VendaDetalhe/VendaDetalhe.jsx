import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Botao from '../../components/Botao';
import { BadgeStatus } from '../../components/Badge';
import FolhaInferior from '../../components/FolhaInferior';
import { enviarComprovantePdf } from '../../components/comprovante/gerarComprovantePdf';
import calendarioPequeno from '../../assets/icons/calendario-pequeno.svg';
import parcelaPaga from '../../assets/icons/parcela-paga.svg';
import parcelaAberta from '../../assets/icons/parcela-aberta.svg';
import parcelaAguardando from '../../assets/icons/parcela-aguardando.svg';
import registrarPagamento from '../../assets/icons/registrar-pagamento.svg';
import registrarPagamentoInativo from '../../assets/icons/registrar-pagamento-inativo.svg';
import styles from './VendaDetalhe.module.css';

import { buscarVenda, pagarParcela as pagarParcelaAPI, quitarVenda as quitarVendaAPI, cancelarVenda as cancelarVendaAPI } from '../../services/vendas';

// IDs mockados
const FORMAS_PAGAMENTO = [
  { id: 1, nome: 'PIX' },
  { id: 2, nome: 'Cartão de crédito' }
];
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const moeda = (v) => Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function formatarDataHora(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()} — ${d.getHours()}h${String(
    d.getMinutes(),
  ).padStart(2, '0')}`;
}

function formatarData(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function VendaDetalhe() {
  const { id } = useParams();
  const [venda, setVenda] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  
  const [folha, setFolha] = useState(null); // { tipo: 'pagar' | 'quitar' | 'cancelar' | 'comprovante', parcelaId? }
  const [copiado, setCopiado] = useState(false);
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const carregarVenda = async () => {
    try {
      const data = await buscarVenda(id);
      setVenda(data);
    } catch (err) {
      setErro('Erro ao carregar os detalhes da venda.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarVenda();
  }, [id]);

  const fecharFolha = () => setFolha(null);

  const pagarParcela = async (parcelaId, formaPagamentoId) => {
    try {
      await pagarParcelaAPI(venda.id, parcelaId, formaPagamentoId);
      await carregarVenda();
      fecharFolha();
    } catch (err) {
      alert(err?.response?.data?.mensagem || 'Erro ao registrar pagamento.');
    }
  };

  const quitarSaldo = async (formaPagamentoId) => {
    try {
      await quitarVendaAPI(venda.id, formaPagamentoId);
      await carregarVenda();
      fecharFolha();
    } catch (err) {
      alert(err?.response?.data?.mensagem || 'Erro ao quitar saldo.');
    }
  };

  const confirmarCancelamento = async (motivo) => {
    try {
      await cancelarVendaAPI(venda.id, motivo);
      await carregarVenda();
      fecharFolha();
    } catch (err) {
      alert(err?.response?.data?.mensagem || 'Erro ao cancelar venda.');
    }
  };

  const gerarReciboPdf = async () => {
    if (gerandoPdf) return;
    setGerandoPdf(true);
    try {
      await enviarComprovantePdf(venda);
      fecharFolha();
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar comprovante.');
    } finally {
      setGerandoPdf(false);
    }
  };

  const copiarPix = () => {
    // Chave PIX fictícia para o MVP
    navigator.clipboard.writeText('00.000.000/0001-00');
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  if (carregando) {
    return (
      <AppLayout cabecalho={{ titulo: 'Venda', esquerda: 'voltar' }} semBarra>
        <p className="texto-apoio" style={{padding: '20px'}}>Carregando...</p>
      </AppLayout>
    );
  }

  if (erro || !venda) {
    return (
      <AppLayout cabecalho={{ titulo: 'Venda', esquerda: 'voltar' }} semBarra>
        <p className="texto-apoio" style={{padding: '20px', color: 'red'}}>{erro}</p>
      </AppLayout>
    );
  }

  const cancelada = venda.statusVendaSituacao === 'CANCELADA';
  const parcelas = venda.parcelas || [];
  const pagas = parcelas.filter(p => p.statusExibicao === 'PAGA').length;
  const saldo = venda.valorRestante || 0;

  return (
    <AppLayout cabecalho={{ titulo: `Venda #${venda.id}`, esquerda: 'voltar' }} semBarra>
      <section className={styles.cabecalho}>
        <div className={styles.infosBase}>
          <div className={styles.infoPessoa}>
            <span className="rotulo-secao">CLIENTE</span>
            <p className={styles.clienteNome}>{venda.clienteNome}</p>
            <p className={styles.dataVenda}>
              <img src={calendarioPequeno} width={10} height={11.11} alt="" />
              {formatarDataHora(venda.dataVenda)}
            </p>
          </div>
          <div className={styles.infoValor}>
            <strong className={styles.valorTotal}>{moeda(venda.valorTotal)}</strong>
            <BadgeStatus status={venda.statusVendaSituacao} />
          </div>
        </div>

        {!cancelada && (
          <div className={styles.acoesBase}>
            <Botao onClick={() => setFolha({ tipo: 'comprovante' })}>Gerar Comprovante</Botao>
            <Botao variante="secundario" onClick={() => setFolha({ tipo: 'cancelar' })}>
              Cancelar venda
            </Botao>
          </div>
        )}
      </section>

      {cancelada && (
        <section className={styles.avisoCancelamento}>
          <p className={styles.avisoCancelamentoTitulo}>Venda Cancelada</p>
          <p>{venda.motivoCancelamento || 'Nenhum motivo informado.'}</p>
        </section>
      )}

      <div className={styles.detalhes}>
        <section>
          <div className={styles.blocoTitulo}>
            <h2 className="rotulo-secao">PRODUTOS ({venda.itens?.length || 0})</h2>
            <strong className={styles.blocoValor}>{moeda(venda.valorTotal)}</strong>
          </div>
          <ul className={styles.itens}>
            {venda.itens?.map((i) => (
              <li key={i.id} className={styles.item}>
                <span className={styles.itemNome}>
                  {i.quantidade}x {i.produtoNome}
                </span>
                <span className={styles.itemValor}>{moeda(i.subtotal || (i.quantidade * i.precoUnitario))}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className={styles.blocoTitulo}>
            <h2 className="rotulo-secao">
              PAGAMENTO ({pagas}/{venda.qtdParcelas})
            </h2>
            <strong className={styles.blocoValor}>{moeda(venda.valorPago)}</strong>
          </div>

          <ul className={styles.parcelas}>
            {parcelas.map((p) => {
              const paga = p.statusExibicao === 'PAGA';
              const aberta = p.statusExibicao === 'ABERTA';

              let iconeStatus = parcelaAguardando;
              let iconeClasse = styles.parcelaIcone;
              if (paga) {
                iconeStatus = parcelaPaga;
                iconeClasse = '';
              } else if (aberta) {
                iconeStatus = parcelaAberta;
              }

              return (
                <li key={p.id} className={`${styles.parcela} ${paga ? styles.parcelaPaga : ''}`}>
                  <div className={styles.parcelaEsquerda}>
                    <img src={iconeStatus} width={24} height={24} alt="" className={iconeClasse} />
                    <div className={styles.parcelaInfo}>
                      <span className={styles.parcelaTitulo}>Parcela {p.numeroParcela}</span>
                      <span className={styles.parcelaSub}>
                        {paga
                          ? `Pago em ${formatarData(p.dataPagamento)} • ${p.formaPagamentoNome}`
                          : `Vence ${formatarData(p.dataVencimento)}`}
                      </span>
                    </div>
                  </div>
                  <div className={styles.parcelaDireita}>
                    <strong className={styles.parcelaValor}>{moeda(p.valorParcela)}</strong>
                    {!cancelada && (
                      <button
                        type="button"
                        className={styles.botaoRegistrarPagamento}
                        aria-label={paga ? 'Pagamento já registrado' : `Registrar pagamento parcela ${p.numeroParcela}`}
                        disabled={!aberta}
                        onClick={() => setFolha({ tipo: 'pagar', parcelaId: p.id })}
                      >
                        <img
                          src={aberta ? registrarPagamento : registrarPagamentoInativo}
                          width={24}
                          height={24}
                          alt=""
                        />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {!cancelada && saldo > 0 && (
        <div className={styles.quitar}>
          <div className={styles.quitarInfo}>
            <span className={styles.quitarRotulo}>Saldo restante</span>
            <strong className={styles.quitarValor}>{moeda(saldo)}</strong>
          </div>
          <Botao onClick={() => setFolha({ tipo: 'quitar' })}>Quitar Saldo</Botao>
        </div>
      )}

      {/* Folha de Registrar Pagamento */}
      <FolhaInferior
        aberta={folha?.tipo === 'pagar'}
        onFechar={fecharFolha}
        titulo={
          folha?.parcelaId
            ? `Registrar pagamento da Parcela ${
                parcelas.find((p) => p.id === folha.parcelaId)?.numeroParcela
              }`
            : ''
        }
      >
        <p className="texto-apoio">
          Confirmar o recebimento de{' '}
          <strong>{moeda(parcelas.find((p) => p.id === folha?.parcelaId)?.valorParcela)}</strong>?
        </p>
        <div className={styles.botoesFolhaSecundarios}>
          {FORMAS_PAGAMENTO.map((f) => (
            <Botao key={f.id} onClick={() => pagarParcela(folha.parcelaId, f.id)}>
              {f.nome}
            </Botao>
          ))}
        </div>
      </FolhaInferior>

      {/* Folha de Quitar Saldo */}
      <FolhaInferior aberta={folha?.tipo === 'quitar'} onFechar={fecharFolha} titulo="Quitar saldo devedor?">
        <p className="texto-apoio">
          Isso marcará todas as <strong>{venda?.qtdParcelas - pagas} parcelas abertas</strong>{' '}
          como pagas no valor total de <strong>{moeda(saldo)}</strong>.
        </p>
        <div className={styles.botoesFolhaSecundarios}>
          {FORMAS_PAGAMENTO.map((f) => (
            <Botao key={f.id} onClick={() => quitarSaldo(f.id)}>
              {f.nome}
            </Botao>
          ))}
        </div>
      </FolhaInferior>

      {/* Folha de Cancelamento */}
      <FolhaInferior aberta={folha?.tipo === 'cancelar'} onFechar={fecharFolha} titulo="Tem certeza?">
        <p className="texto-apoio">
          O cancelamento é irreversível e o valor da venda não contará mais no faturamento. O saldo que já foi recebido
          ({moeda(venda?.valorPago)}) deve ser estornado manualmente ao cliente.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            confirmarCancelamento(e.target.motivo.value);
          }}
        >
          <textarea name="motivo" className={styles.textareaMotivo} rows={4} placeholder="Motivo do cancelamento..." required />
          <div className={styles.botoesFolhaSecundarios} style={{ marginTop: 16 }}>
            <Botao type="submit" variante="destrutivo">
              Cancelar venda
            </Botao>
            <Botao variante="secundario" onClick={fecharFolha}>
              Manter venda
            </Botao>
          </div>
        </form>
      </FolhaInferior>

      {/* Folha de Comprovante */}
      <FolhaInferior aberta={folha?.tipo === 'comprovante'} onFechar={fecharFolha} titulo="Gerar comprovante">
        <p className="texto-apoio">
          O comprovante conterá todos os detalhes desta venda, status das parcelas e um QR Code PIX para cobrança do
          saldo ({moeda(saldo)}).
        </p>
        {saldo > 0 && (
          <div className={styles.pix}>
            <p className={styles.pixTitulo}>CHAVE PIX CNPJ</p>
            <div className={styles.pixChave}>
              <strong>00.000.000/0001-00</strong>
              <button
                type="button"
                className={`${styles.pixBotaoCopiar} ${copiado ? styles.copiado : ''}`}
                onClick={copiarPix}
              >
                {copiado ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <p className="texto-apoio">
              Em breve esta chave e outras opções de pagamento poderão ser gerenciadas no seu Perfil.
            </p>
          </div>
        )}
        <div className={styles.botoesFolhaSecundarios} style={{ marginTop: 24 }}>
          <Botao onClick={gerarReciboPdf} disabled={gerandoPdf}>
            {gerandoPdf ? 'Gerando PDF...' : 'Gerar e Enviar PDF'}
          </Botao>
        </div>
      </FolhaInferior>
    </AppLayout>
  );
}
