"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Calculator } from "lucide-react";

export default function Menu() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-3">
            {/* Logo / Title */}
            <NavigationMenuItem>
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Calculator className="h-5 w-5" />
                <span>Final Exam Payroll</span>
              </Link>
            </NavigationMenuItem>

            {/* Exam 1 */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://www.ourbeautifulmind.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  Exam 1
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Git 1 */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://github.com/KhineKyaw03/Law-Firm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
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
