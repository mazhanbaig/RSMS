'use client'

import { auth, checkUserSession, getData, updateData } from "@/FBConfig/fbFunctions"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useCallback, useMemo } from "react"
import {
    Home, MapPin, Bed, Bath, Square, Calendar,
    Phone, Check, Share2, Heart, Car, Trees, Shield,
    Edit, ArrowLeft, DollarSign, Star, Target, Users,
    FileText, Activity, Zap, Briefcase, Layers, Compass,
    LineChart, Clipboard, Eye, Building, AlertCircle,
    ChevronRight, CheckCircle, Clock, TrendingUp,
    MessageSquare, Plus, Mail, PhoneCall, ExternalLink,
    Trash2, Crown, Sparkles, Award, Gem, Rocket,
    Wallet, Smartphone, Copy, Upload, Info, X,
    CreditCard, BadgeCheck, RefreshCw,
    Headphones, ShieldCheck
} from "lucide-react"
import Button from "@/components/Button"
import { message, Modal } from "antd"
import Header from "@/components/Header"
import Loader from "@/components/Loader"

interface UserData {
    uid: string;
    email: string;
    name?: string;
    subscription?: {
        plan: string;
        status: 'active' | 'expired' | 'pending';
        expiryDate?: string;
        paymentMethod?: string;
        transactionId?: string;
    };
}

