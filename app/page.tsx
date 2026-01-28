"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6
      bg-gradient-to-br from-orange-100 via-orange-200 to-amber-200"
    >
      <div className="w-full max-w-md space-y-6 text-center">

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <Image
            src="/logo.png"
            alt="FerryGood - Recetas & Hierro para ti"
            width={180}
            height={180}
            priority
          />
        </motion.div>

        {/* TÍTULO */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-semibold text-neutral-900"
        >
          Bienvenido/a
        </motion.h1>

        {/* TEXTO */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-base text-neutral-700 leading-relaxed"
        >
          Si últimamente te has sentido cansado/a, sin energía o con dificultad para
          concentrarte, esta aplicación puede ayudarte.
          <br />
          <br />
          Aprende a <span className="font-medium">elegir y combinar alimentos </span> 
          para apoyar la absorción de hierro de forma sencilla y práctica.
        </motion.p>

        {/* BOTONES */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 pt-4 justify-center"
        >
          <Link
            href="/register"
            className="px-6 py-3 rounded-2xl bg-neutral-900 text-white text-sm font-medium
            hover:bg-neutral-800 transition"
          >
            Comenzar
          </Link>

        </motion.div>

      </div>
    </main>
  );
}
