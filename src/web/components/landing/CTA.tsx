import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 min-h-[50vh]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-medium mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Upload your first invoice and see how BillBox can help you stay
          organized.
        </p>
        <Link
          href="/upload"
          className="border border-[#2463EB] px-8 py-3 rounded-md bg-white text-[#2463EB] hover:bg-gray-100 transition-colors inline-block font-medium"
        >
          Upload Invoice
        </Link>
      </div>
    </section>
  );
}
