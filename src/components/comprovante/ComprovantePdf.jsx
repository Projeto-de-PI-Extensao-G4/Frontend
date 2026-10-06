import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import fonte400 from '../../assets/fonts/plus-jakarta-sans-400.ttf?url';
import fonte600 from '../../assets/fonts/plus-jakarta-sans-600.ttf?url';
import fonte700 from '../../assets/fonts/plus-jakarta-sans-700.ttf?url';
import fonte800 from '../../assets/fonts/plus-jakarta-sans-800.ttf?url';

// Comprovante em PDF (A5) no visual aprovado. Recebe a venda no formato de GET /vendas/{id}:
// { id, clienteNome, dataVenda, statusVendaSituacao, motivoCancelamento, valorTotal, valorPago,
//   valorRestante, itens[{ produtoNome, quantidade, precoUnitario, subtotal }],
//   parcelas[{ numeroParcela, dataVencimento, valorParcela, statusExibicao, dataPagamento, formaPagamentoNome }] }

Font.register({
  family: 'Jakarta',
  fonts: [
    { src: fonte400, fontWeight: 400 },
    { src: fonte600, fontWeight: 600 },
    { src: fonte700, fontWeight: 700 },
    { src: fonte800, fontWeight: 800 },
  ],
});
// Sem hifenização: nome de cliente e de produto não podem ser quebrados com hífen.
Font.registerHyphenationCallback((palavra) => [palavra]);

const COR = {
  texto: '#1a1c1c',
  secundario: '#444748',
  apagado: '#6b7280',
  borda: '#c4c7c7',
  linha: '#eeeeee',
};

const BADGE = {
  PAGA: { color: '#15803d', backgroundColor: '#dcfce7' },
  VENCIDA: { color: '#93000a', backgroundColor: '#ffdad6' },
  CANCELADA: { color: '#93000a', backgroundColor: '#ffdad6' },
  ABERTA: { color: COR.secundario, backgroundColor: '#e8e8e8' },
  AGUARDANDO: { color: COR.secundario, backgroundColor: '#e8e8e8' },
};

const FORMA = {
  DINHEIRO: 'Dinheiro',
  CARTAO_CREDITO: 'Cartão de crédito',
  CARTAO_DEBITO: 'Cartão de débito',
  PIX: 'PIX',
  BOLETO: 'Boleto',
  CHEQUE: 'Cheque',
};

