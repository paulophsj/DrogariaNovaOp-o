import Link from "next/link";
import ProductList from "../components/Produto/ProductLis";
import Carrinho from "../components/Carrinho/Carrinho";

export default function index() {

    return (
        <>
        <div id={'main'} style={{display: "flex", alignItems: "center"}}>
            <ProductList />
        </div>
        </>
    )
}