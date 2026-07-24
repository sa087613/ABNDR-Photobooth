// app/final/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import Image from "next/image";

const CAPTURE_SLOTS = [
  { x: 0.112, y: 0.030, w: 0.776, h: 0.269 },
  { x: 0.112, y: 0.326, w: 0.776, h: 0.269 },
  { x: 0.112, y: 0.623, w: 0.776, h: 0.269 },
];

export default function Final() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [strip, setStrip] = useState("black");
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    const p = sessionStorage.getItem("photostrip-photos");
    const s = sessionStorage.getItem("photostrip-strip");
    if (p) setPhotos(JSON.parse(p));
    if (s) setStrip(s);
    const t = setTimeout(() => setDropped(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-white">
      <div
        className={`relative w-[205px] transition-transform duration-1000 ease-out ${
          dropped ? "translate-y-0" : "-translate-y-[600px]"
        }`}
        style={{ aspectRatio: "170 / 432" }}
      >
        <Image src={`/strips/strip-${strip}.png`} alt="photo strip" fill className="object-contain" />

        {CAPTURE_SLOTS.map((slot, i) => (
          <div
            key={i}
            className="absolute overflow-hidden"
            style={{
              left: `${slot.x * 100}%`,
              top: `${slot.y * 100}%`,
              width: `${slot.w * 100}%`,
              height: `${slot.h * 100}%`,
            }}
          >
            {photos[i] && <img src={photos[i]} className="h-full w-full object-cover" alt="" />}
          </div>
        ))}
      </div>

      {dropped && (
        <button
          onClick={() => router.push("/result")}
          className="rounded-full bg-pink-300 text-white px-6 py-3 disabled:opacity-50"
        >
          <Check size={24} />
        </button>
      )}
    </div>
  );
}