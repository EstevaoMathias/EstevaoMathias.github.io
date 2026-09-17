import { perfil } from '../data/perfil.js'

export default function Sobre() {
  return (
    <section id="sobre" className="border-b border-linha px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Sobre</h2>

        <div className="space-y-5 lg:col-span-2">
          {perfil.sobre.map((paragrafo) => (
            <p key={paragrafo} className="text-lg leading-relaxed text-pretty text-suave">
              {paragrafo}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
