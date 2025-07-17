"use client";

import Image from "next/image";
import Link from "next/link";
import { Upload, FileText, Cpu, FolderOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const features = [
    {
      icon: Upload,
      title: "Upload Invoice",
      description: "Upload your invoice in PDF, JPG, or PNG format.",
      step: "1",
    },
    {
      icon: Cpu,
      title: "Automatic Processing",
      description: "Our system extracts key information from your invoice.",
      step: "2",
    },
    {
      icon: FolderOpen,
      title: "Organized Storage",
      description: "Access your invoice details anytime, anywhere.",
      step: "3",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-3 py-1">
                <FileText className="w-3 h-3 mr-1" />
                Invoice Management Made Simple
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                Simple Invoice
                <span className="text-[#2463EB] block">Management</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-lg">
                BillBox helps you organize your invoices in one place. Upload an
                invoice and we'll handle the rest.
              </p>
            </div>

            {/* How it works - Compact */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                How it works
              </h2>
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur">
                    <CardContent className="flex items-start gap-3 p-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2463EB]/10 flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-[#2463EB]" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs px-1.5 py-0">
                            Step {feature.step}
                          </Badge>
                          <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#2463EB] hover:bg-[#2463EB]/90">
                <Link href="/upload" className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Invoice
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/invoices" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  View Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative lg:ml-auto">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
              <Image
                src="/billbox-hero.png"
                alt="BillBox Dashboard Preview"
                width={600}
                height={450}
                priority
                className="w-full h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#2463EB]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-[#2463EB]/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}