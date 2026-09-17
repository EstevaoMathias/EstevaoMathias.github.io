import { useEffect, useRef, useState } from 'react'
import { perfil } from '../data/perfil.js'

// Como o link aparece na tela: sem o "https://www." e com o acento de volta
// (a URL guarda o acento codificado, senao o link nao abre em alguns clientes).
function paraExibir(url) {
  const limpa = url.replace(/^https?:\/\/(www\.)?/, '')
  try {
    return decodeURIComponent(limpa)
  } catch {
    return limpa
  }
}

async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    // navegador antigo, ou pagina aberta sem https: copia pelo caminho velho
    try {
      const area = document.createElement('textarea')
      area.value = texto
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      const deuCerto = document.execCommand('copy')
      document.body.removeChild(area)
      return deuCerto
    } catch {
      return false
    }
  }
}

// Monta a lista a partir do que estiver preenchido em perfil.contato.
// O e-mail copia ao clicar; o resto abre o link.
function montarItens({ email, linkedin, github, curriculo }) {
  const itens = []

  if (email) itens.push({ rotulo: 'E-mail', valor: email, copiar: true })
  if (linkedin)
    itens.push({
      rotulo: 'LinkedIn',
      valor: paraExibir(linkedin),
      href: linkedin,
    })
  if (github)
    itens.push({
      rotulo: 'GitHub',
      valor: paraExibir(github),
      href: github,
    })
  if (curriculo)
    itens.push({
      rotulo: 'Currículo',
      valor: 'Baixar em PDF',
      href: curriculo,
    })

  return itens
}

const CARTAO =
  'group flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-linha bg-base px-4 py-3.5 text-left transition-colors hover:border-destaque/60'

export default function Contato() {
  const itens = montarItens(perfil.contato)
  const [copiado, setCopiado] = useState(null)
  const relogio = useRef(null)

  // se o componente sair da tela antes do aviso sumir, cancela o timer
  useEffect(() => () => clearTimeout(relogio.current), [])

  async function aoCopiar() {
    const deuCerto = await copiarTexto(perfil.contato.email)
    setCopiado(deuCerto ? 'ok' : 'falhou')
    clearTimeout(relogio.current)
    relogio.current = setTimeout(() => setCopiado(null), 2500)
  }

  return (
    <section id="contato" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-linha bg-surface p-6 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Vamos conversar
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-pretty text-suave">
            Está com um projeto de dados em mãos ou procurando um analista para o time?
            Me chame por qualquer um dos canais abaixo.
          </p>

          {/* min-w-0 no <li>: sem isso o item de grade cresce ate caber o texto
              inteiro e o cartao vaza para fora da tela no celular */}
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {itens.map((item) => (
              <li key={item.rotulo} className="min-w-0">
                {item.copiar ? (
                  <button type="button" onClick={aoCopiar} className={CARTAO}>
                    <span className="min-w-0">
                      <span className="block text-xs text-suave">
                        {item.rotulo}
                        <span aria-live="polite">
                          {copiado === 'ok' && (
                            <span className="ml-1.5 font-medium text-emerald-400">
                              copiado
                            </span>
                          )}
                          {copiado === 'falhou' && (
                            <span className="ml-1.5 font-medium text-amber-400">
                              copie manualmente
                            </span>
                          )}
                        </span>
                      </span>
                      <span className="block truncate text-sm font-medium text-texto">
                        {item.valor}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 transition-colors ${
                        copiado === 'ok'
                          ? 'text-emerald-400'
                          : 'text-suave group-hover:text-destaque-suave'
                      }`}
                    >
                      {copiado === 'ok' ? '✓' : '⧉'}
                    </span>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={CARTAO}
                  >
                    <span className="min-w-0">
                      <span className="block text-xs text-suave">{item.rotulo}</span>
                      <span className="block truncate text-sm font-medium text-texto">
                        {item.valor}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-suave transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-destaque-suave"
                    >
                      →
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
