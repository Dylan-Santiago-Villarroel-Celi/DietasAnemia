"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useWheelStore } from "@/store/wheelStore";

const steps = [
  {
    step: "01",
    title: "Gira la ruleta",
    description:
      "La ruleta elegirá una categoría pendiente de forma aleatoria para ti.",
    icon: "🎯",
  },
  {
    step: "02",
    title: "Elige un alimento",
    description:
      "Selecciona una opción con imagen y aprende cómo aporta al hierro.",
    icon: "🥗",
  },
  {
    step: "03",
    title: "Descubre tu plato",
    description:
      "Al completar las 4 categorías, obtendrás una combinación final con receta.",
    icon: "🍽️",
  },
];

export default function TutorialPage() {
  const knowsAboutAnemia = useWheelStore((s) => s.knowsAboutAnemia);
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6
      bg-gradient-to-br from-orange-100 via-orange-200 to-amber-200"
    >
      <div className="w-full max-w-md space-y-6">

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
            width={120}
            height={120}
            priority
          />
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl bg-white/80 backdrop-blur border
          shadow-sm p-6 space-y-5"
        >
          {/* EXPLICACIÓN SOBRE ANEMIA (si no sabe) */}
          {knowsAboutAnemia === false && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 rounded-2xl bg-red-50 border border-red-200 p-4"
            >
              <h2 className="text-lg font-semibold text-red-900">
                📍 ¿Qué es la anemia?
              </h2>

              <div className="space-y-3 text-sm text-red-900">
                <div>
                  <p className="font-medium mb-1">🔴 Definición:</p>
                  <p className="leading-snug">
                    La anemia ocurre cuando tu cuerpo no tiene suficientes glóbulos rojos sanos. Estos transportan oxígeno a todas partes de tu cuerpo.
                  </p>
                </div>

                <div>
                  <p className="font-medium mb-1">⚠️ Síntomas:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Cansancio extremo</li>
                    <li>Debilidad</li>
                    <li>Dificultad para respirar</li>
                    <li>Mareos</li>
                    <li>Palidez en la piel</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium mb-1">🔑 Causa principal:</p>
                  <p className="leading-snug">
                    Falta de <strong>hierro</strong>. Tu cuerpo necesita hierro para producir hemoglobina (la proteína que transporta oxígeno).
                  </p>
                </div>

                <div>
                  <p className="font-medium mb-1">💡 Solución:</p>
                  <p className="leading-snug">
                    Consumir alimentos ricos en hierro y combinarlos correctamente para que tu cuerpo los absorba mejor.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-3 border border-red-100">
                  <p className="text-xs font-medium text-neutral-700">
                    ℹ️ Eso es exactamente lo que aprenderás con la Ruleta de Hierro.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <h1 className="text-2xl font-semibold text-neutral-900 text-center">
            ¿Cómo funciona?
          </h1>

          {/* STEPS */}
          <div className="space-y-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.15 }}
                className="flex gap-4 items-start rounded-2xl
                bg-orange-50 border border-orange-100 p-4"
              >
                {/* ICON */}
                <div className="text-2xl">{s.icon}</div>

                {/* TEXT */}
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-neutral-900">
                    {s.title}
                  </p>
                  <p className="text-sm text-neutral-700 leading-snug">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 px-4 py-3 rounded-2xl border
              text-sm text-center hover:bg-neutral-50 transition"
            >
              Volver
            </Link>

            <Link
              href="/wheel"
              className="flex-1 px-4 py-3 rounded-2xl
              bg-neutral-900 text-white text-sm font-medium
              text-center hover:bg-neutral-800 transition"
            >
              Ir a la ruleta
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
