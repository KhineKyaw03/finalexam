"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Home, Briefcase, Github } from "lucide-react";

export default function Menu() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">

            {/* Site Title */}
            <NavigationMenuItem>
              <span className="font-semibold text-lg">Final Exam</span>
            </NavigationMenuItem>

            {/* Home (Payroll Calculator) */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Exam 1 – Law Firm (EXTERNAL) */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://law-firm-five-red.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Briefcase className="h-4 w-4" />
                  Exam 1
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Git 1 – GitHub (EXTERNAL) */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://github.com/KhineKyaw03/Law-Firm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
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
