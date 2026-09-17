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
    'Além do Power BI, construo painel como aplicação web quando o caso pede: backend em Python consultando banco colunar e frontend em React. O motivo costuma ser prático — sair da licença por usuário, abrir em segundos e poder embarcar o painel dentro do produto.',
  ],

  // Cidade/estado ou "Remoto". Deixe string vazia ('') para esconder.
  local: 'Brasil',

  // Trajetoria profissional, do mais recente para o mais antigo.
  // Use [] para esconder a secao inteira.
  trajetoria: [
    {
      periodo: 'nov/2024 — atual',
      empresa: 'Gruppy',
      cargo: 'Analista de Dados',
      resumo:
        'Painéis analíticos, pipelines de extração e transformação e manutenção de Data Warehouse e Lakehouse, com indicadores e métricas para as áreas de negócio.',
    },
    {
      periodo: 'abr/2023 — out/2024',
      empresa: 'WebDecisor',
      cargo: 'Analista de Dados',
      resumo:
        'Dashboards em Power BI, pipelines no Microsoft Fabric e estruturação de ambientes analíticos, com otimização de consultas sobre grande volume de dados.',
    },
    {
      periodo: 'ago/2021 — mar/2023',
      empresa: 'Tecnoplan Reestruturação e Sistemas',
      cargo: 'Gerente de Suporte Técnico de TI',
      resumo:
        'Coordenação do suporte e da infraestrutura, administração de bancos Firebird e SQL Server e desenvolvimento de relatórios em Report Builder.',
    },
  ],

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
