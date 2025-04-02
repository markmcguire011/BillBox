export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 min-h-[50vh]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Three simple steps to manage your invoices
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2463EB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Upload Invoice</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Upload your invoice in PDF, JPG, or PNG format.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#2463EB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Automatic Processing</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our system extracts key information from your invoice.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#2463EB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Organized Storage</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access your invoice details anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
