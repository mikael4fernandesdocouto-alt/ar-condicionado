import type { Metadata } from "next";
import Link from "next/link";
import { PageMotion } from "@/components/site/page-motion";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { BASE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";
import { WHATSAPP_NUMBER } from "@/lib/services";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${SITE_NAME}`,
  description: `Como a ${SITE_NAME} trata os dados dos pedidos de orçamento e dos cadastros de prestadores.`,
  alternates: { canonical: `${SITE_URL}/privacidade/` },
};

export default function PrivacyPage() {
  return (
    <div id="topo" className="flex-1">
      <SiteHeader quoteHref={`${BASE_PATH}/`} />
      <main className="bg-white px-5 pt-28 pb-20 sm:px-8 sm:pt-32">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-azul-700">Privacidade</p>
          <h1 className="mt-3 font-display text-4xl text-azul-950 sm:text-5xl">Política de Privacidade</h1>
          <p className="mt-4 text-sm text-azul-700">Atualizada em 23 de outubro de 2026</p>
          <div className="mt-8 space-y-6 leading-relaxed text-azul-700">
            <p>A Arperto é responsável por tratar os dados enviados nos pedidos de orçamento e nos cadastros de prestadores. Para falar sobre privacidade, use o WhatsApp comercial da Arperto, o mesmo canal aberto ao solicitar orçamento ou fazer cadastro.</p>
            <section><h2 className="font-semibold text-azul-950">Dados e finalidades</h2><p>Nos pedidos de orçamento, o site usa nome, região ou endereço, serviço desejado e descrição do problema para preparar e encaminhar a solicitação. No cadastro de prestadores, usa nome, WhatsApp, região atendida, serviços e, se informados, empresa, e-mail e observações para avaliar o cadastro, contatar o prestador e encaminhar pedidos.</p></section>
            <section><h2 className="font-semibold text-azul-950">Localização</h2><p>Usar a localização do navegador é opcional. Se você escolher essa função e autorizar o navegador, a localização é consultada para sugerir um endereço. Você pode revisar e corrigir a sugestão ou preencher bairro, cidade ou CEP manualmente.</p></section>
            <section><h2 className="font-semibold text-azul-950">WhatsApp e compartilhamento</h2><p>O site monta uma mensagem e abre o WhatsApp para você revisar. Nada é enviado até você tocar em enviar. Ao enviar, os dados incluídos na mensagem são compartilhados com o WhatsApp e com a equipe/prestador que receber o pedido. Se você pedir a busca de endereço pela localização, a consulta também usa o serviço OpenStreetMap/Nominatim.</p></section>
            <section><h2 className="font-semibold text-azul-950">Uso, guarda e segurança</h2><p>Os dados são usados para atender a solicitação, realizar etapas preliminares ao cadastro ou serviço e, quando aplicável, cumprir obrigações legais ou proteger direitos. São mantidos apenas pelo período necessário a essas finalidades e obrigações, com medidas de segurança adequadas à operação.</p></section>
            <section><h2 className="font-semibold text-azul-950">Seus direitos e contato</h2><p>Você pode solicitar confirmação de tratamento, acesso, correção, informações sobre compartilhamento e, quando cabível, eliminação dos dados. Para isso, <a className="underline decoration-azul-300 underline-offset-4" href={`https://wa.me/${WHATSAPP_NUMBER}`}>fale com a equipe pelo WhatsApp comercial</a>.</p></section>
            <p>Esta política pode ser atualizada quando o funcionamento do serviço ou as regras aplicáveis mudarem. A versão vigente fica disponível nesta página.</p>
          </div>
          <p className="mt-10"><Link href="/" className="underline decoration-azul-300 underline-offset-4">Voltar à página inicial</Link></p>
        </article>
      </main>
      <SiteFooter />
      <PageMotion />
    </div>
  );
}
