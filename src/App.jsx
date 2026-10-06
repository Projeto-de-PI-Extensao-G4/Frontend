import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Painel from './pages/Painel/Painel';
import Clientes from './pages/Clientes/Clientes';
import ClienteForm from './pages/ClienteForm/ClienteForm';
import ClienteDetalhe from './pages/ClienteDetalhe/ClienteDetalhe';
import Produtos from './pages/Produtos/Produtos';
import ProdutoForm from './pages/ProdutoForm/ProdutoForm';
import Vendas from './pages/Vendas/Vendas';
import RegistrarVenda from './pages/RegistrarVenda/RegistrarVenda';
import SelecaoItens from './pages/SelecaoItens/SelecaoItens';
import VendaDetalhe from './pages/VendaDetalhe/VendaDetalhe';
import Extrato from './pages/Extrato/Extrato';
import Perfil from './pages/Perfil/Perfil';
import AlterarSenha from './pages/AlterarSenha/AlterarSenha';

// Rotas da FRONTEND_SPEC §2.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<ClienteForm />} />
        <Route path="/clientes/:id" element={<ClienteDetalhe />} />
        <Route path="/clientes/:id/editar" element={<ClienteForm />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/novo" element={<ProdutoForm />} />
        <Route path="/produtos/:id/editar" element={<ProdutoForm />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/vendas/nova" element={<RegistrarVenda />} />
        <Route path="/vendas/nova/itens" element={<SelecaoItens />} />
        <Route path="/vendas/:id" element={<VendaDetalhe />} />
        <Route path="/pagamentos" element={<Extrato />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/senha" element={<AlterarSenha />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
