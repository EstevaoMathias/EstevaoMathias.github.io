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

  // Foto do topo da pagina. Use '' para esconder. Para trocar: salve um
  // recorte QUADRADO em public/ (a pagina corta em circulo) e aponte aqui.
  foto: '/foto-perfil.jpg',

  // Links de contato. Deixe qualquer campo como '' para esconder o botao.
  contato: {
    email: 'estevaomathias19@gmail.com',
    linkedin:
      'https://www.linkedin.com/in/estev%C3%A3o-mathias-767680277',
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
    itens: [
      'Power BI',
      'Apache Superset',
      // painel analitico feito em codigo, no lugar de uma ferramenta de BI:
      // no mercado isso costuma aparecer como "data app" ou "custom BI"
      'Data apps (React + FastAPI)',
      'Excel avançado',
    ],
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
