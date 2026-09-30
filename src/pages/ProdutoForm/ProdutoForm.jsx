import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Campo from '../../components/Campo';
import Botao from '../../components/Botao';
import clipe from '../../assets/icons/clipe.svg';
import salvar from '../../assets/icons/salvar.svg';
import styles from './ProdutoForm.module.css';

const CATEGORIAS = ['Roupas', 'Mesa', 'Banho', 'Imóveis'];

const PRODUTO_MOCK = {
  nome: 'Jogo de Lençol Casal',
  categoria: 'Roupas',
  preco: '299,90',
  descricao: '',
};

export default function ProdutoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);
  const inicial = editando ? PRODUTO_MOCK : { nome: '', categoria: '', preco: '', descricao: '' };

  const [nome, setNome] = useState(inicial.nome);
  const [categoria, setCategoria] = useState(inicial.categoria);
  const [preco, setPreco] = useState(inicial.preco);
  const [descricao, setDescricao] = useState(inicial.descricao);
  const [previa, setPrevia] = useState(null);
  const [erroImagem, setErroImagem] = useState('');

  useEffect(() => () => previa && URL.revokeObjectURL(previa), [previa]);

  const escolherImagem = (e) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    if (!['image/png', 'image/jpeg'].includes(arquivo.type) || arquivo.size > 5 * 1024 * 1024) {
      setErroImagem('Use PNG ou JPG de até 5 MB.');
      return;
    }
    setErroImagem('');
    setPrevia(URL.createObjectURL(arquivo));
  };

  const enviar = (e) => {
    e.preventDefault();
    navigate('/produtos');
  };

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
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
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
          <Botao type="submit">
            <img src={salvar} width={18} height={18} alt="" />
            Salvar Produto
          </Botao>
          <Botao variante="secundario" onClick={() => navigate('/produtos')}>
            Cancelar
          </Botao>
        </div>
      </form>
    </AppLayout>
  );
}
