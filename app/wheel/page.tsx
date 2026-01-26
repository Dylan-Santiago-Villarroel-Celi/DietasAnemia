"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useWheelStore } from "@/store/wheelStore";
import { SpinWheel } from "@/components/SpinWheel";

export default function WheelPage() {
  const remaining = useWheelStore((s) => s.remaining);
  const selections = useWheelStore((s) => s.selections);
  const reset = useWheelStore((s) => s.reset);

  const progress = useMemo(() => {
    const done = 4 - remaining.length;
    return { done, total: 4 };
  }, [remaining.length]);

  const allDone = remaining.length === 0;

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Ruleta</h1>
            <p className="text-sm text-neutral-600">
              Progreso: {progress.done}/{progress.total}
            </p>
          </div>

          <button
            onClick={reset}
            className="px-3 py-2 rounded-xl border text-sm hover:bg-neutral-50"
          >
            Reiniciar
          </button>
        </div>

        <div className="rounded-2xl border p-4">
          <SpinWheel remaining={remaining} />
        </div>

        {/* Resumen rápido */}
        <div className="rounded-2xl border p-4 space-y-2">
          <p className="text-sm font-medium">Selecciones</p>
          <pre className="text-xs bg-neutral-50 border rounded-xl p-3 overflow-auto">
{JSON.stringify(selections, null, 2)}
          </pre>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/tutorial" className="px-4 py-2 rounded-xl border text-sm">
            Volver
          </Link>

          <Link
            href={allDone ? "/result" : "/wheel"}
            className={`px-4 py-2 rounded-xl text-sm ${
              allDone ? "bg-black text-white" : "bg-neutral-200 text-neutral-600"
            }`}
            aria-disabled={!allDone}
          >
            {allDone ? "Ver plato final" : "Completa las 4 opciones"}
          </Link>
        </div>
      </div>
    </main>
  );
}
