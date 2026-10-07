import { createContext, useContext, useState } from 'react';

const VendaContext = createContext();

export function VendaProvider({ children }) {
  const [cliente, setCliente] = useState(null);
  const [itens, setItens] = useState([]);
  const [formaPagamentoId, setFormaPagamentoId] = useState('');
  const [parcelas, setParcelas] = useState(1);
  const [vencimento, setVencimento] = useState('');

  const adicionarItem = (produto, quantidade) => {
    setItens(atual => {
      const index = atual.findIndex(i => i.produtoId === produto.id);
      if (quantidade === 0) {
        return atual.filter(i => i.produtoId !== produto.id);
      }
      if (index >= 0) {
        const novaLista = [...atual];
        novaLista[index] = { ...novaLista[index], quantidade };
        return novaLista;
      }
      return [...atual, { 
        produtoId: produto.id, 
        nome: produto.nome,
        categoria: produto.categoria?.nome || '',
        preco: produto.precoVenda,
        quantidade 
      }];
    });
  };

  const limparVenda = () => {
    setCliente(null);
    setItens([]);
    setFormaPagamentoId('');
    setParcelas(1);
    setVencimento('');
  };

  return (
    <VendaContext.Provider value={{
      cliente, setCliente,
      itens, adicionarItem,
      formaPagamentoId, setFormaPagamentoId,
      parcelas, setParcelas,
      vencimento, setVencimento,
      limparVenda
    }}>
      {children}
    </VendaContext.Provider>
  );
}

export const useVenda = () => useContext(VendaContext);
