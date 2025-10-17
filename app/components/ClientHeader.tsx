"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ClientHeaderWrapper() {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/login", "/register"];

  if (hideHeaderRoutes.includes(pathname)) return null;
  return <Header />;
}
