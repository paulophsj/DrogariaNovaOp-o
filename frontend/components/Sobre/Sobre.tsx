import Link from "next/link";

export default function Sobre() {
  return (
    <div className="sobre-container">
      <h2>Sobre a Drogaria Nova Opção</h2>
      <p>
        Na <strong>Drogaria Nova Opção</strong>, estamos comprometidos em
        oferecer aos nossos clientes os melhores produtos e serviços. Atuamos no
        mercado farmacêutico há mais de 10 anos, sempre com o objetivo de
        proporcionar atendimento de excelência, com confiança e credibilidade.
        Nossa missão é cuidar da sua saúde e bem-estar, oferecendo medicamentos
        de alta qualidade, preços acessíveis e uma equipe especializada para
        melhor atendê-lo.
      </p>
      <p>
        Acreditamos que a saúde é a base de uma vida plena, e por isso
        trabalhamos todos os dias para garantir que nossos clientes tenham
        acesso aos melhores tratamentos e orientações, com respeito e
        transparência. Seja para cuidar de sua saúde ou para encontrar produtos
        de bem-estar, na <strong>Drogaria Nova Opção</strong> você sempre
        encontra uma solução.
      </p>
      <p>
        <strong>Sua saúde em boas mãos.</strong>
      </p>
      <Link href={'/'} className="sobre-botao">Voltar à Loja</Link>
    </div>
  );
}
