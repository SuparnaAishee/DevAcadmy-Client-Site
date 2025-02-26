"use client";

import type React from "react";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  LayoutDashboard,
  Library,
  FileText,
  Users,
  Settings,
  Menu,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "Manage Modules",
    href: "/dashboard/modules",
    icon: Library,
  },
  {
    title: "Manage Lectures",
    href: "/dashboard/lectures",
    icon: FileText,
  },
  {
    title: "Students",
    href: "/dashboard/students",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed left-4 top-20 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <MobileSidebar pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <motion.div
          initial={false}
          animate={{ width: isSidebarOpen ? 280 : 80 }}
          className="fixed top-16 bottom-0 z-40 flex flex-col"
        >
          <div className="flex flex-col flex-grow border-r bg-blue-100">
            <div className="flex h-16 items-center justify-between px-4 border-b">
              <Link href="/dashboard" className="flex items-center gap-2">
                {isSidebarOpen ? (
                  <span className="text-xl font-semibold">Dashboard</span>
                ) : (
                  <LayoutDashboard className="h-6 w-6" />
                )}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                <ChevronRight
                  className={`h-6 w-6 transition-transform ${
                    !isSidebarOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>

            <ScrollArea className="flex-grow">
              <div className="space-y-2 p-2">
                {sidebarItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "transparent"
                      }`}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      <span
                        className={`${
                          !isSidebarOpen ? "hidden" : "block"
                        } transition-all duration-200`}
                      >
                        {item.title}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div
        className={`min-h-screen pt-16 transition-all duration-200 ${
          isSidebarOpen ? "md:pl-[280px]" : "md:pl-[80px]"
        }`}
      >
        <main className="py-8 px-4 md:px-8">{children}</main>
      </div>
    </div>
  );
}

function MobileSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col bg-muted/30">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-xl font-semibold">Dashboard</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                }`}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
