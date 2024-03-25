import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryClientProvider from "@/providers/query-client.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "SeaLink",
    template: "%s | SeaLink",
  },
  description: "What are your links?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <QueryClientProvider>
          {children}
          <Toaster richColors closeButton />
        </QueryClientProvider>
      </body>
    </html>
  );
}
