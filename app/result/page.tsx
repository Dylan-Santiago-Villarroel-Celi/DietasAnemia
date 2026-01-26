import Link from "next/link";

export default function ResultPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Plato final</h1>
        <div className="h-44 rounded-2xl bg-neutral-100" />

        <div className="rounded-2xl border p-4 space-y-3">
          <div>
            <p className="text-sm font-medium">Nombre del plato</p>
            <p className="text-sm text-neutral-600">Placeholder</p>
          </div>

          <div>
            <p className="text-sm font-medium">Ingredientes</p>
            <p className="text-sm text-neutral-600">Placeholder</p>
          </div>

          <div>
            <p className="text-sm font-medium">Preparación</p>
            <p className="text-sm text-neutral-600">Placeholder</p>
          </div>

          <div>
            <p className="text-sm font-medium">Beneficios</p>
            <p className="text-sm text-neutral-600">Placeholder</p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/wheel" className="px-4 py-2 rounded-xl border text-sm">
            Volver a ruleta
          </Link>
          <Link href="/" className="px-4 py-2 rounded-xl bg-black text-white text-sm">
            Reiniciar
          </Link>
        </div>
      </div>
    </main>
  );
}
