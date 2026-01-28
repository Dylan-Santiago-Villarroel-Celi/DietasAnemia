"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
      <main className="min-h-screen flex items-center justify-center px-6
        bg-gradient-to-br from-orange-100 via-orange-200 to-amber-200">
        <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur
          border shadow-sm p-6 space-y-4 text-center">
          <h1 className="text-xl font-semibold">Categoría no válida</h1>
          <Link
            href="/wheel"
            className="px-4 py-3 rounded-2xl border text-sm
            hover:bg-neutral-50 transition"
          >
            Volver a la ruleta
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
    <main
      className="min-h-screen flex items-center justify-center px-6 py-10
      bg-gradient-to-br from-orange-100 via-orange-200 to-amber-200"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-5"
      >
        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-neutral-900">
            {data.title}
          </h1>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {data.intro}
          </p>
        </div>

        {alreadyDone && (
          <div className="rounded-2xl border bg-white/70 backdrop-blur
            p-3 text-sm text-neutral-700">
            Ya completaste esta categoría.  
            Puedes volver a la ruleta para continuar.
          </div>
        )}

        {/* GRID DE OPCIONES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-3"
        >
          {data.items.map((it, index) => {
            const isActive = selected === it.id;

            return (
              <motion.button
                key={it.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => setSelected(it.id)}
                disabled={alreadyDone}
                className={`rounded-2xl border p-3 text-left transition
                  ${
                    isActive
                      ? "border-orange-500 ring-2 ring-orange-300 bg-orange-50"
                      : "bg-white hover:bg-neutral-50"
                  }
                  ${alreadyDone ? "opacity-60 cursor-not-allowed" : ""}
                `}
              >
                {it.image ? (
                  <img
                    src={it.image}
                    alt={it.name}
                    className="h-28 w-full rounded-xl object-cover mb-2"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-28 rounded-xl bg-neutral-100 mb-2" />
                )}

                <div className="font-medium text-sm text-neutral-900">
                  {it.name}
                </div>
                <div className="text-xs text-neutral-600 leading-snug">
                  {it.note}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ACTIONS */}
        {/* Botones ahora flotantes, ver abajo */}

        {/* BOTONES FLOTANTES CUANDO SE SELECCIONA */}
        {selected && !alreadyDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 w-full max-w-md px-6 z-40"
          >
            <button
              onClick={() => setSelected(null)}
              className="flex-1 px-4 py-3 rounded-2xl border bg-white/90 backdrop-blur
              text-sm font-medium hover:bg-white transition text-neutral-900"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 rounded-2xl bg-green-500 text-white
              text-sm font-medium hover:bg-green-600 transition shadow-lg"
            >
              ✓ Guardar
            </button>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
