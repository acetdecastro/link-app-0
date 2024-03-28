import { Droplets } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex justify-center items-center gap-0 font-semibold select-none"
    >
      <Droplets className="h-6 w-6" color="#22d3ee" absoluteStrokeWidth />
      <span className="sr-only">SeaLink</span>
      <span className="text-2xl font-bold leading-9 tracking-tight bg-gradient-to-r from-cyan-400 to-zinc-500 bg-clip-text text-transparent">
        SeaLink
      </span>
    </Link>
  );
}
