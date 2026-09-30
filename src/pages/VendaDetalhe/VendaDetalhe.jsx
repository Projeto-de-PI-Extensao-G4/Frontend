import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Botao from '../../components/Botao';
import { BadgeStatus } from '../../components/Badge';
import FolhaInferior from '../../components/FolhaInferior';
import calendarioPequeno from '../../assets/icons/calendario-pequeno.svg';
import parcelaPaga from '../../assets/icons/parcela-paga.svg';
import parcelaAberta from '../../assets/icons/parcela-aberta.svg';
import parcelaAguardando from '../../assets/icons/parcela-aguardando.svg';
import registrarPagamento from '../../assets/icons/registrar-pagamento.svg';
import registrarPagamentoInativo from '../../assets/icons/registrar-pagamento-inativo.svg';
import baixar from '../../assets/icons/baixar.svg';
import compartilharHeader from '../../assets/icons/compartilhar-header.svg';
import styles from './VendaDetalhe.module.css';

const HOJE = '2023-12-20';
const FORMAS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'PIX', 'Boleto', 'Cheque'];
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// Valores em centavos para a soma do saldo não acumular erro de ponto flutuante.
const VENDA_INICIAL = {
  clienteNome: 'Ana Beatriz Silva',
  dataVenda: '2023-10-12T15:40:00',
  valorTotal: 125000,
  status: 'PENDENTE',
  motivoCancelamento: null,
  parcelas: [
    { id: 1, numero: 1, valor: 31250, vencimento: '2023-11-12', paga: true, forma: 'PIX' },
    { id: 2, numero: 2, valor: 31250, vencimento: '2023-12-12', paga: false, forma: null },
    { id: 3, numero: 3, valor: 31250, vencimento: '2024-01-12', paga: false, forma: null },
    { id: 4, numero: 4, valor: 31250, vencimento: '2024-02-12', paga: false, forma: null },
  ],
};

