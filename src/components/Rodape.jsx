import { perfil } from '../data/perfil.js'

export default function Rodape() {
  return (
    <footer className="border-t border-linha px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-suave sm:flex-row">
        <p>
          © {new Date().getFullYear()} {perfil.nome}
        </p>
        <a href="#topo" className="transition-colors hover:text-texto">
          Voltar ao topo <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
