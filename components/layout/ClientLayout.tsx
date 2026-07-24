'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  return (
    <>
      <Sidebar />
      <div className={cn("flex flex-col min-h-screen transition-all duration-300 ease-in-out", isCollapsed ? "md:pl-[80px]" : "md:pl-[260px]")}>
        <Topbar />
        <main className="flex-1 p-6 pt-2">
          {children}
        </main>
      </div>
    </>
  );
}
