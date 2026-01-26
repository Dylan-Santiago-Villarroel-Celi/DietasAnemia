"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useWheelStore, CategoryId } from "@/store/wheelStore";
import { CATEGORIES } from "@/data/foods";

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const saveSelection = useWheelStore((s) => s.saveSelection);
  const remaining = useWheelStore((s) => s.remaining);

  const categoryId = params.id as CategoryId;

  const data = useMemo(() => CATEGORIES[categoryId], [categoryId]);
  const [selected, setSelected] = useState<string | null>(null);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-3">
          <h1 className="text-xl font-semibold">Categoría no válida</h1>
          <Link href="/wheel" className="px-4 py-2 rounded-xl border text-sm">
            Volver a ruleta
          </Link>
        </div>
      </main>
    );
  }

  const alreadyDone = !remaining.includes(categoryId);

  const handleSave = () => {
    if (!selected) return;
    saveSelection(categoryId, selected);
    router.push("/wheel");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">{data.title}</h1>

        {alreadyDone && (
          <div className="rounded-xl border bg-neutral-50 p-3 text-sm">
            Ya completaste esta categoría. Puedes elegir otra en la ruleta.
          </div>
        )}

        <p className="text-sm text-neutral-600">
          {data.intro ?? "Área de explicación (placeholder). Aquí irá tu texto educativo."}
        </p>

        <div className="space-y-2">
          <p className="text-sm font-medium">Elige un alimento</p>

          <div className="grid grid-cols-2 gap-2">
            {data.items.map((it) => {
              const isActive = selected === it.id;

              return (
                <button
                  key={it.id}
                  onClick={() => setSelected(it.id)}
                  className={`rounded-xl border p-3 text-sm text-left hover:bg-neutral-50 ${
                    isActive ? "border-black" : ""
                  }`}
                  disabled={alreadyDone}
                >
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.name}
                      className="h-24 w-full rounded-lg object-cover mb-2 bg-neutral-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-24 rounded-lg bg-neutral-100 mb-2" />
                  )}

                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-neutral-500">
                    {it.note ?? "Descripción (placeholder)"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/wheel" className="px-4 py-2 rounded-xl border text-sm">
            Volver a ruleta
          </Link>

          <button
            onClick={handleSave}
            disabled={alreadyDone || !selected}
            className={`px-4 py-2 rounded-xl text-sm ${
              alreadyDone || !selected
                ? "bg-neutral-200 text-neutral-600"
                : "bg-black text-white"
            }`}
          >
            Guardar selección
          </button>
        </div>
      </div>
    </main>
  );
}
