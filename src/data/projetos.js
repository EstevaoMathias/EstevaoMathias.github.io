// ---------------------------------------------------------------------------
// SEUS PROJETOS
//
// Para adicionar um projeto:
//   1. Salve os prints em  public/assets/projetos/
//   2. Copie um bloco abaixo, cole no fim da lista e troque os textos.
//   3. Em "imagens", aponte para os arquivos que voce salvou no passo 1.
//      O caminho sempre comeca em /assets/projetos/ (sem o "public").
//
// Campos:
//   id          identificador unico, sem espacos nem acento
//   titulo      nome do painel
//   cliente     empresa, area ou "Projeto pessoal". Use '' para esconder.
//   ano         aparece como etiqueta no card. Use '' para esconder.
//   resumo      1 frase — e o que aparece no card da grade
//   objetivo    o texto principal: qual problema o painel resolve
//   destaques   lista de marcadores com o que o painel entrega. Use [] para esconder.
//   ferramentas etiquetas de tecnologia
//   capa        imagem do card (opcional, mais leve). Sem ela usa a 1a imagem.
//   imagens     lista de prints: { src, legenda }
//
// ATENCAO: todo print passa por tratamento de dado sensivel -- nome e CNPJ de
// loja, nome e contato de pessoas, razao social e logotipos. Sao dois caminhos:
//
//   - print vindo de PDF (Power BI): a regiao e pixelizada no raster
//     (ferramentas/ofuscar.py);
//   - print de aplicacao web: os nomes sao trocados por rotulos genericos na
//     resposta da API, ANTES de o navegador desenhar -- unico jeito seguro,
//     porque grafico em <canvas> nao deixa o rotulo no DOM para apagar depois.
//
// Ao trocar ou incluir print novo, refaca o tratamento antes de publicar.
// ---------------------------------------------------------------------------

