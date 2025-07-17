"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 relative z-10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="BillBox Logo"
            width={44}
            height={39}
            priority
          />
          <span className="text-xl font-bold text-[#10172A] dark:text-white">
            BillBox
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-3 items-center">
          <Link
            href="/invoices"
            className={cn(
              "px-4 py-2 rounded-md transition-colors flex items-center gap-2",
              pathname === "/invoices"
                ? "bg-[#2463EB]/10 text-[#2463EB] font-medium"
                : "text-[#2463EB] hover:text-[#2463EB]/90 hover:bg-[#2463EB]/5"
            )}
          >
            <FileText className="h-4 w-4" />
            View Invoices
          </Link>
          <Button asChild className="bg-[#2463EB] hover:bg-[#2463EB]/90">
            <Link href="/upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Invoice
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-8 p-4">
                <SheetClose asChild>
                  <Link
                    href="/invoices"
                    className={cn(
                      "px-4 py-2 rounded-md transition-colors flex items-center gap-2",
                      pathname === "/invoices"
                        ? "bg-[#2463EB]/10 text-[#2463EB] font-medium"
                        : "text-[#2463EB] hover:text-[#2463EB]/90 hover:bg-[#2463EB]/5"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="h-4 w-4" />
                    View Invoices
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    className="bg-[#2463EB] hover:bg-[#2463EB]/90 w-full"
                  >
                    <Link
                      href="/upload"
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Upload className="h-4 w-4" />
                      Upload Invoice
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
