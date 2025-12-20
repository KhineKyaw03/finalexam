"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Home, FileText, Github } from "lucide-react";

export default function Menu() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
        {/* Left title */}
        <Link href="/" className="font-semibold">
          Final Exam
        </Link>

        {/* Right menu */}
        <NavigationMenu className="ml-auto">
          <NavigationMenuList className="flex items-center gap-6">
            {/* Home (internal) */}
            <NavigationMenuItem>
              {/* If your payroll is currently at /payroll, change href="/" to href="/payroll" */}
              <Link
                href="/"
                className="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium hover:bg-muted"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
            </NavigationMenuItem>

            {/* Exam 1 (external) */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://law-firm-five-red.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium hover:bg-muted"
                >
                  <FileText className="h-4 w-4" />
                  Exam 1
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Git 1 (external) */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://github.com/KhineKyaw03/Law-Firm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium hover:bg-muted"
                >
                  <Github className="h-4 w-4" />
                  Git 1
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}