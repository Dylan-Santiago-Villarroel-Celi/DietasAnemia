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

// colores más “Figma-like”
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

    // conic-gradient: 0deg ARRIBA (12 en punto)
    const wheelBackground = useMemo(() => {
        if (n === 0) return "conic-gradient(#e5e7eb 0deg 360deg)";
        const step = 360 / n;

        const stops: string[] = [];
        for (let i = 0; i < n; i++) {
            const id = remaining[i];
            const start = i * step;
            const end = (i + 1) * step;
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

        const step = 360 / n;
        const chosenCenter = idx * step + step / 2; // grados CSS (0 arriba)

        // apuntar al puntero de arriba (0deg)
        const delta = 0 - chosenCenter;

        const extraSpins = 360 * (4 + Math.floor(Math.random() * 3)); // 4..6
        const jitter = Math.random() * 12 - 6; // menos jitter para que se vea fino

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
                <div className="absolute left-1/2 -top-2 -translate-x-1/2 z-30">
                    <div className="w-0 h-0 border-l-[11px] border-r-[11px] border-t-[20px] border-l-transparent border-r-transparent border-t-black" />
                </div>

                {/* Aro exterior (da acabado) */}
                <div className="absolute inset-0 rounded-full border-2 border-neutral-200 shadow-sm" />

                {/* RUEDA */}
                <div
                    className="relative w-72 h-72 rounded-full overflow-hidden cursor-pointer select-none"
                    style={{
                        background: wheelBackground,
                        transform: `rotate(${rotation}deg)`,
                        transition: "transform 2200ms cubic-bezier(0.12, 0.85, 0.15, 1)",
                    }}
                    onTransitionEnd={onTransitionEnd}
                    onClick={spin}
                    role="button"
                    aria-label="Girar ruleta"
                    title="Haz click para girar"
                >
                    {/* Labels SIN fondo, centrados dentro de cada color */}
                    {/* Labels CORRECTOS (rotación + translate, sin X/Y) */}
                    {n > 0 &&
                        remaining.map((id, i) => {
                            const step = 360 / n;
                            const angle = i * step + step / 2;

                            return (
                                <div
                                    key={id}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                    style={{
                                        transform: `rotate(${angle}deg)`,
                                    }}
                                >
                                    <div
                                        style={{
                                            transform: `
              translateY(-96px)
              rotate(${-rotation}deg)
            `,
                                            width: 120,
                                            textAlign: "center",
                                        }}
                                    >
                                        <span
                                            className="block text-[12px] font-semibold leading-tight"
                                            style={{
                                                color: "rgba(255,255,255,0.97)",
                                                textShadow:
                                                    "0 1px 2px rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.65)",
                                            }}
                                        >
                                            {labels[id]}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}


                    {/* Centro (más pequeño para que no tape) */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center">
                            <span className="text-[11px] font-medium">Gira</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón opcional (también gira) */}
            <button
                onClick={spin}
                disabled={disabled}
                className={`w-full px-4 py-3 rounded-2xl text-sm font-medium ${disabled ? "bg-neutral-200 text-neutral-600" : "bg-black text-white"
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
