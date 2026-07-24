"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Upload } from "lucide-react";

const CAPTURE_SLOTS = [
  { x: 0.11, y: 0.0331, w: 0.795, h: 0.269 },
  { x: 0.11, y: 0.326, w: 0.795, h: 0.269 },
  { x: 0.11, y: 0.623, w: 0.795, h: 0.269 },
];

export default function Capture() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const strip = searchParams.get("strip") ?? "black";

  const [mode, setMode] = useState<"camera" | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setMode("camera");
    } catch {
      alert("Camera access was denied or isn't available.");
    }
  };

  useEffect(() => {
    if (mode === "camera" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [mode]);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setMode(null);
    setVideoReady(false);
  };

  const takeSnapshot = () => {
  const video = videoRef.current;
  if (!video || video.videoWidth === 0) return;

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d")!;

  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);

  const dataUrl = canvas.toDataURL("image/png");

  setPhotos((prev) => {
    const next = [...prev, dataUrl];
    if (next.length === 3) stopCamera();
    return next;
  });
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotos((prev) => [...prev, reader.result as string]);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  useEffect(() => {
    if (photos.length === 3) {
      sessionStorage.setItem("photostrip-photos", JSON.stringify(photos));
      sessionStorage.setItem("photostrip-strip", strip);
      router.push("/final");
    }
  }, [photos, strip, router]);

  useEffect(() => stopCamera, []);

  const activeSlot = CAPTURE_SLOTS[photos.length];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white">
      <div className="relative w-[205px]" style={{ aspectRatio: "170 / 432" }}>
        <Image src={`/strips/strip-${strip}.png`} alt={strip} fill className="object-contain" />

        {CAPTURE_SLOTS.map((slot, i) => (
          <div
            key={i}
            className="absolute overflow-hidden bg-zinc-100"
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

        {/* single, stable video element — stays mounted for the whole camera session,
            just repositioned over whichever slot is currently active */}
        {mode === "camera" && activeSlot && (
          <div
            className="absolute overflow-hidden"
            style={{
              left: `${activeSlot.x * 100}%`,
              top: `${activeSlot.y * 100}%`,
              width: `${activeSlot.w * 100}%`,
              height: `${activeSlot.h * 100}%`,
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              onLoadedMetadata={() => setVideoReady(true)}
              className="h-full w-full scale-x-[-1] object-cover"
            />
          </div>
        )}
      </div>

      <p className="text-sm text-zinc-500">{photos.length} of 3 photos</p>

      {mode === "camera" && (
        <button
          onClick={takeSnapshot}
          disabled={!videoReady}
          className="rounded-full bg-pink-300 text-white px-6 py-3 text-sm font-medium disabled:opacity-40"
        >
          {videoReady ? `Capture (${photos.length + 1} of 3)` : "Loading camera…"}
        </button>
      )}

      {!mode && photos.length < 3 && (
        <div className="flex gap-4">
          <button
            onClick={openCamera}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-300 text-white"
            aria-label="Take a Photo"
          >
            <Camera size={24} />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-300 text-white"
            aria-label="Upload a Photo"
          >
            <Upload size={24} />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      )}
    </div>
  );
}
