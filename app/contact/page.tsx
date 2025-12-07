'use client';

import Header from "@/components/Header";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import {
    Mail,
    MessageCircle,
    Send,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    User,
    Smartphone,
    Building,
    CheckCircle
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/FBConfig/fbFunctions";
import { useRouter } from "next/navigation";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        userType: "real-estate-owner",
        subject: "",
        message: "",
        preferredContact: "email"
    });
    let router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) return router.replace(`/login`)
        })
    }, [])


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const mailtoLink = `mailto:mazhanbaig44@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}Email: ${formData.email}Phone: ${formData.phone}User Type: ${formData.userType}Message: ${formData.message}`)}`;

        // Open user's email client
        window.location.href = mailtoLink;

        // Set submission state
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after a few seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                userType: "real-estate-owner",
                subject: "",
                message: "",
                preferredContact: "email",
            });
        }, 3000);
    };




    const handleChange = (e: any) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const faqs = [
        { q: "How do I get started?", a: "Sign up for a free account, complete your profile, and start adding properties or clients." },
        { q: "Is there a mobile app?", a: "Yes! Zestate works as a progressive web app on all devices." },
        { q: "Can I manage multiple offices?", a: "Absolutely. Zestate supports multi-location management with centralized control." },
        { q: "How secure is my data?", a: "We use bank-level encryption and comply with data protection regulations." },
        { q: "Do you offer team training?", a: "Yes! We provide training sessions and video tutorials." },
        { q: "Can I integrate other software?", a: "Zestate offers API access for CRM, accounting, and marketing tools." }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header />

            {/* Hero */}
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full mb-6">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Contact Support</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        Get in Touch with{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Zestate
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions? We're here to help you succeed with your real estate management.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
                                    <p className="text-gray-600">We typically respond within 2 hours</p>
                                </div>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
                                    <Button
                                        label="Send Another"
                                        variant="theme2"
                                        onClick={() => setIsSubmitted(false)}
                                    />
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                    placeholder="John Smith"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <div className="relative">
                                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">I am a *</label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <select
                                                    name="userType"
                                                    value={formData.userType}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                                                >
                                                    <option value="real-estate-owner">Real Estate Owner</option>
                                                    <option value="property-agent">Property Agent</option>
                                                    <option value="property-buyer">Buyer</option>
                                                    <option value="property-seller">Seller</option>
                                                    <option value="investor">Investor</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                            placeholder="Tell us about your inquiry..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        label={isSubmitting ? "Sending..." : "Send Message"}
                                        variant="theme"
                                        size="lg"
                                        icon={<Send className="ml-2 w-5 h-5" />}
                                        disabled={isSubmitting}
                                        classNameC="w-full py-3"
                                    />
                                </form>
                            )}
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-8 lg:mt-0">
                        <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl border border-blue-100 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <HelpCircle className="w-6 h-6 text-blue-600" />
                                <h3 className="text-xl font-bold text-gray-900">FAQs</h3>
                            </div>

                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                            className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                                        >
                                            <span className="font-medium text-gray-900">{faq.q}</span>
                                            {expandedFaq === index ? (
                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            )}
                                        </button>
                                        {expandedFaq === index && (
                                            <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                                                <p className="text-gray-600">{faq.a}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-xl text-black">
                                <p className="text-center">
                                    Still need help?{' '}
                                    <a href="mailto:support@zestate.com" className="font-semibold underline">
                                        Email us directly
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}