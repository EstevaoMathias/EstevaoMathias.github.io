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

// Monta a lista de links a partir do que estiver preenchido em perfil.contato.
function montarLinks({ email, linkedin, github, curriculo }) {
  const links = []

  if (email) links.push({ rotulo: 'E-mail', valor: email, href: `mailto:${email}` })
  if (linkedin)
    links.push({
      rotulo: 'LinkedIn',
      valor: paraExibir(linkedin),
      href: linkedin,
      externo: true,
    })
  if (github)
    links.push({
      rotulo: 'GitHub',
      valor: paraExibir(github),
      href: github,
      externo: true,
    })
  if (curriculo)
    links.push({
      rotulo: 'Currículo',
      valor: 'Baixar em PDF',
      href: curriculo,
      externo: true,
    })

  return links
}

export default function Contato() {
  const links = montarLinks(perfil.contato)

  return (
    <section id="contato" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-linha bg-surface p-8 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Vamos conversar
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-pretty text-suave">
            Está com um projeto de dados em mãos ou procurando um analista para o time?
            Me chame por qualquer um dos canais abaixo.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {links.map((link) => (
              <li key={link.rotulo}>
                <a
                  href={link.href}
                  {...(link.externo ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-linha bg-base px-4 py-3.5 transition-colors hover:border-destaque/60"
                >
                  <span className="min-w-0">
                    <span className="block text-xs text-suave">{link.rotulo}</span>
                    <span className="block truncate text-sm font-medium text-texto">
                      {link.valor}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-suave transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-destaque-suave"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
