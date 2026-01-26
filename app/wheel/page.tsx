"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useWheelStore } from "@/store/wheelStore";
import { SpinWheel } from "@/components/SpinWheel";
import { motion } from "framer-motion";

export default function WheelPage() {
  const remaining = useWheelStore((s) => s.remaining);
  const reset = useWheelStore((s) => s.reset);

  const progress = useMemo(() => {
    const done = 4 - remaining.length;
    return { done, total: 4 };
  }, [remaining.length]);

  const allDone = remaining.length === 0;

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
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Image
            src="/logo.png"
            alt="FerryGood"
            width={100}
            height={100}
            priority
          />
        </motion.div>

        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900">
              ¡Gira la ruleta!
            </h1>
            <p className="text-sm text-neutral-700 font-medium">
              Opción {progress.done + 1} de {progress.total}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="px-3 py-2 rounded-xl border text-sm
            bg-white/70 backdrop-blur hover:bg-white transition
            font-medium"
          >
            🔄 Reiniciar
          </motion.button>
        </div>

        {/* BARRA DE PROGRESO MEJORADA */}
        <div className="space-y-2">
          <motion.div
            className="h-3 rounded-full bg-white/60 overflow-hidden shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
              initial={{ width: 0 }}
              animate={{ width: `${(progress.done / progress.total) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
          <div className="flex justify-between items-center px-1">
            <p className="text-xs text-neutral-600">Progreso</p>
            <p className="text-xs font-semibold text-orange-600">
              {progress.done}/{progress.total}
            </p>
          </div>
        </div>

        {/* TARJETA MOTIVACIONAL */}
        {progress.done > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-green-50 border border-green-200 p-3"
          >
            <p className="text-sm text-green-900 text-center font-medium">
              ✨ ¡Vas muy bien! {progress.done > 1 ? "Casi terminas" : "Sigue adelante"}
            </p>
          </motion.div>
        )}

        {/* CARD RULETA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-3xl bg-white/80 backdrop-blur border
          shadow-md p-6 space-y-4"
        >
          {/* ENCABEZADO RULETA */}
          <div className="text-center">
            <p className="text-sm font-medium text-neutral-700">
              Elige tu próxima categoría
            </p>
          </div>

          <SpinWheel remaining={remaining} />

          <p className="text-xs text-neutral-600 text-center pt-2">
            🎯 Toca la ruleta o presiona <strong>Girar</strong>
            <br />
            No hay opciones incorrectas, ¡todas son nutritivas! 💚
          </p>
        </motion.div>

        {/* TARJETA DE INFORMACIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl bg-blue-50 border border-blue-200 p-4 space-y-2"
        >
          <p className="text-xs font-semibold text-blue-900">💡 Consejo:</p>
          <p className="text-xs text-blue-900 leading-snug">
            {progress.done === 0 && "Cada alimento es importante para tu salud. ¡No hay presión, solo aprendizaje!"}
            {progress.done === 1 && "Vas muy bien. Cada selección suma a tu nutrición. 🌟"}
            {progress.done === 2 && "¡A mitad de camino! Tus selecciones están formando un plato balanceado. 🍽️"}
            {progress.done >= 3 && "¡Casi terminas! Una última selección y tendrás tu receta personalizada. 🎉"}
          </p>
        </motion.div>

        {/* CTA FINAL */}
        <div className="flex gap-3 pt-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Link
              href="/tutorial"
              className="block px-4 py-3 rounded-2xl border
              bg-white/70 backdrop-blur text-sm text-center
              hover:bg-white transition font-medium text-neutral-900"
            >
              ← Volver
            </Link>
          </motion.div>

          <motion.div
            whileHover={allDone ? { scale: 1.02 } : {}}
            whileTap={allDone ? { scale: 0.98 } : {}}
            className="flex-1"
          >
            <Link
              href={allDone ? "/result" : "/wheel"}
              className={`block px-4 py-3 rounded-2xl text-sm font-medium
                text-center transition
                ${
                  allDone
                    ? "bg-gradient-to-r from-neutral-900 to-neutral-800 text-white hover:shadow-lg shadow-neutral-900/20"
                    : "bg-neutral-200 text-neutral-600 cursor-not-allowed"
                }`}
              aria-disabled={!allDone}
            >
              {allDone ? "🎉 Ver mi plato final" : "⏳ Completa las 4 opciones"}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
