'use client'

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    Home, Calendar, Check, DollarSign,
    ChevronRight, Crown, Rocket,
    CreditCard, Shield, Users,
    RefreshCw, Headphones, ShieldCheck
} from "lucide-react"
import { message } from "antd"
import Header from "@/components/Header"
import { checkUserSession, createJazzCashPayment } from "@/FBConfig/fbFunctions"

export default function PricingPage() {

    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [selectedPayment, setSelectedPayment] = useState<string>('easypaisa')
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [userInfo, setUserInfo] = useState<any>(null)

    useEffect(() => {
        const initPage = async () => {
            try {
                setLoading(true);

                // 1. Check Firebase Auth session
                const sessionUser = await checkUserSession();
                if (!sessionUser) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                const storedUser = localStorage.getItem('userInfo');
                if (!storedUser) {
                    message.error('User data not found');
                    router.replace('/login');
                    return;
                }

                const userData: any = JSON.parse(storedUser);
                setUserInfo(userData);


            } catch (err) {
                message.error("Something went wrong!");
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        initPage();
    }, [router]);

    const ultimatePackage = {
        id: 'ultimate',
        name: 'Ultimate Package',
        price: '500',
        currency: 'PKR',
        duration: '/month',
        description: 'Complete real estate management solution',
        gradient: 'from-purple-400 to-blue-400',
        features: [
            {
                category: 'Properties',
                icon: Home,
                items: [
                    'Unlimited Property Listings',
                    'Premium Property Showcase',
                    '360° Virtual Tours',
                    'Advanced Property Search',
                    'Property Status Tracking',
                    'Image/Video Gallery',
                    'Location Mapping',
                ]
            },
            {
                category: 'Clients',
                icon: Users,
                items: [
                    'Unlimited Client Management',
                    'Client Database',
                    'Lead Tracking System',
                    'Client Communication History',
                    'Client Requirements Tracker',
                    'Follow-up Reminders',
                    'Email & Call Integration',
                ]
            },
            {
                category: 'Events',
                icon: Calendar,
                items: [
                    'Unlimited Event Creation',
                    'Property Viewing Scheduling',
                    'Client Meeting Management',
                    'Event Calendar View',
                    'Reminders & Notifications',
                ]
            },
        ],
        benefits: [
            { icon: Shield, text: 'Secure Platform' },
            { icon: Users, text: '1,000+ Agents' },
            { icon: Headphones, text: '24/7 Support' },
            { icon: RefreshCw, text: 'Free Updates' }
        ]
    }

    const paymentMethods = useMemo(() => [
        {
            id: 'easypaisa',
            name: 'EasyPaisa',
            borderColor: 'border-[#4CAF50]/30',
            bgColor: 'bg-[#E8F5E8]'
        },
        {
            id: 'jazzcash',
            name: 'JazzCash',
            borderColor: 'border-[#DA291C]/30',
            bgColor: 'bg-[#FCE8E7]'
        }
    ], [])

    const handlePayment = async () => {
        if (!userInfo?.email) return;

        try {
            setIsProcessing(true);

            const paymentData = await createJazzCashPayment(
                ultimatePackage.price,
                userInfo.email,
                selectedPayment
            );

            const form = document.createElement("form");
            form.method = "POST";
            form.action = "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoMWalletTransaction";

            Object.entries({ ...paymentData, paymentMethod: selectedPayment }).forEach(([key, val]) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = String(val);
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error(error);
            message.error("Failed to initiate payment");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50/30">
            <Header />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Choose Your{' '}
                        <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Ultimate Package
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-2 max-w-xl">
                        Get unlimited access to all features with our all-in-one real estate solution
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100/50 shadow-sm overflow-hidden">

                            <div className={`bg-gradient-to-r ${ultimatePackage.gradient} px-6 py-4`}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">
                                            {ultimatePackage.name}
                                        </h2>
                                        <p className="text-white/70 text-sm">
                                            {ultimatePackage.description}
                                        </p>
                                    </div>
                                    <div className="text-white text-3xl font-bold">
                                        {ultimatePackage.currency} {ultimatePackage.price}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 grid md:grid-cols-2 gap-6">
                                {ultimatePackage.features.map((category, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-semibold text-gray-700 mb-2">
                                            {category.category}
                                        </h3>
                                        <ul className="space-y-2">
                                            {category.items
                                                .slice(0, isExpanded ? 10 : 4)
                                                .map((item, i) => (
                                                    <li key={i} className="flex gap-2 text-sm text-gray-600">
                                                        <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                                                        {item}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        {/* Payment Summary */}
                        <div className="bg-white rounded-xl border p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="w-5 h-5 text-purple-400" />
                                <h3 className="font-semibold text-gray-700">Payment Summary</h3>
                            </div>

                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                    {ultimatePackage.currency} {ultimatePackage.price}
                                </span>
                            </div>

                            <button
                                disabled={isProcessing}
                                onClick={handlePayment}
                                className="w-full bg-gradient-to-r from-purple-400 to-blue-400 text-white py-3 rounded-lg font-medium hover:from-purple-500 hover:to-blue-500 transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Rocket className="w-4 h-4" />
                                {isProcessing ? "Processing..." : "Proceed to Payment"}
                                <ChevronRight className="w-4 h-4" />
                            </button>

                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white rounded-xl border p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-blue-400" />
                                <h3 className="font-semibold text-gray-700">Payment Methods</h3>
                            </div>

                            <div className="space-y-3">
                                {paymentMethods.map(method => (
                                    <div
                                        key={method.id}
                                        onClick={() => setSelectedPayment(method.id)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer
                                        ${selectedPayment === method.id ? method.bgColor : ''}
                                        ${method.borderColor}`}
                                    >
                                        <span>{method.name}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-xl p-4 border">
                            <div className="flex gap-3">
                                <ShieldCheck className="w-5 h-5 text-purple-400 mt-0.5" />
                                <p className="text-xs text-gray-500">
                                    Your payment information is encrypted and secure.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}