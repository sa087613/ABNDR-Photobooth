"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const strips = [
  { name: "Black", src: "/strip-black.png" },
  { name: "Red", src: "/strip-red.png" },
  { name: "Blue", src: "/strip-blue.png" },
  { name: "Gold", src: "/strip-gold.png" },
];

export default function Selection() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? strips.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === strips.length - 1 ? 0 : i + 1));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="relative" style={{ width: 500, height: 424 }}>
        <Image
          src="/selection.png"
          alt="selection"
          width={500}
          height={424}
          priority
        />

        {/* strip preview, centered inside the screen */}
        <div className="absolute left-[47px] top-[48px] flex h-[221px] w-[407px] items-center justify-center overflow-hidden">
          <Image
            key={strips[index].src}
            src={strips[index].src}
            alt={strips[index].name}
            height={105}
            width={40}
            style={{ height: "105px", width: "auto" }}
          />
        </div>

        {/* left arrow */}
        <button
          onClick={prev}
          aria-label="Previous strip"
          className="absolute left-[95px] top-[159px] -translate-y-1/2 text-2xl font-bold text-black hover:text-pink-400"
        >
          &lt;
        </button>

        {/* right arrow */}
        <button
          onClick={next}
          aria-label="Next strip"
          className="absolute left-[395px] top-[159px] -translate-y-1/2 text-2xl font-bold text-black hover:text-pink-400"
        >
          &gt;
        </button>

        {/* start button */}
        <Link
          href={`/capture?strip=${strips[index].name.toLowerCase()}`}
          className="absolute left-[250px] top-[404px] -translate-x-1/2 -translate-y-1/2 bg-[#DCF9D3] px-10 py-4"
        />
      </div>
    </div>
  );
}