"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 max-h-18 relative z-10">
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
        <div className="flex gap-3 items-center">
          <Link
            href="/invoices"
            className={`px-4 py-2 rounded-md transition-colors ${
              pathname === "/invoices"
                ? "bg-[#2463EB]/10 text-[#2463EB] font-medium"
                : "text-[#2463EB] hover:text-[#2463EB]/90 hover:bg-[#2463EB]/5"
            }`}
          >
            View Invoices
          </Link>
          <Link
            href="/upload"
            className={`px-4 py-2 rounded-md transition-colors ${
              pathname === "/upload"
                ? "bg-[#2463EB] text-white font-medium"
                : "bg-[#2463EB] hover:bg-[#2463EB]/90 text-white"
            }`}
          >
            Upload Invoice
          </Link>
        </div>
      </div>
    </nav>
  );
}
