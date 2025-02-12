import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export function PegarQuantidade() {
  const [quantidade, setQuantidade] = useState<number>(0);

  const getQuantidade = (): void => {
    const cookie = getCookie("carrinho");
    if (cookie) {
        const item = JSON.parse(cookie as string);
        setQuantidade(item.length);
      }
  };

  useEffect(() => {
    getQuantidade()
  }, [])

  return { quantidade, getQuantidade };
}