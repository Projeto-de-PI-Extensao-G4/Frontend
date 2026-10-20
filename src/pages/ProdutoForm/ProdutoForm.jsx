import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Campo from '../../components/Campo';
import Botao from '../../components/Botao';
import clipe from '../../assets/icons/clipe.svg';
import salvar from '../../assets/icons/salvar.svg';
import styles from './ProdutoForm.module.css';

import { 
  buscarProduto, 
  cadastrarProduto, 
  atualizarProduto, 
  listarCategorias 
} from '../../services/produtos';
import { enviarArquivo, chaveDaUrl } from '../../services/arquivos';

const formatarPrecoParaInput = (valor) => {
  if (!valor && valor !== 0) return '';
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const parsePrecoParaNumero = (str) => {
  if (!str) return 0;
  const limpo = str.replace(/[^\d,-]/g, '').replace(',', '.');
  return parseFloat(limpo) || 0;
};

export default function ProdutoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [previa, setPrevia] = useState(null);
  const [arquivoNovo, setArquivoNovo] = useState(null);
  const [chaveAtual, setChaveAtual] = useState(null);
  const [erroImagem, setErroImagem] = useState('');
  
  const [categoriasLista, setCategoriasLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true);
      try {
        const cat = await listarCategorias();
        setCategoriasLista(cat || []);

        if (editando) {
          const prod = await buscarProduto(id);
          setNome(prod.nome);
          setCategoria(prod.categoria?.id || '');
          setPreco(formatarPrecoParaInput(prod.precoVenda));
          setDescricao(prod.descricao || '');
          if (prod.imagemUrl) {
            setPrevia(prod.imagemUrl);
            setChaveAtual(chaveDaUrl(prod.imagemUrl));
          }
        }
      } catch (err) {
        setErro('Erro ao carregar os dados.');
      } finally {
        setCarregando(false);
      }
    };
    
    carregar();
  }, [id, editando]);

  useEffect(() => () => {
    if (previa && previa.startsWith('blob:')) URL.revokeObjectURL(previa);
  }, [previa]);

  const escolherImagem = (e) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    if (!['image/png', 'image/jpeg'].includes(arquivo.type) || arquivo.size > 5 * 1024 * 1024) {
      setErroImagem('Use PNG ou JPG de até 5 MB.');
      return;
    }
    setErroImagem('');
    setArquivoNovo(arquivo);
    setPrevia(URL.createObjectURL(arquivo));
  };

  const enviar = async (e) => {
    e.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      // Imagem nova sobe antes, por POST /arquivos; o produto so guarda a chave.
      // Sem imagem nova, a edicao reenvia a chave que ja existia.
      const imagemChave = arquivoNovo
        ? await enviarArquivo(arquivoNovo, 'produtos')
        : chaveAtual;

      const payload = {
        nome,
        categoriaId: Number(categoria),
        precoVenda: parsePrecoParaNumero(preco),
        descricao,
        imagemChave
      };

      if (editando) {
        await atualizarProduto(id, payload);
      } else {
        await cadastrarProduto(payload);
      }
      navigate('/produtos');
    } catch (err) {
      setErro(err?.response?.data?.mensagem || 'Erro ao salvar o produto.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <AppLayout cabecalho={{ titulo: editando ? 'Editar Produto' : 'Novo Produto', esquerda: 'voltar' }} semBarra>
        <p className="texto-apoio" style={{padding: '20px'}}>Carregando...</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      cabecalho={{ titulo: editando ? 'Editar Produto' : 'Novo Produto', esquerda: 'voltar' }}
      semBarra
    >
      <p className="texto-apoio">
        {editando
          ? 'Altere os dados abaixo para atualizar o item.'
          : 'Preencha os dados abaixo para cadastrar um novo item ao inventário.'}
      </p>

      <form className={styles.formulario} onSubmit={enviar}>
        {erro && <div style={{color: 'red'}}>{erro}</div>}
        
        <Campo
          id="produto-nome"
          rotulo="Nome do Produto"
          placeholder="Ex: Jogo de Lençol Casal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          minLength={2}
          maxLength={150}
          required
        />

        <Campo id="produto-categoria" rotulo="Categoria" seletor>
          <select
            id="produto-categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="" disabled>Selecione...</option>
            {categoriasLista.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </Campo>

        <Campo id="produto-preco" rotulo="Preço de venda">
          <span className={styles.prefixo}>R$</span>
          <input
            id="produto-preco"
            inputMode="decimal"
            placeholder="0,00"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </Campo>

        <div className={styles.grupo}>
          <label htmlFor="produto-descricao" className={styles.rotulo}>
            Descrição <span className={styles.opcional}>(opcional)</span>
          </label>
          <textarea
            id="produto-descricao"
            className={styles.textarea}
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className={styles.grupo}>
          <span className={styles.rotulo}>
            Imagem <span className={styles.opcional}>(opcional)</span>
          </span>
          <label className={styles.anexo}>
            <input type="file" accept="image/png,image/jpeg" className="sr-only" onChange={escolherImagem} />
            {previa ? (
              <img src={previa} alt="Prévia da imagem" className={styles.previa} />
            ) : (
              <>
                <img src={clipe} width={14.41} height={24} alt="" />
                <span className={styles.anexoTitulo}>Clique para anexar imagem</span>
                <span className={styles.anexoApoio}>PNG ou JPG (Máx. 5MB)</span>
              </>
            )}
          </label>
          {erroImagem && <p className={styles.erro}>{erroImagem}</p>}
        </div>

        <div className={styles.acoes}>
          <Botao type="submit" disabled={salvando}>
            <img src={salvar} width={18} height={18} alt="" />
            {salvando ? 'Salvando...' : 'Salvar Produto'}
          </Botao>
          <Botao variante="secundario" onClick={() => navigate('/produtos')} disabled={salvando}>
            Cancelar
          </Botao>
        </div>
      </form>
    </AppLayout>
  );
}
