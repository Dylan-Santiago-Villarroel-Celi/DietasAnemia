import { CategoryId } from "@/store/wheelStore";
import { getPortion } from "@/data/portions";


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

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Reglas simples para método de cocción (sin “ciencia dura”)
function proteinStyle(hemeName: string) {
  const n = normalize(hemeName);

  if (n.includes("trucha") || n.includes("sardina") || n.includes("atun") || n.includes("pesc")) {
    return { style: "pescado", method: "a la plancha" };
  }
  if (n.includes("camaron") || n.includes("conch") || n.includes("marisc")) {
    return { style: "mariscos", method: "salteado" };
  }
  if (n.includes("pollo")) return { style: "pollo", method: "a la plancha" };
  if (n.includes("cerdo")) return { style: "cerdo", method: "salteado" };
  if (n.includes("res")) return { style: "res", method: "a la plancha" };

  if (
    n.includes("higado") ||
    n.includes("corazon") ||
    n.includes("rinon") ||
    n.includes("visc")
  ) {
    return { style: "vísceras", method: "salteado rápido" };
  }

  return { style: "proteína", method: "a la plancha" };
}

function baseStyle(nonHemeName: string) {
  const n = normalize(nonHemeName);

  if (n.includes("lentej") || n.includes("frej") || n.includes("choch") || n.includes("legum")) {
    return { base: "leguminosas", method: "guisadas" };
  }
  if (n.includes("espin") || n.includes("acel")) {
    return { base: "verdes", method: "salteadas" };
  }
  if (n.includes("avena") || n.includes("amaranto") || n.includes("cebada") || n.includes("arroz")) {
    return { base: "cereales", method: "tipo bowl" };
  }
  if (n.includes("mani") || n.includes("nuez") || n.includes("semilla")) {
    return { base: "frutos secos", method: "como topping" };
  }

  return { base: "base vegetal", method: "preparada" };
}

function enhancerStyle(enhName: string) {
  const n = normalize(enhName);

  if (n.includes("limon")) return { form: "jugo de limón" };
  if (n.includes("naranja")) return { form: "gajos de naranja" };
  if (n.includes("mandarina")) return { form: "gajos de mandarina" };
  if (n.includes("guayaba")) return { form: "guayaba fresca" };
  if (n.includes("mora")) return { form: "mora fresca" };
  if (n.includes("tomate") && n.includes("arbol")) return { form: "jugo de tomate de árbol" };
  if (n.includes("pimiento")) return { form: "ensalada con pimiento crudo" };
  if (n.includes("brocoli")) return { form: "brócoli al vapor" };

  return { form: enhName };
}

function inhibitorGuidance(inhName?: string) {
  const n = inhName ? normalize(inhName) : "";

  if (!inhName) {
    return "Tip: Evita tomar té/café o consumir lácteos justo con esta comida. Intenta separarlos 1–2 horas.";
  }

  if (n.includes("te") || n.includes("cafe")) {
    return `Tip: ${inhName} puede reducir la absorción del hierro si lo tomas con la comida. Mejor sepáralo 1–2 horas.`;
  }
  if (n.includes("lact")) {
    return `Tip: ${inhName} aporta calcio, que puede competir con el hierro. Si puedes, consúmelo en otro momento del día.`;
  }
  if (n.includes("gase")) {
    return `Tip: ${inhName} no ayuda al aprovechamiento del hierro. Prefiere agua o jugo natural junto a la comida.`;
  }
  if (n.includes("salvado") || n.includes("fibra")) {
    return `Tip: Mucha fibra justo con la comida puede disminuir el aprovechamiento del hierro. Equilibra la porción y acompaña con vitamina C.`;
  }

  return `Tip: ${inhName} puede interferir si lo consumes junto a la comida. Intenta separarlo 1–2 horas.`;
}

