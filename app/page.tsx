import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-semibold">Bienvenido/a</h1>
        <p className="text-sm text-neutral-600">
          Mensaje inicial empático (placeholder). Esta app te ayuda a elegir alimentos
          y combinarlos para apoyar la absorción de hierro.
        </p>

        <div className="flex gap-3">
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-black text-white text-sm"
          >
            Comenzar
          </Link>
          <Link
            href="/tutorial"
            className="px-4 py-2 rounded-xl border text-sm"
          >
            Ver tutorial
          </Link>
        </div>
      </div>
    </main>
  );
}
