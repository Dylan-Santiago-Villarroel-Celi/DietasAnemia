import { CategoryId } from "@/store/wheelStore";

type PickedItem = {
  catId: CategoryId;
  id: string;
  name: string;
};

type Recipe = {
  title: string;
  ingredients: string[];
  steps: string[];
  benefits: string[];
  warnings: string[];
};

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Algunas reglas simples para “combinar” sin meter ciencia dura (tú luego editas texto)
function proteinStyle(hemeName: string) {
  const n = hemeName.toLowerCase();
  if (n.includes("trucha") || n.includes("sardina") || n.includes("atún") || n.includes("atun") || n.includes("pesc")) {
    return { style: "pescado", method: "a la plancha" };
  }
  if (n.includes("camar") || n.includes("conch") || n.includes("marisc")) {
    return { style: "mariscos", method: "salteado" };
  }
  if (n.includes("pollo")) return { style: "pollo", method: "a la plancha" };
  if (n.includes("cerdo")) return { style: "cerdo", method: "salteado" };
  if (n.includes("res")) return { style: "res", method: "a la plancha" };
  if (n.includes("hígado") || n.includes("higado") || n.includes("corazón") || n.includes("corazon") || n.includes("riñón") || n.includes("rinon")) {
    return { style: "vísceras", method: "salteado rápido" };
  }
  return { style: "proteína", method: "a la plancha" };
}

function baseStyle(nonHemeName: string) {
  const n = nonHemeName.toLowerCase();
  if (n.includes("lentej") || n.includes("frej") || n.includes("choch") || n.includes("garban") || n.includes("legum")) {
    return { base: "leguminosas", method: "guisadas" };
  }
  if (n.includes("espin") || n.includes("acel")) {
    return { base: "verdes", method: "salteadas" };
  }
  if (n.includes("avena") || n.includes("amaranto") || n.includes("cebada") || n.includes("arroz")) {
    return { base: "cereales", method: "tipo bowl" };
  }
  if (n.includes("maní") || n.includes("mani") || n.includes("nuez") || n.includes("semilla")) {
    return { base: "frutos secos", method: "como topping" };
  }
  return { base: "base vegetal", method: "preparada" };
}

function enhancerStyle(enhName: string) {
  const n = enhName.toLowerCase();
  if (n.includes("limón") || n.includes("limon")) return { form: "jugo de limón" };
  if (n.includes("naranja")) return { form: "gajos de naranja" };
  if (n.includes("mandarina")) return { form: "gajos de mandarina" };
  if (n.includes("guayaba")) return { form: "guayaba fresca" };
  if (n.includes("mora")) return { form: "mora fresca" };
  if (n.includes("tomate de árbol") || n.includes("tomate") || n.includes("arbol")) return { form: "jugo de tomate de árbol" };
  if (n.includes("pimiento")) return { form: "pimiento crudo en ensalada" };
  if (n.includes("brócoli") || n.includes("brocoli")) return { form: "brócoli al vapor" };
  return { form: enhName };
}

export function generateRecipe(picked: PickedItem[]): Recipe {
  const heme = picked.find((p) => p.catId === "heme");
  const nonHeme = picked.find((p) => p.catId === "non-heme");
  const enh = picked.find((p) => p.catId === "enhancers");
  const inh = picked.find((p) => p.catId === "inhibitors");

  // Si falta algo, devolvemos placeholder claro
  if (!heme || !nonHeme || !enh) {
    return {
      title: "Completa tus elecciones",
      ingredients: ["Elige 1 alimento de cada categoría para generar una receta."],
      steps: ["Vuelve a la ruleta y completa las selecciones."],
      benefits: ["Placeholder"],
      warnings: [],
    };
  }

  const prot = proteinStyle(heme.name);
  const base = baseStyle(nonHeme.name);
  const enhForm = enhancerStyle(enh.name);

  const title = `Plato combinado: ${cap(heme.name)} + ${cap(nonHeme.name)}`;

  const ingredients = [
    `1 porción de ${heme.name}`,
    `1 porción de ${nonHeme.name}`,
    `1 porción de ${enh.name} (${enhForm.form})`,
    "Ajo, cebolla, sal y especias al gusto (placeholder)",
    "Aceite de oliva o similar (placeholder)",
  ];

  const steps = [
    `Prepara ${heme.name} ${prot.method} (placeholder de condimentos).`,
    `Cocina ${nonHeme.name} ${base.method} (placeholder: agua, especias).`,
    `Acompaña con ${enhForm.form} en la misma comida para potenciar la combinación.`,
    "Sirve todo junto en un plato/bowl y ajusta sazón (placeholder).",
  ];

  const benefits = [
    "Combinación diseñada para apoyar el consumo de hierro y su aprovechamiento (placeholder).",
    `Incluye proteína/energía desde ${heme.name} y aporte vegetal desde ${nonHeme.name}.`,
    `Acompañado con ${enh.name} para potenciar la combinación (placeholder).`,
  ];

  const warnings: string[] = [];
  if (inh) {
    warnings.push(
      `Tip: ${inh.name} puede interferir si lo consumes junto a la comida. Intenta separarlo 1–2 horas (placeholder).`
    );
  } else {
    warnings.push("Tip: Evita té/café o lácteos justo con esta comida (placeholder).");
  }

  return { title, ingredients, steps, benefits, warnings };
}
