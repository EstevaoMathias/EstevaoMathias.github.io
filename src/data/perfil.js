// ---------------------------------------------------------------------------
// Seus dados pessoais. Edite os textos abaixo — eles aparecem no topo,
// na secao "Sobre" e no rodape do site.
// ---------------------------------------------------------------------------

export const perfil = {
  nome: 'Estevão Mathias',
  cargo: 'Analista de Dados',

  // Frase curta que aparece logo abaixo do seu nome, no topo da pagina.
  chamada:
    'Transformo dados dispersos em painéis que as pessoas realmente usam para decidir.',

  // Um ou dois paragrafos sobre voce. Cada item da lista vira um paragrafo.
  sobre: [
    'Trabalho com todo o ciclo do dado: da extração e modelagem até a entrega do painel na mão de quem toma a decisão. Gosto de resolver o problema de verdade — entender qual pergunta o time precisa responder antes de escolher o gráfico.',
    'No dia a dia atuo com SQL, Python e ferramentas de BI, sempre com atenção a performance: painel que demora para abrir é painel que ninguém usa.',
  ],

  // Cidade/estado ou "Remoto". Deixe string vazia ('') para esconder.
  local: 'Brasil',

  // Links de contato. Deixe qualquer campo como '' para esconder o botao.
  contato: {
    email: 'estevaomathias19@gmail.com',
    linkedin: 'https://www.linkedin.com/in/estevaomathias',
    github: 'https://github.com/EstevaoMathias',
    // Coloque o PDF em public/curriculo.pdf e deixe '/curriculo.pdf' aqui.
    curriculo: '',
  },
}

// ---------------------------------------------------------------------------
// Ferramentas que aparecem na secao "Ferramentas".
// Agrupadas por categoria: o titulo do grupo e a lista de itens.
// ---------------------------------------------------------------------------

export const ferramentas = [
  {
    grupo: 'Visualização & BI',
    itens: ['Power BI', 'Looker Studio', 'Metabase', 'Excel avançado'],
  },
  {
    grupo: 'Dados & Consulta',
    itens: ['SQL', 'PostgreSQL', 'ClickHouse', 'Modelagem dimensional'],
  },
  {
    grupo: 'Análise & Automação',
    itens: ['Python', 'Pandas', 'ETL / pipelines', 'Airflow'],
  },
]
