import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Product from "./Product";
import Loader from "../Loader/Loader";
import { AlterarProduto } from "./AlterarProduto";
import { PegarQuantidade } from "../../hooks/pegarQuantidade";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

interface Product {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  descricao: string;
  message?: string; //Caso erro
  statusCode?: number; //Caro erro
}

export default function EditarProduto() {
  const router = useRouter();
  const id = router.query.id;
  //loader
  const [load, setLoad] = useState(false);

  //produto
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { getQuantidade } = PegarQuantidade();

  const excluirProduto = async ({ idProduct }: { idProduct: number }) => {
    const requestOptions = {
      method: "DELETE",
    };

    await fetch(`http://localhost:3000/product/${idProduct}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setProduct(result))
      .catch((error) => setProduct(error));
  };
  const editarProduto = async ({ novoProduto }: { novoProduto: Product }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      descricao: novoProduto.descricao,
      nome: novoProduto.nome,
      imagem: novoProduto.imagem,
      preco: novoProduto.preco,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };

    await fetch(
      `http://localhost:3000/product/${novoProduto.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
        const cookie = getCookie("carrinho");

        if (cookie) {
          const item: Product[] = JSON.parse(cookie as string);

          const newData = item.map((element: Product) => element.id === novoProduto.id ? element = JSON.parse(raw) : element);

          setCookie("carrinho", JSON.stringify(newData), {
            path: "/",
            maxAge: 300,
          });
        }
      })
      .catch((error) => {})
      .finally(() => {});
  };

  //Ao acessar a rota que possui o componente, ele realiza a busca
  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };

    fetch(`http://localhost:3000/product/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoad(true));
  }, [product, id]);

  if (!load) {
    return <Loader />;
  }
  return (
    <div className="div-editar">
      {product?.statusCode == 404 ? (
        <p
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            width: "fit-content",
          }}
        >
          {product?.message}
        </p>
      ) : (
        <>
          <Product
            getQuantidade={getQuantidade}
            key={product?.id}
            product={product}
          />
          <AlterarProduto
            produto={product}
            funcDelete={excluirProduto}
            funcEditar={editarProduto}
          />
        </>
      )}
    </div>
  );
}
