import { useState } from "react";
import Loader from "../Loader/Loader";
import { PopupMessage } from "../PopUp/PopupMessage";

export default function CriarProduto() {

  //Informacoes do produto
  const [nome, setNome] = useState<string>();
  const [descricao, setDescricao] = useState<string>();
  const [preco, setPreco] = useState<string>();
  const [imagem, setImagem] = useState<string>();

  //Mensagens e loader
  const [load, setLoad] = useState(false)
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()

  const salvarNoBanco = async (e: React.FormEvent) => {
    setLoad(true)
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      nome: nome,
      preco: preco,
      descricao: descricao,
      imagem: imagem,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:3000/product/criarproduto", requestOptions)
      .then((response) => response.text())
      .then(() => {
        setMessage('Produto cadastrado com sucesso!')
      })
      .catch((error) => {
        setMessage(error)
      })
        .finally(() => {
          setLoad(false)
          setShowMessage(true)
        })
  };

  return (
    <>
    {
      showMessage && (
        <PopupMessage mensagem={message} />
      )
    }
    <form className="form" onSubmit={(e) => salvarNoBanco(e)}>
    <h2>Cadastro de Produto</h2>
        <label htmlFor="nome">Nome do Produto:</label>
        <input onChange={(e) => setNome(e.target.value)} type="text" id="nome" name="nome" required/>
        
        <label htmlFor="preco">Preço:</label>
        <input onChange={(e) => setPreco(e.target.value)} type="number" id="preco" name="preco" step="0.01" required/>
        
        <label htmlFor="descricao">Descrição:</label>
        <textarea onChange={(e) => setDescricao(e.target.value)} id="descricao" name="descricao" required></textarea>
        
        <label htmlFor="foto">Link da Foto do Produto:</label>
        <input onChange={(e) => setImagem(e.target.value)} type="text" id="imagem" name="imagem" required/>
        {
          load && (
            <Loader />
          )
        }
        {
          !load && (
            <button className="btn btn-sobre" style={{width: '100%'}} type="submit">Cadastrar</button>
          )
        }
    </form>
    </>
  );
}
