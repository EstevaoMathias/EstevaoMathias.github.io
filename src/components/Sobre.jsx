import { perfil } from '../data/perfil.js'

function Trajetoria({ itens }) {
  return (
    <div className="mt-12">
      <h3 className="mb-6 text-xs font-semibold tracking-wider text-suave uppercase">
        Trajetória
      </h3>

      {/* a linha vertical e o tracinho de cada item sao decoracao: quem usa
          leitor de tela recebe a lista abaixo, que ja diz tudo */}
      <ol className="relative space-y-8 border-l border-linha pl-6">
        {itens.map((item) => (
          <li key={`${item.empresa}-${item.periodo}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[1.6875rem] size-3 rounded-full border-2 border-base bg-destaque"
            />

            <p className="text-xs text-suave tabular-nums">{item.periodo}</p>

            <h4 className="mt-1 font-semibold text-texto">
              {item.empresa}
              <span className="font-normal text-suave"> · {item.cargo}</span>
            </h4>

            {item.resumo && (
              <p className="mt-2 text-sm leading-relaxed text-pretty text-suave">
                {item.resumo}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function Formacao({ itens }) {
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-xs font-semibold tracking-wider text-suave uppercase">
        Formação
      </h3>

      <ul className="space-y-3">
        {itens.map((item) => (
          <li
            key={`${item.curso}-${item.periodo}`}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border border-linha bg-surface px-4 py-3"
          >
            <span className="font-medium text-texto">{item.curso}</span>
            <span className="text-sm text-suave">{item.instituicao}</span>
            <span className="ml-auto text-xs text-suave tabular-nums">
              {item.periodo}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Sobre() {
  const trajetoria = perfil.trajetoria ?? []
  const formacao = perfil.formacao ?? []

  return (
    <section id="sobre" className="border-b border-linha px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Sobre</h2>

        <div className="lg:col-span-2">
          <div className="space-y-5">
            {perfil.sobre.map((paragrafo) => (
              <p
                key={paragrafo}
                className="text-lg leading-relaxed text-pretty text-suave"
              >
                {paragrafo}
              </p>
            ))}
          </div>

          {trajetoria.length > 0 && <Trajetoria itens={trajetoria} />}
          {formacao.length > 0 && <Formacao itens={formacao} />}
        </div>
      </div>
    </section>
  )
}
