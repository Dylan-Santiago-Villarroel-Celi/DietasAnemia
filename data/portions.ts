import { CategoryId } from "@/store/wheelStore";

export type PortionInfo = {
  grams: string;        // "80–100 g"
  measure: string;      // "1 filete pequeño o la palma de la mano"
  iron?: string;        // "~6.5–9.0 mg"
};

// porciones solo para los items que tienes en tu tabla ejemplo
export const PORTIONS: Partial<Record<CategoryId, Record<string, PortionInfo>>> =
  {
    heme: {
      higado: {
        grams: "80–100 g",
        measure: "1 filete pequeño o la palma de la mano",
        iron: "~6.5–9.0 mg",
      },
      sangrecita: {
        grams: "100 g",
        measure: "5 cucharadas soperas colmadas",
        iron: "~29.5 mg (¡súper fuente!)",
      },
      res: {
        grams: "100–120 g",
        measure: "1 filete mediano (tamaño de una baraja)",
        iron: "~2.5–3.0 mg",
      },
      atun: {
        grams: "120 g",
        measure: "1 lata pequeña o 1 posta mediana",
        iron: "~1.3–1.5 mg",
      },
      trucha: {
        grams: "120 g",
        measure: "1 posta mediana",
        iron: "~1.3–1.5 mg",
      },
    },

    "non-heme": {
      lentejas: {
        grams: "60–80 g (crudo)",
        measure: "1 taza mediana cocida",
        iron: "~3.3–3.5 mg",
      },
      frejol: {
        grams: "60–80 g (crudo)",
        measure: "1 taza mediana cocida",
        iron: "~3.3–3.5 mg",
      },
      chochos: {
        grams: "100 g",
        measure: "1 taza pequeña (repleta)",
        iron: "~1.9 mg",
      },
      espinaca: {
        grams: "100 g",
        measure: "1/2 taza (se reduce mucho al cocer)",
        iron: "~2.7 mg",
      },
      avena: {
        grams: "40–50 g",
        measure: "1/2 taza o 4 cucharadas soperas",
        iron: "~1.5–2.0 mg",
      },
      amaranto: {
        grams: "40–50 g",
        measure: "1/2 taza o 4 cucharadas soperas",
        iron: "~1.5–2.0 mg",
      },
    },
  };

/** Devuelve porción/gramos/hierro si existe, o null si no está definido */
export function getPortion(catId: CategoryId, itemId: string) {
  const byCat = PORTIONS[catId];
  return byCat?.[itemId] ?? null;
}
