import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryClientProvider from "@/providers/query-client.provider";
import { auth } from "@/libs/auth";
import SessionProvider from "@/providers/session.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SeaLink",
    template: "%s | SeaLink",
  },
  description: "For your everything marketing",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <SessionProvider session={session}>
          <QueryClientProvider>
            {children}
            <Toaster richColors closeButton position="top-center" />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
