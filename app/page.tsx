import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="relative">
        <Image
          src="/photobooth.png"
          alt="ABNDR Photobooth"
          width={500}
          height={490}
          priority
        />
        
        <Link href="/selection">
        <button className="absolute left-[313px] top-[179.5px] -translate-x-1/2 -translate-y-1/2 bg-white px-6.5 py-3 text-sm font-medium text-black hover:bg-pink-300">
        enter :)
        </button>
        </Link>

      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-zinc-600">
        <a href="/privacy" className="hover:text-black transition-colors">
          Privacy Policy
        </a>
        <a
          href="https://www.linkedin.com/in/sophia-abanador-4808a0367/"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
        </a>
        <a
          href="https://github.com/sa087613"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          <Image src="/github.svg" alt="GitHub" width={24} height={24} />
        </a>
        <a
          href="https://www.instagram.com/s0phaban?utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
        </a>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-zinc-600">
        <h1>
          Inspired by @visarchivess https://mysketchbooth.com/
        </h1>
      </div>
    </div>
  );
}