"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";

import { useWheelStore, CategoryId } from "@/store/wheelStore";
import { CATEGORIES, getItemById } from "@/data/foods";
import { generateRecipe } from "@/lib/recipe";

const order: CategoryId[] = ["heme", "non-heme", "enhancers", "inhibitors"];

export default function ResultPage() {
  const selections = useWheelStore((s) => s.selections);
  const reset = useWheelStore((s) => s.reset);

  const exportRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLDivElement | null>(null);

  const [exporting, setExporting] = useState(false);
  const [showStory, setShowStory] = useState(false);

  const picked = useMemo(() => {
    return order
      .map((catId) => {
        const itemId = selections[catId];
        if (!itemId) return null;
        const item = getItemById(catId, itemId);
        return item
          ? { catId, categoryTitle: CATEGORIES[catId].title, ...item }
          : null;
      })
      .filter(Boolean) as Array<{
        catId: CategoryId;
        categoryTitle: string;
        id: string;
        name: string;
      }>;
  }, [selections]);

  const recipe = useMemo(() => {
    return generateRecipe(
      picked.map((p) => ({ catId: p.catId, id: p.id, name: p.name }))
    );
  }, [picked]);

  const isComplete = picked.length === 4;

  const safeTitle = recipe.title
    .replaceAll("/", "-")
    .replaceAll(":", "")
    .replaceAll("—", "-")
    .trim();

  const getFeedPng = async () => {
    if (!exportRef.current) throw new Error("Export ref no disponible");

    return await toPng(exportRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#FFF7ED",
    });
  };

  const downloadPng = async () => {
    if (!exportRef.current) return;

    const download = (dataUrl: string, name: string) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = name;
      a.click();
    };

    try {
      setExporting(true);

      // PNG FEED (solo receta)
      const feedPng = await getFeedPng();
      download(feedPng, `receta-${safeTitle}-feed.png`);
    } finally {
      setExporting(false);
    }
  };

  const shareRecipe = async () => {
    if (!exportRef.current) return;

    try {
      setExporting(true);

      const dataUrl = await getFeedPng();

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `receta-${safeTitle}.png`, {
        type: "image/png",
      });

      const canShare =
        typeof navigator !== "undefined" &&
        // @ts-ignore
        typeof navigator.canShare === "function" &&
        // @ts-ignore
        navigator.canShare({ files: [file] }) &&
        typeof navigator.share === "function";

      if (canShare) {
        // @ts-ignore
        await navigator.share({
          title: "Mi receta (FerryGood)",
          text: "Mira mi receta 🍽️",
          files: [file],
        });
      } else {
        // Fallback: descargar el feed png
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `receta-${safeTitle}-feed.png`;
        a.click();
      }
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-start justify-center px-6 py-10 bg-gradient-to-br from-orange-100 via-orange-200 to-amber-200">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-6"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="FerryGood" width={44} height={44} />
              <h1 className="text-3xl font-semibold text-neutral-900">
                Tu plato final
              </h1>
            </div>
            <p className="text-sm text-neutral-700">
              Esta combinación puede ayudarte a aprovechar mejor el hierro.
            </p>
          </div>

          <button
            onClick={reset}
            className="px-3 py-2 rounded-xl border bg-white/70 backdrop-blur text-sm"
          >
            Reiniciar
          </button>
        </div>

        {/* BLOQUE EXPORTABLE FEED (solo receta) */}
        <div
          ref={exportRef}
          className="rounded-3xl bg-white/80 backdrop-blur border shadow-sm p-5 space-y-4"
        >
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="FerryGood" width={44} />
            <h2 className="text-lg font-semibold text-neutral-900">
              {recipe.title}
            </h2>
          </div>

          <div>
            <p className="font-semibold text-sm">Ingredientes</p>
            <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
              {recipe.ingredients.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm">Preparación</p>
            <ol className="list-decimal pl-5 text-sm text-neutral-700 space-y-1">
              {recipe.steps.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ol>
          </div>

          <div>
            <p className="font-semibold text-sm">Beneficios</p>
            <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
              {recipe.benefits.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>

          {recipe.warnings.length > 0 && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-3">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-lg leading-none">⚠️</span>
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Advertencia
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-red-700">
                    {recipe.warnings.map((w, i) => (
                      <li key={i} className="leading-snug">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="text-[11px] text-neutral-500">
            Generado por FerryGood • Recetas & hierro para ti
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex gap-3">
          <button
            onClick={downloadPng}
            disabled={!isComplete || exporting}
            className={`flex-1 px-4 py-3 rounded-2xl text-sm font-medium ${
              exporting || !isComplete
                ? "bg-neutral-200 text-neutral-600"
                : "bg-white/80 backdrop-blur border hover:bg-white"
            }`}
          >
            {exporting ? "Generando..." : "Descargar"}
          </button>

          <button
            onClick={shareRecipe}
            disabled={!isComplete || exporting}
            className={`flex-1 px-4 py-3 rounded-2xl text-sm font-medium ${
              exporting || !isComplete
                ? "bg-neutral-200 text-neutral-600"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
          >
            {exporting ? "Generando..." : "Compartir"}
          </button>
        </div>

        <Link
          href="/wheel"
          className="block px-4 py-3 rounded-2xl border bg-white/70 backdrop-blur text-sm text-center"
        >
          Volver a la ruleta
        </Link>
      </motion.div>

      {/* OVERLAY STORY (visible solo al exportar) */}
      {showStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            ref={storyRef}
            style={{ width: 1080, height: 1920 }}
            className="bg-gradient-to-br from-orange-100 via-orange-200 to-amber-200 flex items-center justify-center"
          >
            <div className="w-[900px] rounded-3xl bg-white/95 p-10 space-y-6 border">
              <div className="flex items-center gap-4">
                <img src="/logo.png" alt="FerryGood" width={72} />
                <h1 className="text-3xl font-semibold">{recipe.title}</h1>
              </div>

              <div>
                <h2 className="font-semibold">Ingredientes</h2>
                <ul className="text-sm text-neutral-700 space-y-1">
                  {recipe.ingredients.map((x, i) => (
                    <li key={i} className="leading-relaxed">
                      • {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-semibold">Preparación</h2>
                <ol className="list-decimal pl-5 text-base space-y-1">
                  {recipe.steps.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="font-semibold">Beneficios</h2>
                <ul className="list-disc pl-5 text-base space-y-1">
                  {recipe.benefits.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>

              {recipe.warnings.length > 0 && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-2xl leading-none">⚠️</span>
                    <div>
                      <p className="text-base font-semibold text-red-700">
                        Advertencia
                      </p>
                      <ul className="mt-1 space-y-1 text-base text-red-700">
                        {recipe.warnings.map((w, i) => (
                          <li key={i} className="leading-snug">
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center text-sm text-neutral-600">
                FerryGood 💛 Recetas & hierro para ti
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
