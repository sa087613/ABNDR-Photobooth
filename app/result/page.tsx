"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { compositeStrip, SLOTS } from "@/lib/compositeStrip";
import { Download, Users, House } from "lucide-react";

export default function Result() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [finalBlob, setFinalBlob] = useState<Blob | null>(null);
  const [finalUrl, setFinalUrl] = useState<string | null>(null);

  useEffect(() => {
    const p = sessionStorage.getItem("photostrip-photos");
    if (!p) return;
    const parsed = JSON.parse(p);
    setPhotos(parsed);

    const strip = sessionStorage.getItem("photostrip-strip") ?? "black";
    compositeStrip(`/strips/strip-${strip}.png`, parsed, SLOTS).then((blob) => {
      setFinalBlob(blob);
      setFinalUrl(URL.createObjectURL(blob));
    });
  }, []);

  const handleRestart = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const handleDownload = () => {
    if (!finalUrl) return;
    const link = document.createElement("a");
    link.href = finalUrl;
    link.download = "photostrip.png";
    link.click();
  };

  const handleShare = async () => {
    if (!finalBlob) return;
    const file = new File([finalBlob], "photostrip.png", { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "My Photobooth Strip" }).catch(() => {});
    } else {
      alert("Sharing isn't supported on this browser — try Download instead.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white">
      {finalUrl ? (
        <img src={finalUrl} alt="Final photo strip" className="h-[490px] w-[164px] object-contain" />
      ) : (
        <div className="relative h-[490px] w-[164px]">
          <Image src="/dropoff.png" alt="final strip" fill className="object-contain" />
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={handleRestart} className="rounded-full bg-pink-300 text-white px-6 py-3 disabled:opacity-50">
          <House size={24} />
        </button>
        <button onClick={handleDownload} disabled={!finalUrl} className="rounded-full bg-pink-300 text-white px-6 py-3 disabled:opacity-50">
          <Download size={24} />
        </button>
        <button onClick={handleShare} disabled={!finalBlob} className="rounded-full bg-pink-300 text-white px-6 py-3 disabled:opacity-50">
          <Users size={24} />
        </button>
      </div>
    </div>
  );
}