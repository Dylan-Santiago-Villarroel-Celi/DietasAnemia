import { create } from "zustand";

export type CategoryId = "heme" | "non-heme" | "enhancers" | "inhibitors";

export type Selection = {
  categoryId: CategoryId;
  itemId: string; // ej: "beef"
};

type WheelState = {
  // Categorías disponibles (se van quitando)
  remaining: CategoryId[];

  // Selección final: una por cada categoría
  selections: Partial<Record<CategoryId, string>>;

  // Información del usuario
  knowsAboutAnemia: boolean | null;

  // Acción: guardar selección y quitar categoría
  saveSelection: (categoryId: CategoryId, itemId: string) => void;

  // Acción: guardar si conoce sobre anemia
  setKnowsAboutAnemia: (knows: boolean) => void;

  // Acción: reiniciar todo
  reset: () => void;
};

const initialRemaining: CategoryId[] = ["heme", "non-heme", "enhancers", "inhibitors"];

export const useWheelStore = create<WheelState>((set) => ({
  remaining: initialRemaining,
  selections: {},
  knowsAboutAnemia: null,

  saveSelection: (categoryId, itemId) =>
    set((state) => {
      // Guarda selección
      const nextSelections = { ...state.selections, [categoryId]: itemId };

      // Quita la categoría ya completada
      const nextRemaining = state.remaining.filter((c) => c !== categoryId);

      return { selections: nextSelections, remaining: nextRemaining };
    }),

  setKnowsAboutAnemia: (knows: boolean) =>
    set({ knowsAboutAnemia: knows }),

  reset: () => set({ remaining: initialRemaining, selections: {}, knowsAboutAnemia: null }),
}));
