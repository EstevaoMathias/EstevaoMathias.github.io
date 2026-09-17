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
    'Trabalho no ciclo inteiro do painel: entender a pergunta que o time precisa responder, modelar o dado, escrever a consulta e entregar a tela pronta para decidir. A maior parte do que faço vive em distribuição e no setor farmacêutico — campanha de indústria, comparativo com dados de mercado, monitoramento de integração e simulação de negociação com fornecedor.',
    'Além do Power BI, construo painel como aplicação web quando o caso pede: backend em Python consultando banco colunar e frontend em React. O motivo costuma ser prático — sair da licença por usuário, abrir em segundos e poder embarcar o painel dentro do produto. Quando é migração, o critério é paridade: o número novo tem que bater com o antigo, linha a linha, antes de desligar o que existia.',
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
    grupo: 'Dados & Modelagem',
    itens: [
      'SQL',
      'ClickHouse',
      'SQL Server',
      'Dremio',
      'PostgreSQL',
      'Modelagem dimensional',
    ],
  },
  {
    grupo: 'Engenharia & Entrega',
    itens: [
      'Python',
      'FastAPI',
      'Airflow',
      'Docker',
      'Git / GitHub Actions',
    ],
  },
]
