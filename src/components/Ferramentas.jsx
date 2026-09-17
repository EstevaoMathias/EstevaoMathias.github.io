import { ferramentas } from '../data/perfil.js'

export default function Ferramentas() {
  return (
    <section
      id="ferramentas"
      className="border-b border-linha px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ferramentas</h2>
          <p className="mt-3 leading-relaxed text-suave">
            O que uso no dia a dia para extrair, modelar e apresentar dados.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
          {ferramentas.map((categoria) => (
            <div
              key={categoria.grupo}
              className="rounded-xl border border-linha bg-surface p-5"
            >
              <h3 className="mb-4 text-xs font-semibold tracking-wider text-suave uppercase">
                {categoria.grupo}
              </h3>
              <ul className="space-y-2">
                {categoria.itens.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-texto">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-destaque"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
