"use client";

import { Header } from "@/app/_components/Header";
import { useRouteGuard } from "@/app/_hooks/useRouteGuard";
import { swrConfig } from "@/utils/swr";
import { SWRConfig } from "swr";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRouteGuard();
  return (
    <SWRConfig value={swrConfig}>
      <>
        <Header />
        {children}
      </>
    </SWRConfig>
  );
}