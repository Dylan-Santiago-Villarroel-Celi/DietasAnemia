import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Registro</h1>

        <div className="space-y-3">
          <label className="block text-sm">
            Nombre
            <input
              className="mt-1 w-full rounded-xl border p-3"
              placeholder="Ej: Dylan"
            />
          </label>

          <label className="block text-sm">
            Edad
            <input
              className="mt-1 w-full rounded-xl border p-3"
              placeholder="Ej: 18"
              inputMode="numeric"
            />
          </label>

          <div className="space-y-2">
            <p className="text-sm">¿Te han diagnosticado anemia?</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl border text-sm">Sí</button>
              <button className="px-4 py-2 rounded-xl border text-sm">No</button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/" className="px-4 py-2 rounded-xl border text-sm">
            Volver
          </Link>
          <Link
            href="/tutorial"
            className="px-4 py-2 rounded-xl bg-black text-white text-sm"
          >
            Continuar
          </Link>
        </div>
      </div>
    </main>
  );
}
