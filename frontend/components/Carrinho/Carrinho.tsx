import Link from "next/link";
export default function Carrinho({ quantidade }: { quantidade: number }) {
  return (
    <div className="carrinho">
      <h3>Carrinho de Compras</h3>
      <p id="carrinho-info">{quantidade} itens no carrinho</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link className="btn btn-sobre" href={"/sobre"}>
          Sobre
        </Link>
        <Link className="btn" style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}} href={"/carrinhodecompra"}>
          Ir para carrinho{" "}
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="css-i6dzq1"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
