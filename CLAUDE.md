# Albor América · landing page

Landing page de lançamento do Albor América, empreendimento residencial da Vece Urbanismo em São José dos Campos (SP). Uma página só, com um objetivo: quem visita deixa o contato.

O briefing completo e a ficha ficam em `material/`, que **não vai para o GitHub** (está no `.gitignore`). Os dados essenciais estão repetidos abaixo para quem clonar o repositório.

## Estrutura

- `index.html`, `estilo.css`, `script.js` e `img/`, em HTML, CSS e JavaScript puros, sem build e sem dependências.
- `material/` é o original do cliente: **nunca altere nada lá dentro**. Na página use sempre cópias leves em `img/`.

## As 5 partes (ordem fixa, nenhuma sai e nenhuma troca de lugar)

1. **Topo fixo:** o nome "Albor América" escrito (sem logo), o menu com Diferenciais, Galeria e Contato, e o botão "Quero saber mais".
2. **Abertura:** foto em tela cheia com véu escuro, título de até 8 palavras, frase de apoio e botão. É a fachada no computador e a vista do drone no celular, via `<picture>`.
3. **Diferenciais** (`#diferenciais`): 6 itens, cada um com imagem, ícone, título, uma linha e o andar. São 3 colunas escalonadas no computador e 1 no celular. Não são cartões com caixa, de propósito.
4. **Galeria** (`#galeria`): 3 abas na própria seção (Áreas de lazer, Imagens internas e Imagens externas, que reúne a fachada, o drone e as 9 plantas), com tela cheia. As setas passam só pelas imagens da aba aberta.
5. **Contato** (`#contato`): foto de um interior e formulário com nome, telefone com DDD, e-mail, "Qual apartamento te interessa?" e aceite, mais os botões "Quero saber mais" e "Falar no WhatsApp". No treino o formulário não envia nada: mostra "Recebemos o seu contato".

Todo "Quero saber mais" leva a `#contato`.

## Visual

O layout é pensado **primeiro para o computador** (decisão do time, contrária ao briefing) e se adapta para tablet (até 1024 px) e celular (até 700 px). A página precisa ficar bonita e fácil de usar em 375 px.

| Token | Hex | Uso |
|---|---|---|
| `--folhagem` | `#22342A` | fundo do contato e do topo sólido, botão escuro |
| `--brasa` | `#E39A4A` | botões principais, molduras, botões de andar |
| `--freijo` | `#85593A` | ícones e etiqueta de andar (escurecido para ter contraste) |
| `--reboco` | `#EDEEEA` | fundo claro |
| `--noite` | `#161D1A` | texto e rodapé |

- **Fontes** (Google Fonts, no máximo duas): **Marcellus** nos títulos, sempre em caixa normal, e **Hanken Grotesk** no texto.
- **Assinatura: o arco do sol nascendo** ("albor" é o primeiro raio de sol).
  - As fotos principais usam `.arco`, uma máscara com topo em arco, e `.arco__linha`, uma moldura cor de brasa deslocada.
  - Elementos com `data-paralaxe` andam devagar ao rolar (variável `--desloca`, controlada em `script.js`).
  - As seções se encontram em curvas de horizonte (`--horizonte`).
- **Botão de andar:** um círculo com 24, 2S ou T, como o painel do elevador, preso na base do arco.
- **Movimento:**
  - Só existem o véu da abertura clareando e a paralaxe. Tudo desliga com `prefers-reduced-motion`.
  - Não acrescente entrada animada em cada seção.
- **Evite:** caixas de cartão iguais, maiúsculas em etiquetas, numeração 01/02/03 e uma só palavra destacada no título.

## Texto e tom

- O tom é sofisticado e direto, com frases curtas e sem exagero.
- A base do texto é a página oficial da Vece: https://lp.veceurbanismo.com.br/albor/. Conceito: "Albor significa o primeiro raio de sol", "O amanhecer de uma nova fase", "Três níveis de lazer".
- **Não use andares na frase de efeito da abertura.** A informação de andar fica nas etiquetas e nos botões de andar.
- **Nunca entra:** preço, tabela, condições de pagamento, valor de vendas ou financiamento. A página oficial fala do crédito da Caixa, mas aqui isso não entra.
- Os nomes dos espaços são os do cliente: Albor Club, Albor Market, Albor Gym e Albor Box.
- Todo texto com um fato precisa estar na ficha abaixo. Não invente vista, orientação do sol nem proximidade entre espaços.

## Dados da ficha

- **Localização:** Jardim América, Zona Sul de São José dos Campos, a cerca de 4 minutos a pé do Shopping Jardim Oriente, perto da Avenida Bacabal e da Linha Verde.
- **Plantão de vendas:** Rua Andorra, 452, ao lado do Varandas Oriente.
- **Prédio:** torre única, com 120 apartamentos e rooftop no 24º pavimento.
- **Apartamentos:** cerca de 86 m², com suíte master e duas demi-suítes, lavabo, varanda gourmet com churrasqueira a carvão, hobby box e duas vagas. Tipos 1, 1 ampliado e 4, com plantas dos tipos 1, 3 e 4.
- **Lazer no 2º sobressolo:** piscina lounge e piscina kids, Albor Club (espaço gourmet), salão de festas, brinquedoteca, lounge de jogos, multi, petcare, parquinho, espaço pet e quadra.
- **Rooftop:** Albor Gym e Albor Box, treino funcional, coworking, fire lounge (lareira externa) e skybar interno e externo.
- **Térreo:** recepção e Albor Market. Fica no térreo, como no briefing, por decisão do time.
- **Serviços:** bicicletário, car wash, oficina, minimercado e lavanderia.
- **Autoria:** arquitetura de Ilda Menini e interiores de Natalia Buscardi. Lançamento em 10/11/2026.
- **Registro:** "R.01 da matrícula 00.000", que é exemplo do treino e não o real.

## Imagens

- Formato WebP (a prévia do WhatsApp é JPG), com **até 400 KB cada**. A abertura tem até 1920 px de largura e o resto até 1200 px. A pasta `img/` inteira deve ficar abaixo de 5 MB.
- Nomes em minúsculas, sem acento, no padrão `albor_ambiente_01.webp`, mantendo o nome do render original.
- Texto alternativo em todas as imagens, descrevendo a cena. As plantas usam `object-fit: contain`, para não serem cortadas.
- **Não use:**
  - `material/renders/alta-resolucao/`, porque tem marca d'água da Arquiteteia;
  - o zip do cliente, porque são estudos de maquete em SketchUp;
  - as pranchas com texto (por exemplo `albor_fire_lounge_06`, `albor_skybar_externo_01` e `albor_salao_de_festas_09`).
- Para converter, use Pillow num ambiente virtual fora do projeto. Não instale nada no projeto.

## Pendências

- **WhatsApp:** `WHATSAPP_NUMERO` em `script.js` é um número de exemplo. Troque pelo número do treino quando o P&D informar.
- **Prévia no WhatsApp:** depois do deploy na Vercel, troque `og:image` por um endereço absoluto (`https://...`) e acrescente `og:url`.

## Como conferir uma alteração

- Abra o `index.html` no navegador e teste em 375 px, 768 px e 1440 px.
- Confira:
  - se não há rolagem horizontal;
  - se as 3 abas da galeria e a tela cheia funcionam (setas, Esc e toque fora);
  - se o formulário mostra os erros e depois a confirmação;
  - se o foco do teclado aparece em tudo.
