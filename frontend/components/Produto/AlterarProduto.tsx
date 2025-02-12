import { useEffect, useState } from "react";
import { Edit } from "../Button/Edit";
import Loader from "../Loader/Loader";
import { PopupMessage } from "../PopUp/PopupMessage";

interface Product {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  descricao: string;
  message?: string; //Caso erro
}
export function AlterarProduto({
  produto,
  funcDelete,
  funcEditar,
}: {
  produto: Product | undefined;
  funcDelete: ({idProduct}: {idProduct: number}) => void;
  funcEditar: ({ novoProduto }: { novoProduto: Product }) => void;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);

  // Estados para os campos do formulário
  const [id, setId] = useState<number>(0);
  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [imagem, setImagem] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false)

  useEffect(() => {
    if (produto) {
      setId(produto.id);
      setNome(produto.nome);
      setPreco(produto.preco);
      setImagem(produto.imagem);
      setDesc(produto.descricao);
    }
  }, [id]);

  //Função para editar o produto
  const editarProduto = async () => {
    setLoad(true)
    await funcEditar(
      {novoProduto: {
        id: id,
        nome: nome,
        preco: preco,
        imagem: imagem,
        descricao: desc
      }}
    );
    setLoad(false)
  };
  //Funcao para excluir o produto
  const excluirProduto = async () => {
    setLoad(true)
    await funcDelete({idProduct: id})
    setLoad(false)
  }

  //Mostrar o prop
  const showProp = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <Edit funcDelete={excluirProduto} showProp={showProp} />
      {isActive && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
              userSelect: "none",
            }}
          ></div>
          <form
            className="form"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translate(-50%, -50%)",
              left: "50%",
              zIndex: "9999",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>Alteração de produto</h2>
            <label htmlFor="nome">Nome do Produto:</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              type="text"
              id="nome"
              name="nome"
              required
            />

            <label htmlFor="preco">Preço:</label>
            <input
              value={preco}
              onChange={(e) => setPreco(Number(e.target.value))}
              type="string"
              id="preco"
              name="preco"
              step="0.01"
              required
            />

            <label htmlFor="descricao">Descrição:</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id="descricao"
              name="descricao"
              required
            ></textarea>

            <label htmlFor="foto">Link da Foto do Produto:</label>
            <input
              type="text"
              onChange={(e) => setImagem(e.target.value)}
              id="imagem"
              name="imagem"
              required
              value={imagem}
            />

            {load && <Loader />}
            {!load && (
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <button
                  className="btn btn-sobre"
                  style={{ width: "100%" }}
                  onClick={editarProduto}
                >
                  Atualizar produto
                </button>
                <button
                  onClick={showProp}
                  className="btn"
                  style={{
                    width: "50%",
                    color: "white",
                    backgroundColor: "red",
                  }}
                >
                  Close
                </button>
              </span>
            )}
          </form>
        </>
      )}
    </>
  );
}
