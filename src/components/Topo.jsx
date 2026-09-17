import { perfil } from '../data/perfil.js'
import { projetos } from '../data/projetos.js'

export default function Topo() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden border-b border-linha px-4 pt-28 pb-20 sm:px-6 sm:pt-36 sm:pb-28"
    >
      {/* brilho suave ao fundo, puramente decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-destaque/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <div className="lg:order-1">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-linha bg-surface px-3 py-1 text-xs font-medium text-suave">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            {perfil.cargo}
            {perfil.local ? ` · ${perfil.local}` : ''}
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {perfil.nome}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-suave sm:text-xl">
            {perfil.chamada}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projetos"
              className="rounded-lg bg-destaque px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-destaque-suave"
            >
              Ver projetos
              <span aria-hidden="true"> →</span>
            </a>

            {perfil.contato.email && (
              <a
                href={`mailto:${perfil.contato.email}`}
                className="rounded-lg border border-linha bg-surface px-5 py-2.5 text-sm font-semibold text-texto transition-colors hover:border-suave hover:bg-surface-2"
              >
                Entrar em contato
              </a>
            )}

            {perfil.contato.curriculo && (
              <a
                href={perfil.contato.curriculo}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-suave transition-colors hover:text-texto"
              >
                Baixar currículo
              </a>
            )}
          </div>

          <p className="mt-12 text-sm text-suave">
            <span className="font-semibold text-texto">{projetos.length}</span>{' '}
            {projetos.length === 1 ? 'projeto publicado' : 'projetos publicados'}
          </p>
        </div>

        {perfil.foto && (
          // no celular a foto vem antes do texto; no desktop, ao lado
          <div className="order-first shrink-0 lg:order-2">
            <div className="relative w-fit">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full bg-destaque/15 blur-2xl"
              />
              <img
                src={perfil.foto}
                alt={`Foto de ${perfil.nome}`}
                width="640"
                height="640"
                className="relative size-32 rounded-full object-cover shadow-2xl shadow-black/40 ring-1 ring-linha sm:size-40 lg:size-56"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
