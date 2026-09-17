import { useCallback, useEffect, useRef, useState } from 'react'

const SELETOR_FOCAVEL =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function ProjetoModal({ projeto, aoFechar }) {
  const [indice, setIndice] = useState(0)
  const [ampliado, setAmpliado] = useState(false)
  const [alta, setAlta] = useState(false)
  const painelRef = useRef(null)
  const areaRef = useRef(null)
  const focoAnteriorRef = useRef(null)
  const arrasteRef = useRef(null)
  const houveArrasteRef = useRef(false)

  const imagens = projeto?.imagens ?? []
  const total = imagens.length
  const imagemAtual = imagens[indice]

  const anterior = useCallback(
    () => setIndice((i) => (i - 1 + total) % total),
    [total],
  )
  const proxima = useCallback(() => setIndice((i) => (i + 1) % total), [total])

  // volta para o primeiro print sempre que outro projeto e aberto
  useEffect(() => setIndice(0), [projeto?.id])

  // trocar de print sempre volta ao tamanho ajustado
  useEffect(() => setAmpliado(false), [indice, projeto?.id])

  // trava o scroll da pagina de fundo enquanto o modal esta aberto
  useEffect(() => {
    document.body.classList.add('modal-aberto')
    return () => document.body.classList.remove('modal-aberto')
  }, [])

  // guarda o elemento que tinha o foco, move o foco para o modal e devolve ao fechar
  useEffect(() => {
    focoAnteriorRef.current = document.activeElement
    painelRef.current?.focus()
    return () => focoAnteriorRef.current?.focus?.()
  }, [])

  // Amplia mirando o ponto clicado: sem isso o zoom cai sempre no canto
  // superior esquerdo e a pessoa perde de vista o que queria ver de perto.
  function alternarZoom(evento) {
    // clique que veio de um arraste serve para mover, nao para reduzir
    if (houveArrasteRef.current) {
      houveArrasteRef.current = false
      return
    }

    if (ampliado) {
      setAmpliado(false)
      return
    }

    const alvo = evento.currentTarget.getBoundingClientRect()
    const fx = (evento.clientX - alvo.left) / alvo.width
    const fy = (evento.clientY - alvo.top) / alvo.height

    setAmpliado(true)
    requestAnimationFrame(() => {
      const area = areaRef.current
      if (!area) return
      area.scrollLeft = fx * area.scrollWidth - area.clientWidth / 2
      area.scrollTop = fy * area.scrollHeight - area.clientHeight / 2
    })
  }

  // arrastar para navegar pela imagem ampliada (no toque o proprio scroll resolve)
  function aoPressionar(evento) {
    if (!ampliado || evento.button !== 0) return
    const area = areaRef.current
    arrasteRef.current = {
      x: evento.clientX,
      y: evento.clientY,
      esquerda: area.scrollLeft,
      topo: area.scrollTop,
      arrastou: false,
    }
  }

  function aoArrastar(evento) {
    const arraste = arrasteRef.current
    if (!arraste) return
    const dx = evento.clientX - arraste.x
    const dy = evento.clientY - arraste.y
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) arraste.arrastou = true
    const area = areaRef.current
    area.scrollLeft = arraste.esquerda - dx
    area.scrollTop = arraste.topo - dy
  }

  function aoSoltar() {
    houveArrasteRef.current = Boolean(arrasteRef.current?.arrastou)
    arrasteRef.current = null
  }

  // atalhos de teclado: Esc sai do zoom e depois fecha, setas navegam, Tab circula
  useEffect(() => {
    const aoTeclar = (evento) => {
      if (evento.key === 'Escape') {
        evento.preventDefault()
        if (ampliado) setAmpliado(false)
        else aoFechar()
        return
      }

      const seta = evento.key === 'ArrowLeft' || evento.key === 'ArrowRight'

      if (seta && ampliado) {
        // com a imagem ampliada as setas percorrem a propria imagem
        evento.preventDefault()
        areaRef.current?.scrollBy({
          left: evento.key === 'ArrowLeft' ? -120 : 120,
          behavior: 'smooth',
        })
        return
      }

      if (seta && total > 1) {
        evento.preventDefault()
        if (evento.key === 'ArrowLeft') anterior()
        else proxima()
        return
      }

      if (evento.key === 'Tab') {
        const focaveis = painelRef.current?.querySelectorAll(SELETOR_FOCAVEL)
        if (!focaveis?.length) return

        const primeiro = focaveis[0]
        const ultimo = focaveis[focaveis.length - 1]

        if (evento.shiftKey && document.activeElement === primeiro) {
          evento.preventDefault()
          ultimo.focus()
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault()
          primeiro.focus()
        }
      }
    }

    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [aoFechar, anterior, proxima, total, ampliado])

  if (!projeto) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(evento) => {
        // so fecha se o clique comecou no fundo, nao dentro do painel
        if (evento.target === evento.currentTarget) aoFechar()
      }}
    >
      <div
        ref={painelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-projeto"
        className="mx-auto grid max-w-7xl overflow-hidden rounded-xl border border-linha bg-base shadow-2xl outline-none lg:grid-cols-[minmax(0,1fr)_400px]"
      >
        {/* ---------- area das imagens ---------- */}
        <div className="flex min-w-0 flex-col bg-surface-2">
          <div className="relative">
            <div
              ref={areaRef}
              onMouseDown={aoPressionar}
              onMouseMove={aoArrastar}
              onMouseUp={aoSoltar}
              onMouseLeave={aoSoltar}
              className={
                // pagina alta cabendo inteira na tela viraria uma tira estreita
                // no meio do vazio: nela vale ocupar a largura e rolar
                ampliado
                  ? 'h-[72vh] cursor-grab overflow-auto overscroll-contain active:cursor-grabbing'
                  : alta
                    ? 'h-[72vh] overflow-y-auto overscroll-contain p-3 sm:p-6'
                    : 'flex items-center justify-center p-3 sm:p-6'
              }
            >
              {imagemAtual ? (
                <img
                  key={imagemAtual.src}
                  src={imagemAtual.src}
                  alt={imagemAtual.legenda || `Print do projeto ${projeto.titulo}`}
                  draggable={false}
                  onClick={alternarZoom}
                  onLoad={(evento) => {
                    const { naturalWidth: larg, naturalHeight: alt } =
                      evento.currentTarget
                    setAlta(alt / larg > 1.15)
                  }}
                  className={
                    ampliado
                      ? 'w-auto max-w-none select-none'
                      : alta
                        ? 'w-full cursor-zoom-in rounded-lg'
                        : 'max-h-[72vh] w-full cursor-zoom-in rounded-lg object-contain'
                  }
                />
              ) : (
                <p className="p-16 text-suave">Este projeto ainda não tem imagens.</p>
              )}
            </div>

            {total > 1 && !ampliado && (
              <>
                <button
                  type="button"
                  onClick={anterior}
                  aria-label="Imagem anterior"
                  className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-linha bg-base/85 text-lg text-texto transition-colors hover:bg-base"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  onClick={proxima}
                  aria-label="Próxima imagem"
                  className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-linha bg-base/85 text-lg text-texto transition-colors hover:bg-base"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </>
            )}

            {imagemAtual && (
              <button
                type="button"
                onClick={() => setAmpliado((v) => !v)}
                aria-pressed={ampliado}
                className="absolute right-4 bottom-4 flex cursor-pointer items-center gap-1.5 rounded-lg border border-linha bg-base/90 px-3 py-1.5 text-xs font-medium text-texto backdrop-blur-sm transition-colors hover:bg-base"
              >
                <span aria-hidden="true">{ampliado ? '−' : '+'}</span>
                {ampliado ? 'Reduzir' : 'Ampliar'}
              </button>
            )}
          </div>

          {imagemAtual && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-linha px-4 py-3 sm:px-6">
              <p className="min-w-0 flex-1 text-sm text-suave">{imagemAtual.legenda}</p>

              {total > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-suave tabular-nums">
                    {indice + 1} / {total}
                  </span>
                  <div className="flex gap-1.5">
                    {imagens.map((imagem, i) => (
                      <button
                        key={imagem.src}
                        type="button"
                        onClick={() => setIndice(i)}
                        aria-label={`Ver imagem ${i + 1}`}
                        aria-current={i === indice}
                        className={`h-1.5 w-6 cursor-pointer rounded-full transition-colors ${
                          i === indice ? 'bg-destaque' : 'bg-linha hover:bg-suave'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ---------- area do texto ---------- */}
        <div className="flex min-w-0 flex-col border-t border-linha lg:max-h-[88vh] lg:border-t-0 lg:border-l">
          <div className="flex items-start justify-between gap-4 border-b border-linha p-5 sm:p-6">
            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs text-suave">
                {projeto.cliente && <span>{projeto.cliente}</span>}
                {projeto.cliente && projeto.ano && <span aria-hidden="true">·</span>}
                {projeto.ano && <span>{projeto.ano}</span>}
              </div>
              <h2
                id="titulo-projeto"
                className="text-xl font-bold tracking-tight text-balance"
              >
                {projeto.titulo}
              </h2>
            </div>

            <button
              type="button"
              onClick={aoFechar}
              aria-label="Fechar"
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-linha text-suave transition-colors hover:bg-surface hover:text-texto"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="flex-1 space-y-7 overflow-y-auto p-5 sm:p-6">
            <div>
              <h3 className="mb-2 text-xs font-semibold tracking-wider text-suave uppercase">
                Objetivo
              </h3>
              <p className="leading-relaxed text-pretty text-texto/90">
                {projeto.objetivo}
              </p>
            </div>

            {projeto.destaques?.length > 0 && (
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-suave uppercase">
                  O que o painel entrega
                </h3>
                <ul className="space-y-2.5">
                  {projeto.destaques.map((destaque) => (
                    <li
                      key={destaque}
                      className="flex gap-3 text-sm leading-relaxed text-texto/90"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-destaque"
                      />
                      <span>{destaque}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {projeto.ferramentas?.length > 0 && (
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-suave uppercase">
                  Ferramentas
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {projeto.ferramentas.map((ferramenta) => (
                    <li
                      key={ferramenta}
                      className="rounded-md border border-linha bg-surface px-2.5 py-1 text-xs text-texto/90"
                    >
                      {ferramenta}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <p className="border-t border-linha px-5 py-3 text-xs text-suave sm:px-6">
            {ampliado ? (
              <>
                Arraste para percorrer a imagem.{' '}
                <kbd className="rounded border border-linha bg-surface px-1 py-0.5">
                  Esc
                </kbd>{' '}
                volta ao tamanho ajustado.
              </>
            ) : (
              <>
                Clique na imagem para ampliar.{' '}
                <kbd className="rounded border border-linha bg-surface px-1 py-0.5">
                  Esc
                </kbd>{' '}
                fecha
                {total > 1 && (
                  <>
                    {' '}
                    e as{' '}
                    <kbd className="rounded border border-linha bg-surface px-1 py-0.5">
                      setas
                    </kbd>{' '}
                    trocam de imagem
                  </>
                )}
                .
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
