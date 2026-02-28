'use client';
import Button from "@/components/Button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTASection() {
    const router = useRouter();
    return (
        <>
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        Ready to Transform Your Real Estate Business?
                    </h2>
                    <p className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto">
                        Join hundreds of real estate professionals who are already saving time, fuel, and increasing their efficiency.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            label="Start Free Trial"
                            size="lg"
                            variant="theme"
                            onClick={() => router.push("/signup")}
                            classNameC="bg-white text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            icon={<ArrowRight className="ml-2 w-5 h-5" />}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}