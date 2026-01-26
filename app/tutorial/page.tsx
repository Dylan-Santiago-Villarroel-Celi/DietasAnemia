import Link from "next/link";

export default function TutorialPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Cómo funciona</h1>

        <ol className="space-y-3 text-sm text-neutral-700">
          <li className="rounded-xl border p-3">1) Gira la ruleta</li>
          <li className="rounded-xl border p-3">2) Elige una opción con imagen</li>
          <li className="rounded-xl border p-3">
            3) Completa las 4 categorías y obtén tu plato final
          </li>
        </ol>

        <div className="flex gap-3 pt-2">
          <Link href="/" className="px-4 py-2 rounded-xl border text-sm">
            Volver
          </Link>
          <Link
            href="/wheel"
            className="px-4 py-2 rounded-xl bg-black text-white text-sm"
          >
            Ir a la ruleta
          </Link>
        </div>
      </div>
    </main>
  );
}
