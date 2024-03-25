import Link from "next/link";

export default function Logo() {
  return (
    <Link href={`/`} className="flex items-center justify-center">
      <span className="sr-only">SeaLink</span>
      {/* <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=600"
              alt="Your Company"
            /> */}
      <h3 className="text-xl font-bold leading-9 tracking-tight bg-gradient-to-r from-cyan-400 to-zinc-500 bg-clip-text text-transparent">
        SeaLink
      </h3>
    </Link>
  );
}
