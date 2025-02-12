import type { AppProps } from 'next/app'
import Header from '../components/Header'
import "../styles/cssGlobal.css"
import Link from 'next/link'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
        <Header />
        <Link href={'/'} className="btn btn-sobre btn-header btn-left">Ir para tela inicial</Link>
        <Link href={'/product/criarproduto'} className="btn btn-sobre btn-header btn-right">Adicionar produto</Link>
        <Component {...pageProps} />
    </>
  )
}