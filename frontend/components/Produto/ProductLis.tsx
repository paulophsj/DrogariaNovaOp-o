import { useEffect, useState } from "react";
import Product from "./Product";
import Loader from "../Loader/Loader";
import { getCookie, setCookie } from "cookies-next";
import Carrinho from "../Carrinho/Carrinho";
import { PegarQuantidade } from "../../hooks/pegarQuantidade";

interface Product {
  id: number,
  nome: string,
  imagem: string,
  preco: number,
  descricao: string
}

export default function ProductList() {
  const [productdata, setProductData] = useState<Product[]>([]);
  const [load, setLoad] = useState(false)
  const {quantidade, getQuantidade} = PegarQuantidade()

  useEffect(() => {
    const findAllProducts = async () => {
      const requestOptions = {
        method: "GET",
      };

      await fetch("http://localhost:3000/product/buscartodos", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setProductData(result);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoad(true))
    };
    findAllProducts()
  }, []);

  useEffect(() => {
    const cookie = getCookie("carrinho")
    if(cookie == undefined){
      setCookie("carrinho", [], {
        maxAge: 300,
        path: '/'
      })
    }
  }, [])

  if(!load){
    return (<Loader />)
  }
  return (
    <>
      {
        productdata.map((item) => <Product getQuantidade={getQuantidade} key={item.id} product={item}/>)
      }
      <Carrinho quantidade={quantidade} />
    </>
  )
}
