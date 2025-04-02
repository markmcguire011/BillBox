import Link from "next/link";
import InvoiceUploader from "@/components/InvoiceUploader";

export default function UploadPage() {
  return (
    <div className="min-h-screen flex flex-col max-w-[1200px] px-[calc(8vw)] mx-auto mt-16">
      <div className="flex flex-col py-16 md:py-20 gap-5">
        <h1 className="text-3xl pb-6 md:pb-10 font-bold">Upload Invoice</h1>
        <InvoiceUploader />
        <div className="text-center">
          <Link href="/" className="text-[#2463EB] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
