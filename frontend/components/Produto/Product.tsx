import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { PopupMessage } from "../PopUp/PopupMessage";

interface Product {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  descricao: string;
}

export default function Product({
  product,
  getQuantidade,
}: {
  product: Product | undefined;
  getQuantidade: () => void;
}) {
  const router = useRouter();

  //Messages 
  const [message, setMessage] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);

  //Ao clicar no produto, ser redirecionado para sua pagina.
  const goProductPage = async () => {
    return router.push(`/product/${product?.id}`);
  };

  const addToCart = async () => {
    const existingItems = getCookie("carrinho");

    // Se o carrinho já existe
    if (existingItems) {
      try {
        // Tentar fazer parse do cookie
        const items = JSON.parse(existingItems as string);

        if (items.length == undefined) {
          setCookie("carrinho", JSON.stringify([product]), {
            path: "/",
            maxAge: 300,
          });
        }

        // Verificar se o produto já está no carrinho
        for (const i of items) {
          if (i.id === product?.id) {
            setMessage("Produto ja adicionado ao carrinho.")
            setShowMessage(true)
            getQuantidade(); // Produto já existe, não adiciona
            return;
          }
        }

        // Adicionar novo produto
        items.push(product);
        setCookie("carrinho", JSON.stringify(items), {
          path: "/",
          maxAge: 300,
        });
      } catch (error) {
        console.error("Erro ao parsear o carrinho", error);
      }
    } else {
      // Se não houver itens no carrinho, cria um novo com o produto
      setCookie("carrinho", JSON.stringify([product]), {
        path: "/",
        maxAge: 300,
      });
    }

    // Atualiza a quantidade
    getQuantidade();
  };

  return (
    <>
    {
      showMessage && 
      <PopupMessage mensagem={message} />
    }
      <div className="produto">
        <span onClick={goProductPage}>
          <h3>{product?.nome}</h3>
          <Image
            src={
              product?.imagem ||
              "https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            }
            alt="tylenol png"
            width={150}
            height={150}
          />
          <p>Preço: R$ {product?.preco}</p>
          <p>{product?.descricao}</p>
        </span>
        <span>
          <button onClick={addToCart}>Adicionar ao carrinho</button>
        </span>
      </div>
    </>
  );
}