const reais = (v) =>
  'R$ ' + (v ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Só a parte da data, sem Date: evita o deslocamento de fuso.
const data = (iso) => {
  if (!iso) return '—';
  const [ano, mes, dia] = iso.slice(0, 10).split('-');
  return `${dia}/${mes}/${ano}`;
};

const hoje = () => {
  const d = new Date();
  const dois = (n) => String(n).padStart(2, '0');
  return `${dois(d.getDate())}/${dois(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const s = StyleSheet.create({
  pagina: {
    paddingTop: 40,
    paddingBottom: 56,
    paddingHorizontal: 34,
    fontFamily: 'Jakarta',
    fontSize: 10.5,
    color: COR.texto,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 7.5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#000',
  },
  marca: { fontSize: 16, fontWeight: 800, letterSpacing: -0.2 },
  rotulo: {
    fontSize: 7.5,
    fontWeight: 600,
    letterSpacing: 0.45,
    textTransform: 'uppercase',
    color: COR.secundario,
  },
  numero: { fontSize: 13, fontWeight: 700, textAlign: 'right' },
  dados: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10.5 },
  destaque: { fontSize: 11.5, fontWeight: 700, marginTop: 1.5 },
  cancelamento: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  resumo: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  caixa: {
    flex: 1,
    borderWidth: 0.75,
    borderColor: COR.borda,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 7.5,
  },
  caixaEscura: { backgroundColor: '#000', borderColor: '#000' },
  valorCaixa: { fontSize: 12.5, fontWeight: 700, marginTop: 1.5 },
  secao: { marginTop: 12, marginBottom: 4.5 },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: COR.linha,
  },
  cabecalhoTabela: { borderBottomColor: COR.borda, paddingVertical: 4.5 },
  total: { borderBottomWidth: 0, paddingTop: 7, fontWeight: 700 },
  direita: { textAlign: 'right' },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 4.5,
    paddingVertical: 1,
    borderRadius: 3,
    fontSize: 7,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  rodape: {
    position: 'absolute',
    bottom: 28,
    left: 34,
    right: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 0.75,
    borderTopColor: COR.borda,
    fontSize: 7.5,
    color: COR.apagado,
  },
});

// Larguras das colunas (o resto fica com a coluna flex).
const COL_ITENS = { qtd: 34, unitario: 62, subtotal: 66 };
const COL_PARCELAS = { numero: 18, vencimento: 62, valor: 56, situacao: 74 };

function Badge({ status }) {
  return <Text style={[s.badge, BADGE[status] ?? BADGE.AGUARDANDO]}>{status}</Text>;
}

export default function ComprovantePdf({ venda }) {
  const cancelada = venda.statusVendaSituacao === 'CANCELADA';
  const restante = cancelada ? 0 : venda.valorRestante;

  return (
    <Document title={`Comprovante da venda #${venda.id}`} author="Cris Utilidades" language="pt-BR">
      <Page size="A5" style={s.pagina}>
        <View style={s.topo}>
          <Text style={s.marca}>Cris Utilidades</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.rotulo}>Comprovante de venda</Text>
            <Text style={s.numero}>#{venda.id}</Text>
          </View>
        </View>

        <View style={s.dados}>
          <View>
            <Text style={s.rotulo}>Cliente</Text>
            <Text style={s.destaque}>{venda.clienteNome}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.rotulo}>Data da venda</Text>
            <Text style={[s.destaque, s.direita]}>{data(venda.dataVenda)}</Text>
          </View>
        </View>

        {cancelada && (
          <View style={s.cancelamento}>
            <Badge status="CANCELADA" />
            <Text style={{ fontSize: 8.5, color: COR.secundario }}>
              {venda.motivoCancelamento ? `Motivo: ${venda.motivoCancelamento}` : 'Venda cancelada'}
            </Text>
          </View>
        )}

        <View style={s.resumo}>
          <View style={s.caixa}>
            <Text style={s.rotulo}>Total</Text>
            <Text style={s.valorCaixa}>{reais(venda.valorTotal)}</Text>
          </View>
          <View style={s.caixa}>
            <Text style={s.rotulo}>Pago</Text>
            <Text style={s.valorCaixa}>{reais(venda.valorPago)}</Text>
          </View>
          <View style={[s.caixa, s.caixaEscura]}>
            <Text style={[s.rotulo, { color: COR.borda }]}>Restante</Text>
            <Text style={[s.valorCaixa, { color: '#fff' }]}>{reais(restante)}</Text>
          </View>
        </View>

        <Text style={[s.rotulo, s.secao]}>Itens</Text>
        <View style={[s.linha, s.cabecalhoTabela]}>
          <Text style={[s.rotulo, { flex: 1 }]}>Produto</Text>
          <Text style={[s.rotulo, s.direita, { width: COL_ITENS.qtd }]}>Qtd.</Text>
          <Text style={[s.rotulo, s.direita, { width: COL_ITENS.unitario }]}>Unitário</Text>
          <Text style={[s.rotulo, s.direita, { width: COL_ITENS.subtotal }]}>Subtotal</Text>
        </View>
        {venda.itens.map((item, i) => (
          <View key={i} style={s.linha} wrap={false}>
            <Text style={{ flex: 1 }}>{item.produtoNome}</Text>
            <Text style={[s.direita, { width: COL_ITENS.qtd }]}>{item.quantidade}</Text>
            <Text style={[s.direita, { width: COL_ITENS.unitario }]}>{reais(item.precoUnitario)}</Text>
            <Text style={[s.direita, { width: COL_ITENS.subtotal }]}>{reais(item.subtotal)}</Text>
          </View>
        ))}
        <View style={[s.linha, s.total]} wrap={false}>
          <Text style={{ flex: 1 }}>Total</Text>
          <Text style={s.direita}>{reais(venda.valorTotal)}</Text>
        </View>

        <Text style={[s.rotulo, s.secao]} minPresenceAhead={60}>
          Parcelas — {venda.parcelas.length}x
        </Text>
        <View style={[s.linha, s.cabecalhoTabela]}>
          <Text style={[s.rotulo, { width: COL_PARCELAS.numero }]}>Nº</Text>
          <Text style={[s.rotulo, { width: COL_PARCELAS.vencimento }]}>Vencimento</Text>
          <Text style={[s.rotulo, s.direita, { width: COL_PARCELAS.valor }]}>Valor</Text>
          <Text style={[s.rotulo, { width: COL_PARCELAS.situacao, paddingLeft: 8 }]}>Situação</Text>
          <Text style={[s.rotulo, { flex: 1 }]}>Pago em</Text>
        </View>
        {venda.parcelas.map((p) => {
          // Venda cancelada: parcela em aberto não é mais cobrada.
          const status = cancelada && !p.dataPagamento ? 'CANCELADA' : p.statusExibicao;
          const pagoEm = p.dataPagamento
            ? `${data(p.dataPagamento)} · ${FORMA[p.formaPagamentoNome] ?? p.formaPagamentoNome ?? ''}`
            : '—';
          return (
            <View key={p.numeroParcela} style={s.linha} wrap={false}>
              <Text style={{ width: COL_PARCELAS.numero }}>{p.numeroParcela}</Text>
              <Text style={{ width: COL_PARCELAS.vencimento }}>{data(p.dataVencimento)}</Text>
              <Text style={[s.direita, { width: COL_PARCELAS.valor }]}>{reais(p.valorParcela)}</Text>
              <View style={{ width: COL_PARCELAS.situacao, paddingLeft: 8 }}>
                <Badge status={status} />
              </View>
              <Text style={{ flex: 1 }}>{pagoEm}</Text>
            </View>
          );
        })}

        <View style={s.rodape} fixed>
          <Text>Documento sem valor fiscal. Emitido em {hoje()}.</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              totalPages > 1 ? `Cris Utilidades · ${pageNumber}/${totalPages}` : 'Cris Utilidades'
            }
          />
        </View>
      </Page>
    </Document>
  );
}
