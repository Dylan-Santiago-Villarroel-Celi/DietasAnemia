"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useWheelStore } from "@/store/wheelStore";

export default function RegisterPage() {
  const [diagnosed, setDiagnosed] = useState<"yes" | "no" | null>(null);
  const [knowsAboutAnemia, setKnowsAboutAnemiaLocal] = useState<"yes" | "no" | null>(null);
  const setKnowsAboutAnemia = useWheelStore((s) => s.setKnowsAboutAnemia);

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
            width={140}
            height={140}
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
          <h1 className="text-2xl font-semibold text-neutral-900 text-center">
            Cuéntanos un poco de ti
          </h1>

          {/* INPUTS */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">
                Nombre
              </label>
              <input
                className="mt-1 w-full rounded-2xl border border-neutral-300
                px-4 py-3 text-sm focus:outline-none focus:ring-2
                focus:ring-orange-300 bg-white"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700">
                Edad
              </label>
              <input
                className="mt-1 w-full rounded-2xl border border-neutral-300
                px-4 py-3 text-sm focus:outline-none focus:ring-2
                focus:ring-orange-300 bg-white"
                inputMode="numeric"
                placeholder="Tu edad"
              />
            </div>

            {/* TOGGLE ANEMIA */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-700">
                ¿Te han diagnosticado anemia?
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDiagnosed("yes")}
                  className={`flex-1 px-4 py-3 rounded-2xl text-sm font-medium transition
                    ${
                      diagnosed === "yes"
                        ? "bg-orange-500 text-white shadow"
                        : "bg-white border hover:bg-orange-50"
                    }`}
                >
                  Sí
                </button>

                <button
                  type="button"
                  onClick={() => setDiagnosed("no")}
                  className={`flex-1 px-4 py-3 rounded-2xl text-sm font-medium transition
                    ${
                      diagnosed === "no"
                        ? "bg-orange-500 text-white shadow"
                        : "bg-white border hover:bg-orange-50"
                    }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* TOGGLE KNOWS ABOUT ANEMIA */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-700">
                ¿Sabes lo que es la anemia?
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setKnowsAboutAnemiaLocal("yes")}
                  className={`flex-1 px-4 py-3 rounded-2xl text-sm font-medium transition
                    ${
                      knowsAboutAnemia === "yes"
                        ? "bg-green-500 text-white shadow"
                        : "bg-white border hover:bg-green-50"
                    }`}
                >
                  Sí
                </button>

                <button
                  type="button"
                  onClick={() => setKnowsAboutAnemiaLocal("no")}
                  className={`flex-1 px-4 py-3 rounded-2xl text-sm font-medium transition
                    ${
                      knowsAboutAnemia === "no"
                        ? "bg-green-500 text-white shadow"
                        : "bg-white border hover:bg-green-50"
                    }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 px-4 py-3 rounded-2xl border text-sm
              text-center hover:bg-neutral-50 transition"
            >
              Volver
            </Link>

            <button
              onClick={() => {
                if (knowsAboutAnemia !== null) {
                  setKnowsAboutAnemia(knowsAboutAnemia === "yes");
                }
              }}
              type="button"
              className="flex-1 px-4 py-3 rounded-2xl
              bg-neutral-900 text-white text-sm font-medium
              text-center hover:bg-neutral-800 transition disabled:opacity-50"
              disabled={knowsAboutAnemia === null}
            >
              <Link href="/tutorial">
                Continuar
              </Link>
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
