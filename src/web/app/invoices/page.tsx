"use client";

import React, { useEffect, useState } from "react";
import { fetchInvoices } from "@/utils/api";
import InvoiceList from "@/components/InvoiceList";
import Link from "next/link";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInvoices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchInvoices();
      setInvoices(data);
    } catch (err) {
      setError("Failed to load invoices");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <div className="min-h-screen flex flex-col max-w-[1200px] px-[calc(8vw)] mx-auto mt-16">
      <div className="flex flex-col py-16 md:py-20">
        <h1 className="text-3xl pb-6 md:pb-10 font-bold text-[#111827]">
          Invoices
        </h1>
        <InvoiceList
          invoices={invoices}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
