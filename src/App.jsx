import { useState } from 'react'
import Cabecalho from './components/Cabecalho.jsx'
import Topo from './components/Topo.jsx'
import Projetos from './components/Projetos.jsx'
import ProjetoModal from './components/ProjetoModal.jsx'
import Sobre from './components/Sobre.jsx'
import Ferramentas from './components/Ferramentas.jsx'
import Contato from './components/Contato.jsx'
import Rodape from './components/Rodape.jsx'

export default function App() {
  const [projetoAberto, setProjetoAberto] = useState(null)

  return (
    <>
      <a
        href="#projetos"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-destaque focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para os projetos
      </a>

      <Cabecalho />

      <main>
        <Topo />
        <Projetos aoAbrirProjeto={setProjetoAberto} />
        <Sobre />
        <Ferramentas />
        <Contato />
      </main>

      <Rodape />

      {projetoAberto && (
        <ProjetoModal
          projeto={projetoAberto}
          aoFechar={() => setProjetoAberto(null)}
        />
      )}
    </>
  )
}