export function generateRecipe(picked: PickedItem[]): Recipe {
  const heme = picked.find((p) => p.catId === "heme");
  const nonHeme = picked.find((p) => p.catId === "non-heme");
  const enh = picked.find((p) => p.catId === "enhancers");
  const inh = picked.find((p) => p.catId === "inhibitors");

  // Si falta algo: mensaje útil, sin placeholders
  if (!heme || !nonHeme || !enh) {
    return {
      title: "Completa tus elecciones",
      ingredients: ["Elige 1 opción de hierro hemo, 1 de hierro no hemo y 1 potenciador."],
      steps: ["Vuelve a la ruleta, completa las selecciones y regresa para ver tu receta."],
      benefits: ["Cuando completas las categorías, la app crea una combinación pensada para apoyar el consumo y aprovechamiento del hierro."],
      warnings: ["Recuerda: esta app es educativa y no reemplaza la indicación médica."],
    };
  }

  const prot = proteinStyle(heme.name);
  const base = baseStyle(nonHeme.name);
  const enhForm = enhancerStyle(enh.name);

  const title = `Plato combinado: ${cap(heme.name)} + ${cap(nonHeme.name)}`;

  const hemePortion = getPortion("heme", heme.id);
  const nonHemePortion = getPortion("non-heme", nonHeme.id);

  const hemeLine = hemePortion
    ? `${heme.name}: ${hemePortion.grams} (${hemePortion.measure}) • Hierro: ${hemePortion.iron ?? "—"}`
    : `${heme.name}: 1 porción`;

  const nonHemeLine = nonHemePortion
    ? `${nonHeme.name}: ${nonHemePortion.grams} (${nonHemePortion.measure}) • Hierro: ${nonHemePortion.iron ?? "—"}`
    : `${nonHeme.name}: 1 porción`;

  const enhLine = `${enh.name}: 1 porción (${enhForm.form})`;

  const ingredients = [
    hemeLine,
    nonHemeLine,
    enhLine,
    "1 diente de ajo (opcional)",
    "1/4 de cebolla (opcional)",
    "1 cucharadita de aceite de oliva o aceite vegetal",
    "Sal y pimienta en cantidad moderada",
  ];


  // Preparación: concreta
  const steps: string[] = [];

  steps.push(
    `Prepara ${heme.name} ${prot.method} con una pizca de sal y pimienta. Si usas ajo/cebolla, sofríelos ligeramente antes.`
  );

  if (base.base === "leguminosas") {
    steps.push(
      `Cocina ${nonHeme.name} hasta que esté suave. Puedes calentarlo tipo guiso con cebolla y un poco de aceite.`
    );
  } else if (base.base === "verdes") {
    steps.push(
      `Saltea ${nonHeme.name} por 2–3 minutos (no demasiado) para mantener textura y sabor.`
    );
  } else if (base.base === "cereales") {
    steps.push(
      `Prepara ${nonHeme.name} y arma un bowl: base caliente + la proteína encima.`
    );
  } else if (base.base === "frutos secos") {
    steps.push(
      `Usa ${nonHeme.name} como topping: espolvoréalo al final sobre la preparación.`
    );
  } else {
    steps.push(`Prepara ${nonHeme.name} y colócalo como base del plato.`);
  }

  steps.push(
    `Agrega ${enhForm.form} en la misma comida (por ejemplo, limón sobre el plato o fruta al lado).`
  );

  steps.push("Sirve y disfruta. Si puedes, acompaña con agua.");

  // Beneficios: lenguaje real y simple
  const benefits = [
    "Combina hierro hemo (mejor aprovechamiento) con una fuente vegetal de hierro para una comida más completa.",
    `Incluye ${enh.name}, que ayuda a mejorar el aprovechamiento del hierro vegetal cuando se consume en la misma comida.`,
    "Puede apoyar niveles de energía y rendimiento cuando forma parte de una alimentación constante y variada.",
  ];

  const warnings: string[] = [];
  warnings.push(inhibitorGuidance(inh?.name));
  warnings.push("Si tienes anemia diagnosticada, sigue las indicaciones de tu profesional de salud y tu tratamiento si lo tienes.");

  return { title, ingredients, steps, benefits, warnings };
}
