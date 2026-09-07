import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ClienteCadastro from "./ClienteCadastro";
import Clientes from "./Clientes";
import PainelVendas from "./PainelVendas";
import Produtos from "./Produtos";
import ListaVendas from "./ListaVendas";
import NovaVenda from "./NovaVenda";
import ParcelamentoVenda from "./ParcelamentoVenda";
import PerfilAjustes from "./PerfilAjustes";
import Pagamentos from "./Pagamentos";
import NovoProduto from "./NovoProduto";
import ProdutosDestaque from "./ProdutosDestaque";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 flex justify-center min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/painel" element={<PainelVendas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<ClienteCadastro />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/destaque" element={<ProdutosDestaque />} />
          <Route path="/produtos/novo" element={<NovoProduto />} />
          <Route path="/vendas" element={<ListaVendas />} />
          <Route path="/vendas/nova" element={<NovaVenda />} />
          <Route path="/vendas/parcelamento" element={<ParcelamentoVenda />} />
          <Route path="/pagamentos" element={<Pagamentos />} />
          <Route path="/mais" element={<PerfilAjustes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;