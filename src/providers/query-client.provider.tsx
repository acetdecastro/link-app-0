"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider as TanstackProvider,
} from "@tanstack/react-query";

export default function QueryClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client] = useState(new QueryClient());
  return <TanstackProvider client={client}>{children}</TanstackProvider>;
}
