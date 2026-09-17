# EstevaoMathias.github.io

Portfólio pessoal — projetos, tecnologias e experiência.
No ar em: https://estevaomathias.github.io

Feito com **React + Vite + Tailwind CSS**, publicado automaticamente no GitHub Pages
a cada `git push` para a branch `main`.

---

## Como adicionar um projeto

São dois passos. Não precisa mexer em nenhum componente.

### 1. Salve os prints

Coloque as imagens do painel em `public/assets/projetos/`.

```
public/assets/projetos/painel-vendas-1.png
public/assets/projetos/painel-vendas-2.png
```

Dicas para o print ficar bom no site:

- **PNG** para painel de BI (texto fica nítido); JPG só se for foto.
- Largura entre **1600 e 2000 px** — acima disso só deixa o site pesado.
- Nomes sem espaço e sem acento: `painel-vendas-1.png`, não `Painel Vendas (1).png`.
- Se o print passar de ~600 KB, gere também uma versão reduzida para o card e
  aponte nela o campo `capa` do projeto.

> ### Antes de publicar qualquer print
>
> Todo print deste portfólio passa por ofuscação de:
>
> - nome e CNPJ de loja, filial ou empresa;
> - nome, CPF, e-mail e telefone de pessoas;
> - razão social e logotipos.
>
> O tratamento é feito **sobre os pixels** da imagem (a região é pixelizada e
> borrada), nunca escondendo texto por CSS ou recortando o PDF — assim não sobra
> camada de texto para recuperar.
>
> O script que faz isso fica em `ferramentas/`, **fora do controle de versão**,
> porque a lista de termos que ele usa contém justamente os nomes que o
> tratamento existe para esconder. Veja `ferramentas/LEIA-ME.txt`.
>
> Depois de rodar, abra **todas** as páginas geradas e confira uma por uma antes
> de dar `git push`.

### 2. Descreva o projeto

Abra `src/data/projetos.js` e adicione um bloco no fim da lista:

```js
{
  id: 'painel-vendas',            // sem espaço e sem acento, único na lista
  titulo: 'Painel de Vendas',
  cliente: 'Varejo',              // empresa, área ou 'Projeto pessoal'. Use '' para esconder
  ano: '2025',                    // use '' para esconder
  resumo: 'Uma frase — é o texto que aparece no card da grade.',
  objetivo:
    'O texto principal, mostrado quando o visitante abre o projeto. ' +
    'Explique qual problema existia e o que o painel resolveu.',
  destaques: [                    // use [] para esconder a seção
    'Primeiro indicador importante do painel',
    'Segundo indicador importante',
  ],
  ferramentas: ['Power BI', 'SQL'],
  capa: '/assets/projetos/painel-vendas-capa.png',   // opcional, imagem do card
  imagens: [
    { src: '/assets/projetos/painel-vendas-1.png', legenda: 'Visão geral' },
    { src: '/assets/projetos/painel-vendas-2.png', legenda: 'Detalhe por região' },
  ],
},
```

> O caminho em `src` **sempre começa em `/assets/projetos/`** — sem o `public` na frente.

A primeira imagem da lista é a que aparece como capa no card — a menos que você
preencha `capa`, que serve para usar uma versão mais leve ali.

### 3. Publique

```bash
git add .
git commit -m "Adiciona painel de vendas"
git push
```

O GitHub Actions faz o build e publica sozinho. Em 1 a 2 minutos o projeto está no ar.
Você acompanha o progresso na aba **Actions** do repositório.

---

## Seus dados pessoais

Nome, cargo, texto do "Sobre", ferramentas e links de contato ficam todos em
`src/data/perfil.js`.

Para disponibilizar o currículo em PDF: salve o arquivo como `public/curriculo.pdf` e
preencha `curriculo: '/curriculo.pdf'` em `perfil.contato`.

---

## Rodando na sua máquina

```bash
npm install     # só na primeira vez
npm run dev     # abre em http://localhost:5173
```

O site recarrega sozinho conforme você edita os arquivos.

Para conferir o resultado final antes de publicar:

```bash
npm run build
npm run preview
```

---

## Estrutura

```
index.html                     título e descrição do site (o que o Google mostra)
src/
  App.jsx                      monta a página e controla o modal aberto
  index.css                    cores e fontes do tema
  data/
    perfil.js                  ← seus dados pessoais
    projetos.js                ← seus projetos
  components/
    Cabecalho.jsx              menu fixo no topo
    Topo.jsx                   nome, chamada e botões
    Projetos.jsx               grade de projetos
    ProjetoCard.jsx            card individual
    ProjetoModal.jsx           janela com print ampliado e texto
    Sobre.jsx / Ferramentas.jsx / Contato.jsx / Rodape.jsx
public/
  assets/projetos/             ← os prints dos painéis
  favicon.svg                  ícone da aba do navegador
.github/workflows/deploy.yml   publicação automática no GitHub Pages
```

---

## Configuração do GitHub Pages (uma vez só)

Em **Settings → Pages** do repositório, o campo **Source** precisa estar como
**GitHub Actions** (e não "Deploy from a branch"). Sem isso, o workflow roda mas o site
não atualiza.
