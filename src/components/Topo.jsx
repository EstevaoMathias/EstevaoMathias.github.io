import { perfil } from '../data/perfil.js'
import { projetos } from '../data/projetos.js'

export default function Topo() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden border-b border-linha px-4 pt-32 pb-20 sm:px-6 sm:pt-40 sm:pb-28"
    >
      {/* brilho suave ao fundo, puramente decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-destaque/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-linha bg-surface px-3 py-1 text-xs font-medium text-suave">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {perfil.cargo}
          {perfil.local ? ` · ${perfil.local}` : ''}
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {perfil.nome}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-suave text-pretty sm:text-xl">
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
    </section>
  )
}