// Custom Icons for Payment Methods
const EasypaisaIcon = ({ size = 24, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" className="text-emerald-600" />
        <circle cx="16" cy="12" r="2.5" fill="white" />
        <rect x="4" y="8" width="8" height="8" rx="2" fill="white" fillOpacity="0.3" />
        <path d="M7 11L9 13L13 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const JazzCashIcon = ({ size = 24, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" className="text-red-600" />
        <path
            d="M8 12C9.5 9 14.5 9 16 12C14.5 15 9.5 15 8 12Z"
            fill="white"
            fillOpacity="0.9"
        />
        <circle cx="12" cy="12" r="1.5" fill="white" />
    </svg>
);

export default function PricingPage() {
    const [selectedPayment, setSelectedPayment] = useState<string>('easypaisa')
    const [userInfo, setUserInfo] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [screenshot, setScreenshot] = useState<File | null>(null)
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [paymentStep, setPaymentStep] = useState(1)
    const [isExpanded, setIsExpanded] = useState(false)

    const router = useRouter()

    // Single Package - 500 PKR
    const ultimatePackage = {
        id: 'ultimate',
        name: 'Ultimate Package',
        price: '500',
        currency: 'PKR',
        duration: '/month',
        description: 'Complete real estate management solution',
        icon: Crown,
        gradient: 'from-purple-400 to-blue-400',
        lightGradient: 'from-purple-50/80 to-blue-50/80',
        borderColor: 'border-purple-100',
        features: [
            {
                category: 'Properties',
                icon: Home,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50/80',
                items: [
                    'Unlimited Property Listings',
                    'Premium Property Showcase',
                    '360° Virtual Tours',
                    'Property Comparison',
                    'Featured Listings Priority',
                    'Advanced Property Search',
                    'Property Status Tracking',
                    'Image/Video Gallery',
                    'Location Mapping',
                    'Nearby Places Integration'
                ]
            },
            {
                category: 'Clients',
                icon: Users,
                color: 'text-blue-600',
                bg: 'bg-blue-50/80',
                items: [
                    'Unlimited Client Management',
                    'Client Database',
                    'Lead Tracking System',
                    'Client Communication History',
                    'Favorite Properties',
                    'Client Requirements Tracker',
                    'Follow-up Reminders',
                    'Email & WhatsApp Integration',
                    'Client Analytics',
                    'Feedback System'
                ]
            },
            {
                category: 'Events',
                icon: Calendar,
                color: 'text-purple-600',
                bg: 'bg-purple-50/80',
                items: [
                    'Unlimited Event Creation',
                    'Property Viewing Scheduling',
                    'Open House Events',
                    'Client Meeting Management',
                    'Event Calendar View',
                    'Reminders & Notifications',
                    'Virtual Meeting Integration',
                    'Attendance Tracking',
                    'Event Analytics',
                    'Calendar Sync'
                ]
            },
            {
                category: 'Premium',
                icon: Sparkles,
                color: 'text-amber-600',
                bg: 'bg-amber-50/80',
                items: [
                    'Advanced Analytics Dashboard',
                    'Revenue & Commission Tracking',
                    'Document Management',
                    'Contract Templates',
                    'Social Media Integration',
                    'Marketing Tools',
                    'SMS & Email Campaigns',
                    'Backup & Export',
                    'Priority 24/7 Support',
                    'Regular Updates'
                ]
            }
        ],
        benefits: [
            { icon: Shield, text: 'Secure Platform', color: 'text-emerald-600' },
            { icon: Users, text: '1,000+ Agents', color: 'text-blue-600' },
            { icon: Headphones, text: '24/7 Support', color: 'text-purple-600' },
            { icon: RefreshCw, text: 'Free Updates', color: 'text-amber-600' }
        ]
    }

    // Payment Methods
    const paymentMethods = useMemo(() => [
        {
            id: 'easypaisa',
            name: 'EasyPaisa',
            icon: EasypaisaIcon,
            gradient: 'from-emerald-400 to-emerald-500',
            lightGradient: 'from-emerald-50/80 to-emerald-50/80',
            color: 'text-emerald-600',
            borderColor: 'border-emerald-100',
            bgColor: 'bg-emerald-50/50',
            accountNumber: '0312-1234567',
            accountName: 'RealEstate Solutions PK',
            instructions: [
                'Open EasyPaisa app',
                'Select "Send Money"',
                'Enter: 0312-1234567',
                'Amount: 500 PKR',
                'Add email in notes',
                'Save transaction ID'
            ]
        },
        {
            id: 'jazzcash',
            name: 'JazzCash',
            icon: JazzCashIcon,
            gradient: 'from-rose-400 to-rose-500',
            lightGradient: 'from-rose-50/80 to-rose-50/80',
            color: 'text-rose-600',
            borderColor: 'border-rose-100',
            bgColor: 'bg-rose-50/50',
            accountNumber: '0300-7654321',
            accountName: 'RealEstate Solutions PK',
            instructions: [
                'Open JazzCash app',
                'Select "Send Money"',
                'Enter: 0300-7654321',
                'Amount: 500 PKR',
                'Add email in notes',
                'Save transaction ID'
            ]
        }
    ], [])

    // Check authentication
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user: any = await checkUserSession();
                if (!user) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                const storedUser = localStorage.getItem('userInfo');
                if (!storedUser) {
                    message.error('User info not found');
                    router.replace('/login');
                    return;
                }

                const userData = JSON.parse(storedUser);
                setUserInfo(userData);

                if (userData.subscription?.status === 'active') {
                    message.info('You already have an active subscription');
                    router.replace(`/realstate/${userData.uid}/dashboard`);
                }

            } catch (err) {
                console.error('Authentication error:', err);
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleSubmitPayment = async () => {
        if (!transactionId.trim()) {
            message.error('Please enter transaction ID')
            return
        }

        if (!screenshot) {
            message.error('Please upload payment screenshot')
            return
        }

        if (!termsAccepted) {
            message.error('Please accept terms and conditions')
            return
        }

        setIsProcessing(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            if (userInfo?.uid) {
                await updateData(`users/${userInfo.uid}`, {
                    subscription: {
                        plan: ultimatePackage.id,
                        planName: ultimatePackage.name,
                        status: 'pending',
                        paymentMethod: selectedPayment,
                        transactionId: transactionId,
                        submittedAt: new Date().toISOString(),
                        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                    }
                })
            }

            message.success('Payment submitted successfully! Verification within 2-3 hours.')
            setShowPaymentModal(false)
            router.push(`/realstate/${userInfo?.uid}/payment-success`)

        } catch (error) {
            console.error('Payment error:', error)
            message.error('Failed to process payment. Please try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        message.success('Copied to clipboard!')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50/30">
            <Header userData={userInfo} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {/* Header Section - Softer */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                        <div className="w-6 h-px bg-gradient-to-r from-purple-300 to-blue-300"></div>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Subscription</span>
                        <div className="w-6 h-px bg-gradient-to-r from-blue-300 to-cyan-300"></div>
                    </div>

                    <div className="space-y-3">
                        <div>
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
                    </div>
                </div>

                {/* Main Pricing Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Left Column - Package Overview */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Package Card - Softer */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100/50 shadow-sm overflow-hidden">
                            <div className={`bg-gradient-to-r ${ultimatePackage.gradient} px-6 py-4 opacity-90`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                            <Crown className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">{ultimatePackage.name}</h2>
                                            <p className="text-white/70 text-sm">{ultimatePackage.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-white">{ultimatePackage.currency} {ultimatePackage.price}</div>
                                        <div className="text-white/70 text-sm">{ultimatePackage.duration}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Features Grid - Softer */}
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {ultimatePackage.features.map((category, idx) => (
                                        <div key={idx} className="space-y-3">
                                            <div className="flex items-center gap-2 border-b border-gray-100/80 pb-2">
                                                <div className={`p-1.5 rounded-lg ${category.bg}`}>
                                                    <category.icon className={`w-4 h-4 ${category.color}`} />
                                                </div>
                                                <h3 className="font-semibold text-gray-700">{category.category}</h3>
                                            </div>
                                            <ul className="space-y-2">
                                                {category.items.slice(0, isExpanded ? 10 : 4).map((item, itemIdx) => (
                                                    <li key={itemIdx} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                                {!isExpanded && category.items.length > 4 && (
                                                    <button
                                                        onClick={() => setIsExpanded(true)}
                                                        className="text-xs text-purple-500 font-medium mt-1 hover:text-purple-600"
                                                    >
                                                        +{category.items.length - 4} more features
                                                    </button>
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                {/* Benefits - Softer */}
                                <div className="mt-6 pt-6 border-t border-gray-100/80">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {ultimatePackage.benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <benefit.icon className={`w-4 h-4 ${benefit.color} opacity-80`} />
                                                <span className="text-xs text-gray-500">{benefit.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment Options */}
                    <div className="space-y-6">
                        {/* Price Summary - Softer */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100/50 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="w-5 h-5 text-purple-400" />
                                <h3 className="font-semibold text-gray-700">Payment Summary</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Package</span>
                                    <span className="font-medium text-gray-700">{ultimatePackage.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Duration</span>
                                    <span className="font-medium text-gray-700">Monthly</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-100">
                                    <span className="text-gray-600">Total</span>
                                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                                        {ultimatePackage.currency} {ultimatePackage.price}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowPaymentModal(true)}
                                className="w-full mt-4 bg-gradient-to-r from-purple-400 to-blue-400 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-200/50 flex items-center justify-center gap-2"
                            >
                                <Rocket className="w-4 h-4" />
                                Proceed to Payment
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Payment Methods Preview - With Icons */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/80 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-blue-400" />
                                <h3 className="font-semibold text-gray-700">Payment Methods</h3>
                            </div>

                            <div className="space-y-3">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        onClick={() => {
                                            setSelectedPayment(method.id)
                                            setShowPaymentModal(true)
                                        }}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${method.borderColor} hover:${method.bgColor}`}
                                    >
                                        <div className={`p-2 rounded-lg bg-gradient-to-r ${method.gradient} text-white`}>
                                            <method.icon size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-700">{method.name}</div>
                                            <div className="text-xs text-gray-400">Pay 500 PKR instantly</div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Badge - Softer */}
                        <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-xl p-4 border border-purple-100/50">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-gray-600 text-sm">Secure Payment</h4>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Your payment information is encrypted and secure. Account activation within 2-3 hours after verification.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Modal - Softer */}
                <Modal
                    open={showPaymentModal}
                    onCancel={() => {
                        setShowPaymentModal(false)
                        setTransactionId('')
                        setScreenshot(null)
                        setTermsAccepted(false)
                        setPaymentStep(1)
                    }}
                    footer={null}
                    width={500}
                    className="rounded-xl overflow-hidden"
                >
                    <div className="p-6">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`p-2.5 rounded-lg bg-gradient-to-r ${paymentMethods.find(m => m.id === selectedPayment)?.gradient || 'from-purple-400 to-blue-400'} text-white`}>
                                    {selectedPayment === 'easypaisa' && <EasypaisaIcon size={20} />}
                                    {selectedPayment === 'jazzcash' && <JazzCashIcon size={20} />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">Complete Payment</h3>
                                    <p className="text-sm text-gray-400">Amount: 500 PKR</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="p-1 hover:bg-gray-100/80 rounded-lg"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {paymentStep === 1 ? (
                            /* Step 1: Select Payment Method */
                            <div className="space-y-3">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => {
                                            setSelectedPayment(method.id)
                                            setPaymentStep(2)
                                        }}
                                        className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${selectedPayment === method.id
                                                ? `${method.borderColor} ${method.bgColor}`
                                                : 'border-gray-100/80 hover:border-gray-200'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-lg bg-gradient-to-r ${method.gradient} text-white`}>
                                            <method.icon size={24} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className="font-semibold text-gray-700">{method.name}</h4>
                                            <p className="text-sm text-gray-400">Pay 500 PKR instantly</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300" />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            /* Step 2: Payment Details */
                            <div className="space-y-4">
                                {/* Account Details */}
                                <div className={`p-4 rounded-xl ${paymentMethods.find(m => m.id === selectedPayment)?.bgColor} border ${paymentMethods.find(m => m.id === selectedPayment)?.borderColor}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-500">Account Number</span>
                                        <div className="flex items-center gap-2">
                                            <code className="bg-white/80 px-3 py-1 rounded-lg text-sm font-mono">
                                                {paymentMethods.find(m => m.id === selectedPayment)?.accountNumber}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(paymentMethods.find(m => m.id === selectedPayment)?.accountNumber || '')}
                                                className="p-1.5 bg-white/80 rounded-lg hover:bg-white"
                                            >
                                                <Copy className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Account Name</span>
                                        <span className="font-medium text-gray-600">
                                            {paymentMethods.find(m => m.id === selectedPayment)?.accountName}
                                        </span>
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div className="bg-amber-50/50 rounded-xl p-4">
                                    <h4 className="text-sm font-medium text-amber-700 mb-2 flex items-center gap-1.5">
                                        <Info className="w-4 h-4" />
                                        Instructions
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {paymentMethods.find(m => m.id === selectedPayment)?.instructions.map((inst, idx) => (
                                            <li key={idx} className="text-xs text-amber-600/80 flex items-start gap-2">
                                                <span className="w-4 h-4 rounded-full bg-amber-200/50 flex items-center justify-center text-amber-700 text-[10px] flex-shrink-0 mt-0.5">
                                                    {idx + 1}
                                                </span>
                                                {inst}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Transaction ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                        Transaction ID <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="Enter transaction ID from your payment app"
                                        className="w-full px-4 py-2.5 border border-gray-200/80 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white/80"
                                    />
                                </div>

                                {/* Screenshot Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                        Payment Screenshot <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="border-2 border-dashed border-gray-200/80 rounded-lg p-4 text-center hover:border-purple-300 transition-colors bg-white/50">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => e.target.files && setScreenshot(e.target.files[0])}
                                            className="hidden"
                                            id="screenshot"
                                        />
                                        <label htmlFor="screenshot" className="cursor-pointer block">
                                            {screenshot ? (
                                                <div className="flex items-center justify-center gap-2 text-emerald-500">
                                                    <CheckCircle className="w-5 h-5" />
                                                    <span className="text-sm">{screenshot.name}</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                                                    <span className="text-sm text-purple-500 font-medium">Click to upload</span>
                                                    <span className="text-xs text-gray-400 block">PNG, JPG up to 5MB</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {/* Terms */}
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="mt-1 accent-purple-500"
                                    />
                                    <span className="text-xs text-gray-500">
                                        I confirm that I've made the payment of 500 PKR and the details are correct
                                    </span>
                                </label>

                                {/* Actions */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => setPaymentStep(1)}
                                        className="flex-1 px-4 py-2.5 border border-gray-200/80 rounded-lg font-medium text-gray-600 hover:bg-gray-50/80"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmitPayment}
                                        disabled={isProcessing || !transactionId || !screenshot || !termsAccepted}
                                        className="flex-1 bg-gradient-to-r from-purple-400 to-blue-400 text-white py-2.5 rounded-lg font-medium hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Submit Payment
                                                <Check className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>
            </main>
        </div>
    )
}