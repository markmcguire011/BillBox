import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex py-20 items-center justify-center bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-[#2463EB]">Simple</span> Invoice Management
            </h1>
            <p className="text-lg text-gray-600">
              BillBox helps you organize your invoices in one place. Upload an
              invoice and we'll handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/upload"
                className="px-6 py-3 rounded-md bg-[#2463EB] hover:bg-[#2463EB]/90 text-white text-center transition-colors"
              >
                Upload Invoice
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <Image
                src="/og-image.png"
                alt="BillBox Dashboard Preview"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
