"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log("globalerror: ", error?.digest);
  }, [error]);
  return (
    <html className="h-full">
      <body className="h-full">
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">500</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Sorry, something went wrong
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => reset()}
                className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Try again
              </button>
              <Link href="/" className="text-sm font-semibold text-gray-900">
                Go back home <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
