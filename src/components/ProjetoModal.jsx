import { useCallback, useEffect, useRef, useState } from 'react'

const SELETOR_FOCAVEL =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Do tamanho ajustado ate o tamanho original pode haver um salto grande: num
// celular de 360px um print de 1600px salta 4x de uma vez e a pessoa se perde
// dentro da imagem. Quando o salto passa disso, entra um degrau no meio.
const SALTO_QUE_PEDE_DEGRAU = 2.2

function calcularPassos(larguraArea, larguraNatural) {
  if (!larguraArea || !larguraNatural) return []
  const passos = [larguraNatural]
  if (larguraNatural / larguraArea > SALTO_QUE_PEDE_DEGRAU) {
    passos.unshift(Math.round(larguraArea * 2))
  }
  return passos
}

export default function ProjetoModal({ projeto, aoFechar }) {
  const [indice, setIndice] = useState(0)
  const [nivel, setNivel] = useState(0) // 0 = ajustado a tela
  const [passos, setPassos] = useState([])
  const [alta, setAlta] = useState(false)

  const painelRef = useRef(null)
  const areaRef = useRef(null)
  const imagemRef = useRef(null)
  const focoAnteriorRef = useRef(null)
  const arrasteRef = useRef(null)
  const houveArrasteRef = useRef(false)

  const imagens = projeto?.imagens ?? []
  const total = imagens.length
  const imagemAtual = imagens[indice]

  const ampliado = nivel > 0
  const larguraAmpliada = ampliado ? passos[nivel - 1] : null

  const anterior = useCallback(
    () => setIndice((i) => (i - 1 + total) % total),
    [total],
  )
  const proxima = useCallback(() => setIndice((i) => (i + 1) % total), [total])

  // volta para o primeiro print sempre que outro projeto e aberto
  useEffect(() => setIndice(0), [projeto?.id])

  // trocar de print sempre volta ao tamanho ajustado
  useEffect(() => setNivel(0), [indice, projeto?.id])

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

  const medir = useCallback(() => {
    const area = areaRef.current
    const img = imagemRef.current
    if (!area || !img?.naturalWidth) return
    // o padding da area nao vale como espaco util para a imagem
    const largura = Math.max(1, area.clientWidth - 24)
    setPassos(calcularPassos(largura, img.naturalWidth))
    setAlta(img.naturalHeight / img.naturalWidth > 1.15)
  }, [])

  // girar o celular muda a largura util, e com ela os degraus de zoom
  useEffect(() => {
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [medir])

  // Mantem sob os olhos o ponto escolhido. Sem isso o zoom joga a visao para o
  // canto superior esquerdo e perde-se justamente o que se queria ver.
  const irParaNivel = useCallback((proximo, foco) => {
    setNivel(proximo)
    if (proximo === 0) return
    requestAnimationFrame(() => {
      const area = areaRef.current
      if (!area) return
      area.scrollLeft = foco.fx * area.scrollWidth - area.clientWidth / 2
      area.scrollTop = foco.fy * area.scrollHeight - area.clientHeight / 2
    })
  }, [])

  function aoClicarImagem(evento) {
    // clique que veio de um arraste serve para mover, nao para mudar o zoom
    if (houveArrasteRef.current) {
      houveArrasteRef.current = false
      return
    }
    const alvo = evento.currentTarget.getBoundingClientRect()
    irParaNivel((nivel + 1) % (passos.length + 1), {
      fx: (evento.clientX - alvo.left) / alvo.width,
      fy: (evento.clientY - alvo.top) / alvo.height,
    })
  }

  // pelo botao nao ha ponto clicado: mantem o centro do que ja esta a vista
  function aoUsarBotao() {
    const area = areaRef.current
    const foco = area
      ? {
          fx: (area.scrollLeft + area.clientWidth / 2) / (area.scrollWidth || 1),
          fy: (area.scrollTop + area.clientHeight / 2) / (area.scrollHeight || 1),
        }
      : { fx: 0.5, fy: 0.5 }
    irParaNivel((nivel + 1) % (passos.length + 1), foco)
  }

  // arrastar para percorrer a imagem ampliada (no toque o proprio scroll resolve)
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

  // atalhos: Esc sai do zoom e depois fecha, setas navegam, Tab circula
  useEffect(() => {
    const aoTeclar = (evento) => {
      if (evento.key === 'Escape') {
        evento.preventDefault()
        if (ampliado) setNivel(0)
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

  const noMaximo = nivel === passos.length
  const rotuloBotao = !ampliado ? 'Ampliar' : noMaximo ? 'Reduzir' : 'Ampliar mais'

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
                  ? 'h-[72vh] cursor-grab overflow-auto overscroll-contain p-3 active:cursor-grabbing sm:p-6'
                  : alta
                    ? 'h-[72vh] overflow-y-auto overscroll-contain p-3 sm:p-6'
                    : 'flex items-center justify-center p-3 sm:p-6'
              }
            >
              {imagemAtual ? (
                <img
                  key={imagemAtual.src}
                  ref={imagemRef}
                  src={imagemAtual.src}
                  alt={imagemAtual.legenda || `Print do projeto ${projeto.titulo}`}
                  draggable={false}
                  onClick={aoClicarImagem}
                  onLoad={medir}
                  style={larguraAmpliada ? { width: larguraAmpliada } : undefined}
                  className={
                    ampliado
                      ? 'max-w-none rounded-lg select-none'
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

            {imagemAtual && passos.length > 0 && (
              <div className="absolute right-4 bottom-4 flex items-center gap-2">
                {passos.length > 1 && (
                  <span className="rounded-md bg-base/90 px-2 py-1 text-xs text-suave backdrop-blur-sm tabular-nums">
                    {nivel + 1}/{passos.length + 1}
                  </span>
                )}
                <button
                  type="button"
                  onClick={aoUsarBotao}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-linha bg-base/90 px-3 py-1.5 text-xs font-medium text-texto backdrop-blur-sm transition-colors hover:bg-base"
                >
                  <span aria-hidden="true">{noMaximo ? '−' : '+'}</span>
                  {rotuloBotao}
                </button>
              </div>
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
            {!ampliado ? (
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
            ) : (
              <>
                {noMaximo
                  ? 'Arraste para percorrer.'
                  : 'Clique de novo para ampliar mais.'}{' '}
                <kbd className="rounded border border-linha bg-surface px-1 py-0.5">
                  Esc
                </kbd>{' '}
                volta ao tamanho ajustado.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
