export default function ProjetoCard({ projeto, aoAbrir }) {
  const capa = projeto.imagens?.[0]
  const totalImagens = projeto.imagens?.length ?? 0

  return (
    <article className="group h-full">
      <button
        type="button"
        onClick={aoAbrir}
        aria-label={`Abrir detalhes do projeto ${projeto.titulo}`}
        className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-linha bg-surface text-left transition-all duration-200 hover:-translate-y-1 hover:border-destaque/60 hover:shadow-lg hover:shadow-black/30"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-linha bg-surface-2">
          {capa ? (
            <img
              src={capa.src}
              alt={capa.legenda || `Print do projeto ${projeto.titulo}`}
              loading="lazy"
              className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm text-suave">
              Sem imagem
            </div>
          )}

          {totalImagens > 1 && (
            <span className="absolute right-3 bottom-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {totalImagens} imagens
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-suave">
            {projeto.cliente && <span className="truncate">{projeto.cliente}</span>}
            {projeto.cliente && projeto.ano && <span aria-hidden="true">·</span>}
            {projeto.ano && <span>{projeto.ano}</span>}
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-texto transition-colors group-hover:text-destaque-suave">
            {projeto.titulo}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-suave">
            {projeto.resumo}
          </p>

          {projeto.ferramentas?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {projeto.ferramentas.map((ferramenta) => (
                <li
                  key={ferramenta}
                  className="rounded-md border border-linha bg-surface-2 px-2 py-0.5 text-xs text-suave"
                >
                  {ferramenta}
                </li>
              ))}
            </ul>
          )}

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-destaque-suave">
            Ver detalhes
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </button>
    </article>
  )
}
