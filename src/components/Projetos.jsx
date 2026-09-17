import { projetos } from '../data/projetos.js'
import ProjetoCard from './ProjetoCard.jsx'

export default function Projetos({ aoAbrirProjeto }) {
  return (
    <section id="projetos" className="border-b border-linha px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Projetos</h2>
          <p className="mt-3 leading-relaxed text-suave">
            Painéis e análises que construí. Clique em um card para ver os prints em
            tamanho grande e o objetivo por trás de cada projeto.
          </p>
        </div>

        {projetos.length === 0 ? (
          <p className="rounded-xl border border-dashed border-linha bg-surface p-10 text-center text-suave">
            Nenhum projeto cadastrado ainda.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projetos.map((projeto) => (
              <ProjetoCard
                key={projeto.id}
                projeto={projeto}
                aoAbrir={() => aoAbrirProjeto(projeto)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
