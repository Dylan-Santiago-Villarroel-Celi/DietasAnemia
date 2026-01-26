"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryId } from "@/store/wheelStore";

const labels: Record<CategoryId, string> = {
  heme: "Hierro hemo",
  "non-heme": "Hierro no hemo",
  enhancers: "Potenciadores",
  inhibitors: "Inhibidores",
};

const colors: Record<CategoryId, string> = {
  heme: "#EF4444",
  "non-heme": "#F59E0B",
  enhancers: "#22C55E",
  inhibitors: "#3B82F6",
};

export function SpinWheel({ remaining }: { remaining: CategoryId[] }) {
  const router = useRouter();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const chosenRef = useRef<CategoryId | null>(null);

  const n = remaining.length;

  // OJO: conic-gradient en CSS empieza en "arriba" (12 en punto)
  const wheelBackground = useMemo(() => {
    if (n === 0) return "conic-gradient(#e5e7eb 0deg 360deg)";
    const size = 360 / n;

    const stops: string[] = [];
    for (let i = 0; i < n; i++) {
      const id = remaining[i];
      const start = i * size;
      const end = (i + 1) * size;
      stops.push(`${colors[id]} ${start}deg ${end}deg`);
    }
    return `conic-gradient(${stops.join(", ")})`;
  }, [remaining, n]);

  const spin = () => {
    if (spinning || n === 0) return;
    setSpinning(true);

    const idx = Math.floor(Math.random() * n);
    const chosen = remaining[idx];
    chosenRef.current = chosen;

    const size = 360 / n;
    const chosenCenter = idx * size + size / 2; // en grados CSS (0 = arriba)

    // Queremos que el centro del segmento quede justo en el puntero (arriba => 0deg)
    const targetAtTop = 0;
    const delta = targetAtTop - chosenCenter;

    const extraSpins = 360 * (4 + Math.floor(Math.random() * 3)); // 4..6 vueltas
    const jitter = Math.random() * 16 - 8;

    setRotation((prev) => prev + extraSpins + delta + jitter);
  };

  const onTransitionEnd = () => {
    if (!spinning) return;
    setSpinning(false);

    const chosen = chosenRef.current;
    chosenRef.current = null;

    if (chosen) router.push(`/category/${chosen}`);
  };

  const disabled = spinning || n === 0;

  return (
    <div className="space-y-4">
      <div className="relative mx-auto w-72 h-72">
        {/* Puntero */}
        <div className="absolute left-1/2 -top-2 -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-black" />
        </div>

        {/* Ruleta */}
        <div
          className="relative w-72 h-72 rounded-full border shadow-sm overflow-hidden cursor-pointer select-none"
          style={{
            background: wheelBackground,
            transform: `rotate(${rotation}deg)`,
            transition: "transform 2200ms cubic-bezier(0.12, 0.85, 0.15, 1)",
          }}
          onTransitionEnd={onTransitionEnd}
          onClick={spin} // ✅ click en la ruleta gira
          role="button"
          aria-label="Girar ruleta"
          title="Haz click para girar"
        >
          {/* Labels dentro de la ruleta */}
          {n > 0 &&
            remaining.map((id, i) => {
              const step = 360 / n;
              const angleCss = i * step + step / 2; // 0 = arriba (CSS)

              // Convertir a ángulo matemático para cos/sin:
              // Math: 0 = derecha. CSS: 0 = arriba.
              // Entonces: angleMath = angleCss - 90
              const angleMath = (angleCss - 90) * (Math.PI / 180);

              const radius = 78; // ✅ un poco más al centro (ajústalo si quieres)
              const cx = 144; // centro de 288px (w-72)
              const cy = 144;

              const x = cx + radius * Math.cos(angleMath);
              const y = cy + radius * Math.sin(angleMath);

              return (
                <div
                  key={id}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: x,
                    top: y,
                    // Mantener texto “recto” aunque la rueda rote
                    transform: `translate(-50%, -50%)`,

                  }}
                >
                  <div className="px-2 py-1 rounded-lg bg-white/85 backdrop-blur border text-[11px] font-semibold text-neutral-900 text-center max-w-[96px] leading-tight">
                    {labels[id]}
                  </div>
                </div>
              );
            })}

          {/* Centro */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-white border shadow-sm flex items-center justify-center">
              <span className="text-xs font-medium">Gira</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón (también sirve) */}
      <button
        onClick={spin}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-2xl text-sm font-medium ${
          disabled ? "bg-neutral-200 text-neutral-600" : "bg-black text-white"
        }`}
      >
        {spinning ? "Girando..." : n === 0 ? "Completado" : "Girar"}
      </button>

      <p className="text-xs text-neutral-500 text-center">
        Click en la ruleta o en el botón para girar.
      </p>
    </div>
  );
}
