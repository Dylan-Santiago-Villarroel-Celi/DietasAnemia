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
    intro:
      "Estos alimentos no aportan hierro, pero ayudan a que tu cuerpo absorba mejor el hierro de otros alimentos.",
    items: [
      {
        id: "limon",
        name: "Limón",
        image: "/foods/enhancers/limon.jpg",
        note: "Rico en vitamina C, ayuda a que el hierro vegetal se absorba mejor.",
      },
      {
        id: "naranja",
        name: "Naranja",
        image: "/foods/enhancers/naranja.jpg",
        note: "Aporta vitamina C que mejora la absorción del hierro en las comidas.",
      },
      {
        id: "mandarina",
        name: "Mandarina",
        image: "/foods/enhancers/mandarina.jpg",
        note: "Fruta cítrica que favorece el aprovechamiento del hierro vegetal.",
      },
      {
        id: "tomate-arbol",
        name: "Tomate de árbol",
        image: "/foods/enhancers/tomate-arbol.jpg",
        note: "Su acidez natural contribuye a mejorar la absorción del hierro.",
      },
      {
        id: "guayaba",
        name: "Guayaba",
        image: "/foods/enhancers/guayaba.jpg",
        note: "Muy rica en vitamina C, potencia fuertemente la absorción del hierro.",
      },
      {
        id: "mora",
        name: "Mora",
        image: "/foods/enhancers/mora.jpg",
        note: "Fruta ácida que apoya la absorción del hierro cuando se consume junto a las comidas.",
      },
      {
        id: "pimiento-rojo",
        name: "Pimiento rojo (crudo)",
        image: "/foods/enhancers/pimiento-rojo.jpg",
        note: "Alto en vitamina C, ideal para combinar con legumbres o cereales.",
      },
      {
        id: "brocoli",
        name: "Brócoli",
        image: "/foods/enhancers/brocoli.jpg",
        note: "Aporta vitamina C y otros nutrientes que ayudan al aprovechamiento del hierro.",
      },
    ],
  },

  heme: {
    id: "heme",
    title: "Hierro hemo (Súper Combustible)",
    intro:
      "El hierro hemo se absorbe con mayor facilidad y es clave para combatir el cansancio y la falta de energía.",
    items: [
      {
        id: "higado",
        name: "Hígado",
        image: "/foods/heme/higado.jpg",
        note: "Una de las fuentes más ricas en hierro hemo, de alta absorción.",
      },
      {
        id: "corazon",
        name: "Corazón",
        image: "/foods/heme/corazon.jpg",
        note: "Víscera rica en hierro hemo y proteínas de buena calidad.",
      },
      {
        id: "rinon",
        name: "Riñón",
        image: "/foods/heme/rinion.jpg",
        note: "Aporta hierro hemo y otros nutrientes esenciales.",
      },
      {
        id: "res",
        name: "Carne de res",
        image: "/foods/heme/res.jpg",
        note: "Fuente importante de hierro hemo y proteína para la energía diaria.",
      },
      {
        id: "cerdo",
        name: "Cerdo",
        image: "/foods/heme/cerdo.jpg",
        note: "Aporta hierro hemo y proteínas necesarias para el organismo.",
      },
      {
        id: "pollo",
        name: "Pollo",
        image: "/foods/heme/pollo.jpg",
        note: "Contiene hierro hemo en menor cantidad, pero de buena absorción.",
      },
      {
        id: "atun",
        name: "Atún",
        image: "/foods/heme/atun.jpg",
        note: "Pescado que aporta hierro hemo y proteínas de alta calidad.",
      },
      {
        id: "sardina",
        name: "Sardina",
        image: "/foods/heme/sardina.jpg",
        note: "Rica en hierro hemo y otros nutrientes beneficiosos.",
      },
      {
        id: "trucha",
        name: "Trucha",
        image: "/foods/heme/trucha.jpg",
        note: "Pescado con hierro hemo, ideal para comidas ligeras.",
      },
      {
        id: "conchas",
        name: "Conchas",
        image: "/foods/heme/conchas.jpg",
        note: "Marisco que aporta hierro hemo de buena absorción.",
      },
      {
        id: "camaron",
        name: "Camarón",
        image: "/foods/heme/camaron.jpg",
        note: "Fuente moderada de hierro hemo y proteínas.",
      },
    ],
  },

  "non-heme": {
    id: "non-heme",
    title: "Hierro no hemo (Diamantes en Bruto)",
    intro:
      "El hierro no hemo es de origen vegetal y necesita combinarse con potenciadores para aprovecharse mejor.",
    items: [
      {
        id: "lentejas",
        name: "Lentejas",
        image: "/foods/non-heme/lentejas.jpg",
        note: "Buena fuente de hierro vegetal; mejora su absorción con vitamina C.",
      },
      {
        id: "chochos",
        name: "Chochos",
        image: "/foods/non-heme/chochos.jpg",
        note: "Leguminosa rica en hierro vegetal y proteínas.",
      },
      {
        id: "frejol",
        name: "Fréjol",
        image: "/foods/non-heme/frejol.jpg",
        note: "Aporta hierro vegetal que se aprovecha mejor con alimentos cítricos.",
      },
      {
        id: "espinaca",
        name: "Espinaca",
        image: "/foods/non-heme/espinaca.jpg",
        note: "Vegetal de hoja verde con hierro no hemo.",
      },
      {
        id: "acelga",
        name: "Acelga",
        image: "/foods/non-heme/acelga.jpg",
        note: "Contiene hierro vegetal; se recomienda combinarla con vitamina C.",
      },
      {
        id: "semillas-calabaza",
        name: "Semillas de calabaza",
        image: "/foods/non-heme/semillas-calabaza.jpg",
        note: "Aportan hierro vegetal y grasas saludables.",
      },
      {
        id: "mani",
        name: "Maní",
        image: "/foods/non-heme/mani.jpg",
        note: "Fuente vegetal de hierro y energía.",
      },
      {
        id: "nueces",
        name: "Nueces",
        image: "/foods/non-heme/nueces.jpg",
        note: "Aportan hierro vegetal y grasas beneficiosas.",
      },
      {
        id: "avena",
        name: "Avena",
        image: "/foods/non-heme/avena.jpg",
        note: "Cereal con hierro vegetal, ideal para el desayuno.",
      },
      {
        id: "amaranto",
        name: "Amaranto",
        image: "/foods/non-heme/amaranto.jpg",
        note: "Cereal andino con hierro vegetal y buena calidad nutricional.",
      },
      {
        id: "arroz-cebada",
        name: "Arroz de cebada",
        image: "/foods/non-heme/arroz-cebada.jpg",
        note: "Aporta hierro vegetal y energía.",
      },
    ],
  },

  inhibitors: {
    id: "inhibitors",
    title: "Inhibidores (Bloqueadores)",
    intro:
      "Estos alimentos o bebidas pueden dificultar la absorción del hierro si se consumen junto a la comida.",
    items: [
      {
        id: "te",
        name: "Té",
        image: "/foods/inhibitors/te.jpg",
        note: "Contiene compuestos que reducen la absorción del hierro.",
      },
      {
        id: "cafe",
        name: "Café",
        image: "/foods/inhibitors/cafe.jpg",
        note: "Puede interferir con la absorción del hierro si se consume con las comidas.",
      },
      {
        id: "gaseosas",
        name: "Gaseosas / bebidas azucaradas",
        image: "/foods/inhibitors/gaseosas.jpg",
        note: "No favorecen la absorción del hierro y desplazan opciones más saludables.",
      },
      {
        id: "lacteos",
        name: "Lácteos",
        image: "/foods/inhibitors/lacteos.jpg",
        note: "El calcio puede competir con el hierro durante la absorción.",
      },
      {
        id: "salvado",
        name: "Salvado (fibra en exceso)",
        image: "/foods/inhibitors/salvado.jpg",
        note: "El exceso de fibra puede disminuir la absorción del hierro.",
      },
    ],
  },
};

export function getItemById(categoryId: CategoryId, itemId: string) {
  const cat = CATEGORIES[categoryId];
  return cat?.items.find((i) => i.id === itemId);
}
