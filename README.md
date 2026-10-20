# Portal de Serviços de Ar-Condicionado

Site de captação para serviços de ar-condicionado: o visitante escolhe o tipo
de serviço, informa a localização e o problema, e a solicitação segue pronta
para o WhatsApp do administrador.

## Como funciona

1. O usuário escolhe o serviço: instalação, manutenção preventiva, conserto ou
   higienização.
2. Informa a localização pelo botão **Usar minha localização** (Geolocation API
   + geocodificação reversa via Nominatim/OpenStreetMap) ou digitando bairro,
   cidade ou CEP.
3. Preenche nome e descrição do problema.
4. Ao enviar, o site monta a mensagem pré-formatada e abre o WhatsApp
   (`https://wa.me/<numero>`) em uma nova aba. O envio depende do usuário
   tocar em "Enviar" no WhatsApp.

Sem backend: nenhum dado é armazenado. Todo o fluxo acontece no navegador.

## Stack

- Next.js 16 (App Router, Server Components) + TypeScript
- Tailwind CSS v4 (tokens em `src/app/globals.css`)
- React Hook Form não é necessário aqui: validação com **Zod** em
  `src/lib/request-schema.ts`
- Geolocalização: HTML5 Geolocation API + Nominatim para o endereço

## Configuração

O número do WhatsApp fica em `src/lib/services.ts`:

```ts
export const WHATSAPP_NUMBER = "5535991201792";
```

Formato: código do país + DDD + número, somente dígitos.

## Scripts

```bash
npm run dev        # desenvolvimento
npm run build      # build de produção
npm run start      # servidor de produção
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Estrutura

```
src/
  app/
    layout.tsx       # fontes, metadados, html lang="pt-BR"
    page.tsx         # página única (hero + formulário + como funciona + serviços)
    globals.css      # tokens de cor/tipo do design
  components/site/
    site-header.tsx  # cabeçalho fixo
    quote-form.tsx   # formulário completo (serviço, localização, dados)
    field.tsx        # campo + label + erro
    steps.tsx        # "como funciona"
    service-list.tsx # serviços e valores de referência
  lib/
    services.ts      # serviços, número e montagem do link do WhatsApp
    request-schema.ts# validação Zod
    cn.ts            # helper de classes
```