export const projetos = [
  {
    id: 'monitor-de-extracoes',
    titulo: 'Monitor de Extrações',
    cliente: 'Plataforma B2B — setor farmacêutico',
    ano: '2026',
    resumo:
      'Saúde das integrações de quase 7 mil lojas em um só lugar, medida todo dia contra a meta de 95%.',
    objetivo:
      'A plataforma depende de extrair dados do sistema de cada loja todos os dias, e uma falha só aparecia quando alguém reclamava que o número estava errado. O painel transformou isso em indicador: mostra o percentual de sincronizações bem-sucedidas contra a meta de 95%, separa o que é responsabilidade da operação do que é responsabilidade do cliente e entrega a lista exata de filial, sistema e erro. O time passou a agir antes da reclamação chegar.',
    destaques: [
      'Índice geral e índice próprio lado a lado, para não discutir de quem é a falha',
      'Erros abertos por software de gestão, por empresa e por gravidade',
      'Série diária de sincronização contra a meta, com leitura de 24h e 48h',
      'Aba de oportunidade: lojas sem integração ou que precisam de ajuste',
      'Aba de atendimento: volume por técnico, por tipo e por filial',
    ],
    ferramentas: ['Power BI', 'SQL', 'DAX', 'Modelagem dimensional'],
    capa: '/assets/projetos/monitor-capa.png',
    imagens: [
      {
        src: '/assets/projetos/monitor-1.png',
        legenda:
          'Monitoramento: índice contra a meta de 95%, erros por software e por gravidade',
      },
      {
        src: '/assets/projetos/monitor-2.png',
        legenda:
          'Oportunidade: lojas OK, que precisam de ajuste e sem integração, por empresa',
      },
      {
        src: '/assets/projetos/monitor-3.png',
        legenda: 'Atendimento: volume por técnico, por filial e por tipo de intervenção',
      },
      {
        src: '/assets/projetos/monitor-4.png',
        legenda: 'Monitoramento por filial: sincronizou ou não, loja por loja, dia a dia',
      },
    ],
  },

  {
    id: 'simulacao-de-negociacao',
    titulo: 'Simulação de Negociação',
    cliente: 'Indústria farmacêutica',
    ano: '2026',
    resumo:
      'Simulador que diagnostica a negociação e calcula o potencial de venda antes da reunião com o fabricante.',
    objetivo:
      'Antes de negociar com a indústria, o time precisava responder se a rede cresce acima ou abaixo do mercado e quanto ainda cabe de participação — conta que era feita em planilha, do zero, a cada negociação. O painel virou a calculadora dessa conversa: o usuário move os parâmetros de crescimento de mercado, proposta do parceiro, meta e participação alvo e o painel devolve o diagnóstico escrito e o potencial em reais, já quebrado por nível de aderência e por porte de loja.',
    destaques: [
      'Diagnóstico em texto: o painel conclui, não deixa a interpretação para depois',
      'Comparação da rede contra a área trabalhada e contra o concorrente',
      'Potencial de venda e de compra recalculado a cada mudança de parâmetro',
      'Abertura por nível de aderência da loja e por faixa de faturamento',
    ],
    ferramentas: ['Power BI', 'DAX', 'What-if parameters', 'SQL'],
    capa: '/assets/projetos/negociacao-capa.png',
    imagens: [
      {
        src: '/assets/projetos/negociacao-1.png',
        legenda:
          'Parâmetros da simulação, diagnóstico automático e potencial por aderência e por categoria de loja',
      },
    ],
  },

  {
    id: 'comparativo-loja-brick',
    titulo: 'Comparativo Loja x Brick',
    cliente: 'Rede de farmácias — dados IQVIA',
    ano: '2026',
    resumo:
      'Cruzamento da venda da loja com a compra do mercado na mesma região, para achar o que ela deixa de vender.',
    objetivo:
      'A loja sabia o que vendia, mas não o que a região dela comprava. Cruzando a venda de cada loja com os dados de mercado da IQVIA do seu brick, o painel classifica loja e brick em curva ABCD e aponta, produto a produto, onde a loja está acima, abaixo ou na mesma classe do mercado ao redor. O resultado é uma lista de oportunidades concretas de mix: quase 18 mil SKUs comprados no brick que a loja não vendia.',
    destaques: [
      'Curva ABCD calculada em paralelo para o brick e para a loja',
      'Comparativo por laboratório e depois por EAN, com preço médio dos dois lados',
      'Sinalização visual de acima do brick, abaixo do brick e mesma classe',
      'Distribuição das lojas analisadas por UF, cidade e brick',
    ],
    ferramentas: ['Power BI', 'SQL', 'DAX', 'Curva ABC'],
    capa: '/assets/projetos/bricks-capa.png',
    imagens: [
      {
        src: '/assets/projetos/bricks-3.png',
        legenda:
          'Curva ABCD por laboratório: venda da loja contra compra do brick, com lucro bruto',
      },
      {
        src: '/assets/projetos/bricks-4.png',
        legenda:
          'Análise por EAN: onde a loja está acima, abaixo ou na mesma classe do mercado',
      },
      {
        src: '/assets/projetos/bricks-2.png',
        legenda: 'Classes do brick e da loja por laboratório, com o critério ABCD ao lado',
      },
      {
        src: '/assets/projetos/bricks-1.png',
        legenda: 'Localização das lojas analisadas e concorrência por UF, cidade e brick',
      },
    ],
  },

  {
    id: 'engajamento-de-lojas',
    titulo: 'Engajamento de Lojas',
    cliente: 'Plataforma B2B — setor farmacêutico',
    ano: '2026',
    resumo:
      'Quanto cada loja realmente usa a plataforma: pedido em cotação, fora de cotação, canal e acesso.',
    objetivo:
      'Ter a loja cadastrada não significa ter a loja usando. O time comercial precisava distinguir loja ativa de loja adormecida para saber onde ligar, e o painel responde isso com número: de 309 lojas ativas, quantas fizeram pedido, quantas compraram pela cotação, quantas estão sincronizadas e quantas apenas acessaram. Cada bloco vem com um texto que se reescreve conforme o filtro, para o vendedor ler a conclusão sem interpretar gráfico.',
    destaques: [
      'Pedido dentro e fora da cotação separados, com valor pedido e valor faturado',
      'Variação percentual contra o período anterior em cada indicador',
      'Canal de entrada do pedido (EDI ou e-mail) e quantidade de acessos',
      'Narrativa dinâmica: o texto muda junto com o filtro aplicado',
    ],
    ferramentas: ['Power BI', 'SQL', 'DAX'],
    capa: '/assets/projetos/engajamento-capa.png',
    imagens: [
      {
        src: '/assets/projetos/engajamento-1.png',
        legenda:
          'Pedidos em cotação, pedidos fora de cotação e envios por canal, com texto dinâmico',
      },
      {
        src: '/assets/projetos/engajamento-2.png',
        legenda: 'Visão consolidada: uma linha por loja, pronta para exportar',
      },
    ],
  },

  {
    id: 'compras-e-vendas-detalhadas',
    titulo: 'Detalhamento de Compras e Vendas',
    cliente: 'Rede de farmácias',
    ano: '2026',
    resumo:
      'Compra e venda da rede no mesmo painel, do produto até a loja, com crescimento de mês e de trimestre.',
    objetivo:
      'Compra e venda viviam em relatórios separados, o que impedia a pergunta mais óbvia: a rede está comprando o que vende? O painel juntou os dois lados sob os mesmos filtros de data, loja, grupo, fabricante, família e categoria, e acrescentou a leitura de crescimento por loja — mês contra mês e trimestre contra trimestre, com marcação de queda. Em uma tela, dá para ver que a rede caiu 43% no mês e quais lojas puxaram essa queda.',
    destaques: [
      'Mesmo recorte aplicado a vendas e a compras, lado a lado',
      'Detalhamento por produto, por loja, por fabricante e por família',
      'Crescimento por loja no mês e no trimestre, com sinalização de queda',
      'Ticket médio, participação de RX e de OTC/MIP e evolução mensal',
    ],
    ferramentas: ['Power BI', 'SQL', 'DAX', 'Modelagem dimensional'],
    capa: '/assets/projetos/compras-vendas-capa.png',
    imagens: [
      {
        src: '/assets/projetos/compras-vendas-1.png',
        legenda:
          'Vendas: produto, loja, fabricante e família, com evolução mensal e ticket médio',
      },
      {
        src: '/assets/projetos/compras-vendas-2.png',
        legenda: 'Vendas por loja: crescimento de mês e de trimestre com status de queda',
      },
      {
        src: '/assets/projetos/compras-vendas-3.png',
        legenda: 'Compras: o mesmo recorte aplicado ao lado da compra',
      },
      {
        src: '/assets/projetos/compras-vendas-4.png',
        legenda: 'Compras por loja: comparação de mês e de trimestre',
      },
    ],
  },

  {
    id: 'acompanhamento-de-campanhas',
    titulo: 'Acompanhamento de Campanhas',
    cliente: 'Indústria farmacêutica',
    ano: '2026',
    resumo:
      'Quem vendeu e quem não vendeu na campanha da indústria, por PDV, por vendedor e por produto.',
    objetivo:
      'A indústria investe em campanha de incentivo e precisa saber onde o dinheiro virou venda. Com 377 PDVs na campanha e apenas 13 registrando venda, o valor do painel está em expor o outro lado: os 364 PDVs sem nenhuma venda, nominalmente, para o time de campo agir enquanto a campanha está de pé. Nasceu em Power BI e foi reescrito como aplicação web — backend em FastAPI lendo de ClickHouse e frontend em React — para sair da licença por usuário, abrir mais rápido e poder ser embarcado no produto. As quatro telas percorrem o mesmo dado em recortes diferentes: rede, filial, vendedor e produto.',
    destaques: [
      'PDVs com e sem venda, com dias restantes de campanha',
      'Ranking dos cinco PDVs e dos cinco vendedores que mais venderam',
      'Mapa que agrupa os pontos de venda por cidade, dimensionado pela quantidade vendida',
      'Quantidade vendida por marca e por produto, com estoque e compras recentes',
      'Tabelas com busca, ordenação, paginação no servidor e exportação para Excel',
    ],
    ferramentas: [
      'Python',
      'FastAPI',
      'ClickHouse',
      'React',
      'TypeScript',
      'Chart.js',
    ],
    capa: '/assets/projetos/campanhas-capa.png',
    imagens: [
      {
        src: '/assets/projetos/campanhas-1.png',
        legenda: 'Tela inicial: participação de PDVs e de vendedores na campanha',
      },
      {
        src: '/assets/projetos/campanhas-2.png',
        legenda:
          'Filial: PDVs com e sem venda, ranking, mapa por cidade e resumo da campanha',
      },
      {
        src: '/assets/projetos/campanhas-3.png',
        legenda: 'Vendedor: ranking e detalhamento de venda por vendedor',
      },
      {
        src: '/assets/projetos/campanhas-4.png',
        legenda: 'Produto: estoque e quantidade vendida por marca e por ponto de venda',
      },
    ],
  },
]
