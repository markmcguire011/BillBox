import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Image src="/logo.svg" alt="BillBox Logo" width={32} height={32} />
            <span className="text-lg font-bold text-[#10172A] dark:text-white">
              BillBox
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} BillBox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
