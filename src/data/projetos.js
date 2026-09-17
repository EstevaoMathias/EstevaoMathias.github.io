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
//   id          identificador unico, sem espacos nem acento (vira endereco do projeto)
//   titulo      nome do painel
//   cliente     empresa, area ou "Projeto pessoal". Use '' para esconder.
//   ano         aparece como etiqueta no card. Use '' para esconder.
//   resumo      1 frase — e o que aparece no card da grade
//   objetivo    o texto principal: qual problema o painel resolve (1-2 paragrafos)
//   destaques   lista de marcadores com o que o painel entrega. Use [] para esconder.
//   ferramentas etiquetas de tecnologia
//   imagens     lista de prints: { src, legenda }
// ---------------------------------------------------------------------------

export const projetos = [
  {
    id: 'painel-comercial',
    titulo: 'Painel Comercial',
    cliente: 'Exemplo — troque pelo seu projeto',
    ano: '2025',
    resumo:
      'Acompanhamento de receita, metas e funil de vendas em uma visão única para a diretoria.',
    objetivo:
      'A área comercial acompanhava resultado em três planilhas diferentes, cada uma com um número distinto de faturamento — as reuniões começavam discutindo qual planilha estava certa em vez de discutir o resultado. O objetivo do painel foi consolidar as fontes em uma base única e confiável, com atualização diária, para que a conversa passasse a ser sobre a decisão e não sobre o dado.',
    destaques: [
      'Receita realizada contra meta, por vendedor e por região',
      'Funil de conversão com o tempo médio em cada etapa',
      'Comparativo mês a mês e acumulado do ano',
    ],
    ferramentas: ['Power BI', 'SQL', 'Modelagem dimensional'],
    imagens: [
      {
        src: '/assets/projetos/exemplo-comercial-1.svg',
        legenda: 'Visão geral: receita, meta e evolução mensal',
      },
      {
        src: '/assets/projetos/exemplo-comercial-2.svg',
        legenda: 'Detalhe do funil de conversão por etapa',
      },
    ],
  },
  {
    id: 'painel-operacional',
    titulo: 'Painel Operacional',
    cliente: 'Exemplo — troque pelo seu projeto',
    ano: '2025',
    resumo:
      'Monitoramento diário de produtividade e gargalos da operação, com alertas de desvio.',
    objetivo:
      'A operação só descobria um gargalo no fechamento do mês, quando já não dava para reagir. O painel trouxe o acompanhamento para o nível diário, destacando automaticamente os indicadores fora da faixa esperada, de forma que o time consiga agir na mesma semana em que o problema aparece.',
    destaques: [
      'Indicadores do dia com comparação contra a média das últimas 4 semanas',
      'Destaque automático dos desvios acima do limite aceitável',
      'Abertura por turno, equipe e tipo de ocorrência',
    ],
    ferramentas: ['Power BI', 'SQL', 'Python'],
    imagens: [
      {
        src: '/assets/projetos/exemplo-operacional-1.svg',
        legenda: 'Acompanhamento diário com os desvios em destaque',
      },
    ],
  },
  {
    id: 'analise-churn',
    titulo: 'Análise de Churn',
    cliente: 'Exemplo — troque pelo seu projeto',
    ano: '2024',
    resumo:
      'Estudo dos cancelamentos para identificar quais sinais antecedem a saída do cliente.',
    objetivo:
      'O time sabia a taxa de cancelamento, mas não o que a explicava. A análise cruzou histórico de uso, chamados de suporte e perfil de contrato para encontrar os padrões que aparecem antes de um cancelamento, entregando ao time de relacionamento uma lista de contas para abordar de forma preventiva.',
    destaques: [
      'Curva de retenção por safra de entrada',
      'Sinais de risco identificados nos 90 dias que antecedem o cancelamento',
      'Lista priorizada de contas em risco, atualizada semanalmente',
    ],
    ferramentas: ['Python', 'Pandas', 'SQL'],
    imagens: [
      {
        src: '/assets/projetos/exemplo-churn-1.svg',
        legenda: 'Retenção por safra e principais fatores de risco',
      },
    ],
  },
]
