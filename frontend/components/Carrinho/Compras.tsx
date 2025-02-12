import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  descricao: string;
  quantidade: number;
}

export default function Compras() {
  const [itensCarrinho, setItensCarrinho] = useState<Product[]>([]);
    const [metodo, setMetodo] = useState("");
  const router = useRouter()

  useEffect(() => {
    const pegarCarrinho = getCookie("carrinho");
    const items = JSON.parse(pegarCarrinho as string) || [];

    // Garantir que cada item tenha uma quantidade inicial de 1, se não tiver
    const itensComQuantidade = items.map((item: Product) => ({
      ...item,
      quantidade: item.quantidade || 1,
    }));
    setItensCarrinho(itensComQuantidade);
  }, []);

  const atualizarCarrinho = (newItems: Product[]) => {
    setItensCarrinho(newItems);
    setCookie("carrinho", JSON.stringify(newItems));
  };

  const incrementarQuantidade = (id: number) => {
    const newItems = itensCarrinho.map((item) => {
      if (item.id === id) {
        item.quantidade += 1;
      }
      return item;
    });
    atualizarCarrinho(newItems);
  };

  const decrementarQuantidade = (id: number) => {
    const newItems = itensCarrinho.map((item) => {
      if (item.id === id && item.quantidade > 1) {
        item.quantidade -= 1;
      }
      return item;
    });
    atualizarCarrinho(newItems);
  };

  const calcularTotal = () => {
    return itensCarrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  const verificarCookie = async () => {
    await itensCarrinho.map(async (item) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        quantidadeProdutos: item.quantidade,
        nomeProduto: item.nome,
        precoUnitario: item.preco,
        totalCompra: (item.quantidade * item.preco).toFixed(2),
        tipoPagamento: metodo
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

       await fetch("http://localhost:3000/compras/salvarcompras", requestOptions)
        .then((response) => response.text())
        .then(() => {})
        .catch(() => {});
    });
    deleteCookie("carrinho")
    router.push('/')
  };
  return (
    <div className="cart">
      <h2>Itens no Carrinho</h2>

      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {itensCarrinho.map((item) => (
            <tr key={item.id}>
              <td style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Image
                  src={item.imagem}
                  alt="imagem do produto"
                  width={50}
                  height={50}
                />
                <p>{item.nome}</p>
              </td>
              <td>R$ {item.preco}</td>
              <td>
                <button onClick={() => decrementarQuantidade(item.id)}>
                  -
                </button>
                {item.quantidade}
                <button onClick={() => incrementarQuantidade(item.id)}>
                  +
                </button>
              </td>
              <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        <p>Total: R$ {calcularTotal().toFixed(2)}</p>
      </div>
      {/* Tipo de pagamento */}
      <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "2px 2px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Selecione a Forma de Pagamento</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="radio"
            name="pagamento"
            value="pix"
            onChange={(e) => setMetodo(e.target.value)}
          />
          Pix
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="radio"
            name="pagamento"
            value="cartao"
            onChange={(e) => setMetodo(e.target.value)}
          />
          Cartão de Crédito/Débito
        </label>
      </div>
      {metodo && (
        <p style={{ marginTop: "15px", textAlign: "center", fontWeight: "bold" }}>
          Você selecionou: {metodo === "pix" ? "Pix" : "Cartão de Crédito/Débito"}
        </p>
      )}
    </div>
    {
      metodo == "" && (
        <button
        className="btn btn-sobre"
        style={{ width: "150px" }}
      >
        Selecione um tipo de pagamento
      </button>
      )
    }
    {
      metodo != "" && (
        <button
        className="btn btn-sobre"
        style={{ width: "150px" }}
        onClick={verificarCookie}
      >
        Finalizar Compra
      </button>
      )
    }
    </div>
  );
}
