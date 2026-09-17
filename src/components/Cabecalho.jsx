import { useEffect, useState } from 'react'
import { perfil } from '../data/perfil.js'

const secoes = [
  { href: '#projetos', rotulo: 'Projetos' },
  { href: '#sobre', rotulo: 'Sobre' },
  { href: '#ferramentas', rotulo: 'Ferramentas' },
  { href: '#contato', rotulo: 'Contato' },
]

export default function Cabecalho() {
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 16)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        rolou
          ? 'border-b border-linha bg-base/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#topo"
          className="text-sm font-semibold tracking-tight text-texto transition-colors hover:text-destaque-suave"
        >
          {perfil.nome}
        </a>

        <nav aria-label="Seções do site">
          <ul className="flex items-center gap-1 sm:gap-2">
            {secoes.map((secao) => (
              <li key={secao.href}>
                <a
                  href={secao.href}
                  className="rounded-md px-2 py-1.5 text-xs font-medium text-suave transition-colors hover:bg-surface hover:text-texto sm:px-3 sm:text-sm"
                >
                  {secao.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
