import { Suspense } from "react";
import CaptureClient from "./CaptureClient";

export default function CapturePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-white" />}>
      <CaptureClient />
    </Suspense>
  );
}
