import { CategoryId } from "@/store/wheelStore";

export type FoodItem = {
  id: string;
  name: string;
  image?: string;
  note?: string;
};

export type CategoryData = {
  id: CategoryId;
  title: string;
  intro?: string;
  items: FoodItem[];
};

export const CATEGORIES: Record<CategoryId, CategoryData> = {
  enhancers: {
    id: "enhancers",
    title: "Potenciadores (Equipo de Activación)",
    intro: "Placeholder: Explicación general de cómo la vitamina C ayuda a absorber el hierro.",
    items: [
      { id: "limon", name: "Limón", image: "/foods/enhancers/limon.jpg", note: "Placeholder" },
      { id: "naranja", name: "Naranja", image: "/foods/enhancers/naranja.jpg", note: "Placeholder" },
      { id: "mandarina", name: "Mandarina", image: "/foods/enhancers/mandarina.jpg", note: "Placeholder" },
      { id: "tomate-arbol", name: "Tomate de árbol", image: "/foods/enhancers/tomate-arbol.jpg", note: "Placeholder" },
      { id: "guayaba", name: "Guayaba", image: "/foods/enhancers/guayaba.jpg", note: "Placeholder" },
      { id: "mora", name: "Mora", image: "/foods/enhancers/mora.jpg", note: "Placeholder" },
      { id: "pimiento-rojo", name: "Pimiento rojo (crudo)", image: "/foods/enhancers/pimiento-rojo.jpg", note: "Placeholder" },
      { id: "brocoli", name: "Brócoli", image: "/foods/enhancers/brocoli.jpg", note: "Placeholder" },
    ],
  },

  heme: {
    id: "heme",
    title: "Hierro hemo (Súper Combustible)",
    intro: "Placeholder: Qué es el hierro hemo y por qué se absorbe más fácilmente.",
    items: [
      { id: "higado", name: "Hígado", image: "/foods/heme/higado.jpg", note: "Placeholder" },
      { id: "corazon", name: "Corazón", image: "/foods/heme/corazon.jpg", note: "Placeholder" },
      { id: "rinon", name: "Riñón", image: "/foods/heme/rinon.jpg", note: "Placeholder" },

      { id: "res", name: "Carne de res", image: "/foods/heme/res.jpg", note: "Placeholder" },
      { id: "cerdo", name: "Cerdo", image: "/foods/heme/cerdo.jpg", note: "Placeholder" },
      { id: "pollo", name: "Pollo", image: "/foods/heme/pollo.jpg", note: "Placeholder" },

      { id: "atun", name: "Atún", image: "/foods/heme/atun.jpg", note: "Placeholder" },
      { id: "sardina", name: "Sardina", image: "/foods/heme/sardina.jpg", note: "Placeholder" },
      { id: "trucha", name: "Trucha", image: "/foods/heme/trucha.jpg", note: "Placeholder" },

      { id: "conchas", name: "Conchas", image: "/foods/heme/conchas.jpg", note: "Placeholder" },
      { id: "camaron", name: "Camarón", image: "/foods/heme/camaron.jpg", note: "Placeholder" },
    ],
  },

  "non-heme": {
    id: "non-heme",
    title: "Hierro no hemo (Diamantes en Bruto)",
    intro: "Placeholder: Recuerda combinar siempre con potenciadores (vitamina C).",
    items: [
      { id: "lentejas", name: "Lentejas", image: "/foods/non-heme/lentejas.jpg", note: "Placeholder" },
      { id: "chochos", name: "Chochos", image: "/foods/non-heme/chochos.jpg", note: "Placeholder" },
      { id: "frejol", name: "Fréjol", image: "/foods/non-heme/frejol.jpg", note: "Placeholder" },

      { id: "espinaca", name: "Espinaca", image: "/foods/non-heme/espinaca.jpg", note: "Placeholder" },
      { id: "acelga", name: "Acelga", image: "/foods/non-heme/acelga.jpg", note: "Placeholder" },

      { id: "semillas-calabaza", name: "Semillas de calabaza", image: "/foods/non-heme/semillas-calabaza.jpg", note: "Placeholder" },
      { id: "mani", name: "Maní", image: "/foods/non-heme/mani.jpg", note: "Placeholder" },
      { id: "nueces", name: "Nueces", image: "/foods/non-heme/nueces.jpg", note: "Placeholder" },

      { id: "avena", name: "Avena", image: "/foods/non-heme/avena.jpg", note: "Placeholder" },
      { id: "amaranto", name: "Amaranto", image: "/foods/non-heme/amaranto.jpg", note: "Placeholder" },
      { id: "arroz-cebada", name: "Arroz de cebada", image: "/foods/non-heme/arroz-cebada.jpg", note: "Placeholder" },
    ],
  },

  inhibitors: {
    id: "inhibitors",
    title: "Inhibidores (Bloqueadores)",
    intro: "Placeholder: Evítalos en la misma comida cuando buscas absorber hierro.",
    items: [
      { id: "te", name: "Té", image: "/foods/inhibitors/te.jpg", note: "Placeholder" },
      { id: "cafe", name: "Café", image: "/foods/inhibitors/cafe.jpg", note: "Placeholder" },
      { id: "gaseosas", name: "Gaseosas / bebidas azucaradas", image: "/foods/inhibitors/gaseosas.jpg", note: "Placeholder" },
      { id: "lacteos", name: "Lácteos", image: "/foods/inhibitors/lacteos.jpg", note: "Placeholder" },
      { id: "salvado", name: "Salvado (fibra en exceso)", image: "/foods/inhibitors/salvado.jpg", note: "Placeholder" },
    ],
  },
};
