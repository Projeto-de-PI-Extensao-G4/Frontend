import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Login";
import ClienteCadastro from "./ClienteCadastro";
import ClienteDetalhe from "./ClienteDetalhe";
import ClienteEdicao from "./ClienteEdicao";
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
      <AuthProvider>
        <div className="bg-gray-100 flex justify-center min-h-screen">
          <Routes>
            <Route path="/" element={<Login />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/painel" element={<PainelVendas />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/novo" element={<ClienteCadastro />} />
              <Route path="/clientes/:id" element={<ClienteDetalhe />} />
              <Route path="/clientes/:id/editar" element={<ClienteEdicao />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/produtos/destaque" element={<ProdutosDestaque />} />
              <Route path="/produtos/novo" element={<NovoProduto />} />
              <Route path="/vendas" element={<ListaVendas />} />
              <Route path="/vendas/nova" element={<NovaVenda />} />
              <Route path="/vendas/parcelamento" element={<ParcelamentoVenda />} />
              <Route path="/pagamentos" element={<Pagamentos />} />
              <Route path="/mais" element={<PerfilAjustes />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;