const moeda = (centavos) => (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Sem Date: evita o deslocamento de fuso (spec §3.1).
function formatarData(iso) {
  const [ano, mes, dia] = iso.slice(0, 10).split('-');
  return `${dia} ${MESES[Number(mes) - 1]}, ${ano}`;
}

// statusExibicao: PAGA | VENCIDA | ABERTA (a próxima a vencer) | AGUARDANDO (futuras).
function comStatusExibicao(parcelas) {
  let achouAberta = false;
  return parcelas.map((p) => {
    if (p.paga) return { ...p, statusExibicao: 'PAGA' };
    if (p.vencimento < HOJE) return { ...p, statusExibicao: 'VENCIDA' };
    if (!achouAberta) {
      achouAberta = true;
      return { ...p, statusExibicao: 'ABERTA' };
    }
    return { ...p, statusExibicao: 'AGUARDANDO' };
  });
}

const ICONE_STATUS = {
  PAGA: { src: parcelaPaga, classe: 'iconePaga' },
  VENCIDA: { src: parcelaAberta, classe: 'iconeVencida' },
  ABERTA: { src: parcelaAberta, classe: 'iconeAberta' },
  AGUARDANDO: { src: parcelaAguardando, classe: 'iconeAguardando' },
};

export default function VendaDetalhe() {
  const { id } = useParams();
  const [venda, setVenda] = useState(VENDA_INICIAL);
  const [folha, setFolha] = useState(null); // { tipo: 'pagar' | 'quitar' | 'cancelar', parcelaId? }

  const parcelas = comStatusExibicao(venda.parcelas);
  const pagas = parcelas.filter((p) => p.paga).length;
  const saldo = parcelas.filter((p) => !p.paga).reduce((soma, p) => soma + p.valor, 0);
  const cancelada = venda.status === 'CANCELADA';
  const fecharFolha = () => setFolha(null);

  const pagarParcela = (parcelaId, forma) => {
    setVenda((v) => {
      const parcelasNovas = v.parcelas.map((p) => (p.id === parcelaId ? { ...p, paga: true, forma } : p));
      return { ...v, parcelas: parcelasNovas, status: parcelasNovas.every((p) => p.paga) ? 'PAGA' : v.status };
    });
    fecharFolha();
  };

  const quitarTodas = (forma) => {
    setVenda((v) => ({
      ...v,
      status: 'PAGA',
      parcelas: v.parcelas.map((p) => (p.paga ? p : { ...p, paga: true, forma })),
    }));
    fecharFolha();
  };

  const cancelarVenda = (motivo) => {
    setVenda((v) => ({ ...v, status: 'CANCELADA', motivoCancelamento: motivo }));
    fecharFolha();
  };

  const compartilhar = () => {
    const texto =
      `Comprovante de venda #${id}\nCliente: ${venda.clienteNome}\n` +
      `Total: ${moeda(venda.valorTotal)}\nParcelas pagas: ${pagas}/${parcelas.length}\n` +
      `Saldo devedor: ${moeda(saldo)}`;
    if (navigator.share) {
      navigator.share({ text: texto }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    }
  };

  const botaoCompartilhar = (
    <button type="button" className={styles.botaoHeader} aria-label="Compartilhar" onClick={compartilhar}>
      <img src={compartilharHeader} width={18} height={20} alt="" />
    </button>
  );

  const parcelaDaFolha = folha?.tipo === 'pagar' ? parcelas.find((p) => p.id === folha.parcelaId) : null;

  return (
    <AppLayout cabecalho={{ titulo: `Venda #${id}`, esquerda: 'voltar', direita: botaoCompartilhar }}>
      <section className={styles.identidade}>
        <div className={styles.linhaIdentidade}>
          <div className={styles.bloco}>
            <span className={styles.rotuloMaiusculo}>Cliente</span>
            <strong className={styles.destaque}>{venda.clienteNome}</strong>
          </div>
          <div className={`${styles.bloco} ${styles.blocoDireita}`}>
            <span className={styles.rotuloMaiusculo}>Total</span>
            <strong className={styles.destaque}>{moeda(venda.valorTotal)}</strong>
          </div>
        </div>
        <div className={styles.dataVenda}>
          <img src={calendarioPequeno} width={9} height={10} alt="" />
          Realizada em {formatarData(venda.dataVenda)}
        </div>
        {cancelada && (
          <div className={styles.cancelamento}>
            <BadgeStatus status="CANCELADA" />
            <p>Motivo: {venda.motivoCancelamento}</p>
          </div>
        )}
      </section>

      <section className={styles.estatisticas} aria-label="Situação da venda">
        <div className={styles.estatistica}>
          <span className={styles.estatisticaRotulo}>Parcelas Pagas</span>
          <strong className={styles.estatisticaValor}>
            {pagas} / {parcelas.length}
          </strong>
        </div>
        <div className={styles.estatistica}>
          <span className={styles.estatisticaRotulo}>Saldo Devedor</span>
          <strong className={`${styles.estatisticaValor} ${styles.saldo}`}>{moeda(cancelada ? 0 : saldo)}</strong>
        </div>
      </section>

      <section className={styles.parcelas}>
        <div className={styles.cabecalhoParcelas}>
          <h2 className={styles.tituloParcelas}>Resumo do Parcelamento</h2>
          <span className="rotulo-secao">{parcelas.length}x sem juros</span>
        </div>

        <div className={styles.listaParcelas}>
          {parcelas.map((p) => {
            const icone = ICONE_STATUS[p.statusExibicao];
            const podePagar = !p.paga && !cancelada;
            const futura = p.statusExibicao === 'AGUARDANDO';
            return (
              <article key={p.id} className={`${styles.parcela} ${futura ? styles.parcelaFutura : ''}`}>
                <div className={styles.parcelaTopo}>
                  <div className={styles.parcelaInfo}>
                    <span className={`${styles.icone} ${styles[icone.classe]}`}>
                      <img src={icone.src} width={20} height={20} alt="" />
                    </span>
                    <div>
                      <h3 className={styles.parcelaNome}>
                        Parcela {p.numero}/{parcelas.length}
                      </h3>
                      <p className={styles.parcelaVencimento}>Vencimento: {formatarData(p.vencimento)}</p>
                    </div>
                  </div>
                  <div className={styles.parcelaValor}>
                    <strong>{moeda(p.valor)}</strong>
                    <BadgeStatus status={p.statusExibicao} />
                  </div>
                </div>
                {podePagar && (
                  <button
                    type="button"
                    className={`${styles.registrar} ${futura ? styles.registrarSuave : ''}`}
                    onClick={() => setFolha({ tipo: 'pagar', parcelaId: p.id })}
                  >
                    <img
                      src={futura ? registrarPagamentoInativo : registrarPagamento}
                      width={16.5}
                      height={12}
                      alt=""
                    />
                    Registrar Pagamento
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {!cancelada && (
        <section className={styles.acoes}>
          {saldo > 0 && (
            <Botao variante="secundario" onClick={() => setFolha({ tipo: 'quitar' })}>
              Quitar todas as parcelas
            </Botao>
          )}
          <button type="button" className={styles.cancelar} onClick={() => setFolha({ tipo: 'cancelar' })}>
            Cancelar venda
          </button>
        </section>
      )}

      <section className={styles.comprovante}>
        <h3 className={styles.comprovanteTitulo}>Comprovante de Venda</h3>
        <p className={styles.comprovanteTexto}>
          Monte o comprovante da venda e compartilhe pelo WhatsApp ou outro app.
        </p>
        <button type="button" className={styles.compartilhar} onClick={compartilhar}>
          <img src={baixar} width={12} height={12} alt="" />
          Compartilhar
        </button>
      </section>

      <FolhaInferior
        aberta={folha?.tipo === 'pagar' || folha?.tipo === 'quitar'}
        onFechar={fecharFolha}
        titulo={folha?.tipo === 'quitar' ? 'Quitar todas as parcelas' : 'Registrar Pagamento'}
      >
        <SelecaoForma
          resumo={
            folha?.tipo === 'quitar'
              ? `Saldo devedor de ${moeda(saldo)}`
              : parcelaDaFolha && `Parcela ${parcelaDaFolha.numero}/${parcelas.length} · ${moeda(parcelaDaFolha.valor)}`
          }
          rotuloConfirmar={folha?.tipo === 'quitar' ? 'Quitar parcelas' : 'Confirmar pagamento'}
          onConfirmar={(forma) => (folha.tipo === 'quitar' ? quitarTodas(forma) : pagarParcela(folha.parcelaId, forma))}
        />
      </FolhaInferior>

      <FolhaInferior aberta={folha?.tipo === 'cancelar'} onFechar={fecharFolha} titulo="Cancelar venda">
        <FormularioCancelamento onConfirmar={cancelarVenda} onVoltar={fecharFolha} />
      </FolhaInferior>
    </AppLayout>
  );
}

function SelecaoForma({ resumo, rotuloConfirmar, onConfirmar }) {
  const [forma, setForma] = useState(null);

  return (
    <>
      {resumo && <p className="texto-apoio">{resumo}</p>}
      <div className={styles.formas} role="radiogroup" aria-label="Forma de pagamento">
        {FORMAS.map((f) => (
          <button
            key={f}
            type="button"
            role="radio"
            aria-checked={forma === f}
            className={`${styles.forma} ${forma === f ? styles.formaAtiva : ''}`}
            onClick={() => setForma(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <Botao disabled={!forma} onClick={() => onConfirmar(forma)}>
        {rotuloConfirmar}
      </Botao>
    </>
  );
}

function FormularioCancelamento({ onConfirmar, onVoltar }) {
  const [motivo, setMotivo] = useState('');
  const [tocado, setTocado] = useState(false);
  const tamanho = motivo.trim().length;
  const valido = tamanho >= 5 && tamanho <= 255;

  const confirmar = () => {
    setTocado(true);
    if (valido) onConfirmar(motivo.trim());
  };

  return (
    <>
      <p className="texto-apoio">
        A venda será marcada como cancelada e não poderá mais receber pagamentos. Informe o motivo.
      </p>
      <div className={styles.motivo}>
        <label htmlFor="motivo-cancelamento" className={styles.motivoRotulo}>
          Motivo do cancelamento
        </label>
        <textarea
          id="motivo-cancelamento"
          className={`${styles.motivoCampo} ${tocado && !valido ? styles.motivoErro : ''}`}
          rows={4}
          maxLength={255}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          onBlur={() => setTocado(true)}
        />
        <div className={styles.motivoRodape}>
          <span className={styles.motivoMensagem}>{tocado && !valido ? 'Informe de 5 a 255 caracteres.' : ''}</span>
          <span className="texto-apoio">{motivo.length}/255</span>
        </div>
      </div>
      <Botao onClick={confirmar} className={styles.confirmarCancelamento}>
        Confirmar cancelamento
      </Botao>
      <Botao variante="secundario" onClick={onVoltar}>
        Voltar
      </Botao>
    </>
  );
}
