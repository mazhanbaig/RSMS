// 'use client'

// import { auth, checkUserSession, getData, updateData } from "@/FBConfig/fbFunctions"
// import { useParams, useRouter } from "next/navigation"
// import { useEffect, useState, useCallback, useMemo } from "react"
// import {
//     Home, MapPin, Bed, Bath, Square, Calendar,
//     Phone, Check, Share2, Heart, Car, Trees, Shield,
//     Edit, ArrowLeft, DollarSign, Star, Target, Users,
//     FileText, Activity, Zap, Briefcase, Layers, Compass,
//     LineChart, Clipboard, Eye, Building, AlertCircle,
//     ChevronRight, CheckCircle, Clock, TrendingUp,
//     MessageSquare, Plus, Mail, PhoneCall, ExternalLink,
//     Trash2, Crown, Sparkles, Award, Gem, Rocket,
//     Wallet, Smartphone, Copy, Upload, Info, X,
//     CreditCard, BadgeCheck, RefreshCw,
//     Headphones, ShieldCheck
// } from "lucide-react"
// import Button from "@/components/Button"
// import { message, Modal } from "antd"
// import Header from "@/components/Header"
// import Loader from "@/components/Loader"

// interface UserData {
//     uid: string;
//     email: string;
//     name?: string;
//     subscription?: {
//         plan: string;
//         status: 'active' | 'expired' | 'pending';
//         expiryDate?: string;
//         paymentMethod?: string;
//         transactionId?: string;
//     };
// }

// export default function PricingPage() {
//     const [selectedPayment, setSelectedPayment] = useState<string>('easypaisa')
//     const [userInfo, setUserInfo] = useState<UserData | null>(null)
//     const [loading, setLoading] = useState(true)
//     const [transactionId, setTransactionId] = useState('')
//     const [isProcessing, setIsProcessing] = useState(false)
//     const [screenshot, setScreenshot] = useState<File | null>(null)
//     const [termsAccepted, setTermsAccepted] = useState(false)
//     const [paymentStep, setPaymentStep] = useState(1)
//     const [isExpanded, setIsExpanded] = useState(false)

//     const router = useRouter()

//     // Single Package - 500 PKR
//     const ultimatePackage = {
//         id: 'ultimate',
//         name: 'Ultimate Package',
//         price: '500',
//         currency: 'PKR',
//         duration: '/month',
//         description: 'Complete real estate management solution',
//         icon: Crown,
//         gradient: 'from-purple-400 to-blue-400',
//         lightGradient: 'from-purple-50/80 to-blue-50/80',
//         borderColor: 'border-purple-100',
//         features: [
//             {
//                 category: 'Properties',
//                 icon: Home,
//                 color: 'text-emerald-600',
//                 bg: 'bg-emerald-50/80',
//                 items: [
//                     'Unlimited Property Listings',
//                     'Premium Property Showcase',
//                     '360° Virtual Tours',
//                     'Advanced Property Search',
//                     'Property Status Tracking',
//                     'Image/Video Gallery',
//                     'Location Mapping',
//                 ]
//             },
//             {
//                 category: 'Clients',
//                 icon: Users,
//                 color: 'text-blue-600',
//                 bg: 'bg-blue-50/80',
//                 items: [
//                     'Unlimited Client Management',
//                     'Client Database',
//                     'Lead Tracking System',
//                     'Client Communication History',
//                     'Client Requirements Tracker',
//                     'Follow-up Reminders',
//                     'Email & Call Integration',
//                 ]
//             },
//             {
//                 category: 'Events',
//                 icon: Calendar,
//                 color: 'text-purple-600',
//                 bg: 'bg-purple-50/80',
//                 items: [
//                     'Unlimited Event Creation',
//                     'Property Viewing Scheduling',
//                     'Client Meeting Management',
//                     'Event Calendar View',
//                     'Reminders & Notifications',
//                 ]
//             },
//         ],
//         benefits: [
//             { icon: Shield, text: 'Secure Platform', color: 'text-emerald-600' },
//             { icon: Users, text: '1,000+ Agents', color: 'text-blue-600' },
//             { icon: Headphones, text: '24/7 Support', color: 'text-purple-600' },
//             { icon: RefreshCw, text: 'Free Updates', color: 'text-amber-600' }
//         ]
//     }

//     // Payment Methods - Using authentic Pakistani icons
//     const paymentMethods = useMemo(() => [
//         {
//             id: 'easypaisa',
//             name: 'EasyPaisa',
//             color: 'text-[#107C10]',
//             borderColor: 'border-[#4CAF50]/30',
//             bgColor: 'bg-[#E8F5E8]',
//         //     accountNumber: '0312-1234567',
//         //     accountName: 'RealEstate Solutions PK',
//         //     instructions: [
//         //         'Open EasyPaisa mobile app',
//         //         'Select "Send Money" from main menu',
//         //         'Enter account number: 0312-1234567',
//         //         'Enter amount: 500 PKR',
//         //         'Add your email in notes/description',
//         //         'Confirm and save transaction ID'
//         //     ]
//         },
//         {
//             id: 'jazzcash',
//             name: 'JazzCash',
//             color: 'text-[#DA291C]',
//             borderColor: 'border-[#DA291C]/30',
//             bgColor: 'bg-[#FCE8E7]',
//             // accountNumber: '0300-7654321',
//             // accountName: 'RealEstate Solutions PK',
//             // instructions: [
//             //     'Open JazzCash mobile app',
//             //     'Select "Send Money" option',
//             //     'Enter account number: 0300-7654321',
//             //     'Enter amount: 500 PKR',
//             //     'Add your email in description',
//             //     'Complete transaction and save ID'
//             // ]
//         }
//     ], [])

//     // // Check authentication
//     // useEffect(() => {
//     //     const checkAuth = async () => {
//     //         try {
//     //             const user: any = await checkUserSession();
//     //             if (!user) {
//     //                 message.error('Please Login First');
//     //                 router.replace('/login');
//     //                 return;
//     //             }

//     //             const storedUser = localStorage.getItem('userInfo');
//     //             if (!storedUser) {
//     //                 message.error('User info not found');
//     //                 router.replace('/login');
//     //                 return;
//     //             }

//     //             const userData = JSON.parse(storedUser);
//     //             setUserInfo(userData);

//     //             if (userData.subscription?.status === 'active') {
//     //                 message.info('You already have an active subscription');
//     //                 router.replace(`/realstate/${userData.uid}/dashboard`);
//     //             }

//     //         } catch (err) {
//     //             console.error('Authentication error:', err);
//     //             router.replace('/login');
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     checkAuth();
//     // }, [router]);

//     // const handleSubmitPayment = async () => {
//     //     if (!transactionId.trim()) {
//     //         message.error('Please enter transaction ID')
//     //         return
//     //     }

//     //     if (!screenshot) {
//     //         message.error('Please upload payment screenshot')
//     //         return
//     //     }

//     //     if (!termsAccepted) {
//     //         message.error('Please accept terms and conditions')
//     //         return
//     //     }

//     //     setIsProcessing(true)

//     //     try {
//     //         await new Promise(resolve => setTimeout(resolve, 2000))

//     //         if (userInfo?.uid) {
//     //             await updateData(`users/${userInfo.uid}`, {
//     //                 subscription: {
//     //                     plan: ultimatePackage.id,
//     //                     planName: ultimatePackage.name,
//     //                     status: 'pending',
//     //                     paymentMethod: selectedPayment,
//     //                     transactionId: transactionId,
//     //                     submittedAt: new Date().toISOString(),
//     //                     expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
//     //                 }
//     //             })
//     //         }

//     //         message.success('Payment submitted successfully! Verification within 2-3 hours.')
//     //         router.push(`/realstate/${userInfo?.uid}/payment-success`)

//     //     } catch (error) {
//     //         console.error('Payment error:', error)
//     //         message.error('Failed to process payment. Please try again.')
//     //     } finally {
//     //         setIsProcessing(false)
//     //     }
//     // }

//     // const copyToClipboard = (text: string) => {
//     //     navigator.clipboard.writeText(text)
//     //     message.success('Copied to clipboard!')
//     // }

//     // if (loading) {
//     //     return <Loader />
//     // }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50/30">
//             <Header userData={userInfo} />

//             <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <div className="mb-10">
//                     <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
//                         <div className="w-6 h-px bg-gradient-to-r from-purple-300 to-blue-300"></div>
//                         <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Subscription</span>
//                         <div className="w-6 h-px bg-gradient-to-r from-blue-300 to-cyan-300"></div>
//                     </div>

//                     <div className="space-y-3">
//                         <div>
//                             <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//                                 Choose Your{' '}
//                                 <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
//                                     Ultimate Package
//                                 </span>
//                             </h1>
//                             <p className="text-gray-500 mt-2 max-w-xl">
//                                 Get unlimited access to all features with our all-in-one real estate solution
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Pricing Card */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//                     {/* Left Column - Package Overview */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Package Card */}
//                         <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100/50 shadow-sm overflow-hidden">
//                             <div className={`bg-gradient-to-r ${ultimatePackage.gradient} px-6 py-4 opacity-90`}>
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-3">
//                                         <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
//                                             <Crown className="w-6 h-6 text-white" />
//                                         </div>
//                                         <div>
//                                             <h2 className="text-xl font-semibold text-white">{ultimatePackage.name}</h2>
//                                             <p className="text-white/70 text-sm">{ultimatePackage.description}</p>
//                                         </div>
//                                     </div>
//                                     <div className="text-right">
//                                         <div className="text-3xl font-bold text-white">{ultimatePackage.currency} {ultimatePackage.price}</div>
//                                         <div className="text-white/70 text-sm">{ultimatePackage.duration}</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Features Grid */}
//                             <div className="p-6">
//                                 <div className="grid md:grid-cols-2 gap-6">
//                                     {ultimatePackage.features.map((category, idx) => (
//                                         <div key={idx} className="space-y-3">
//                                             <div className="flex items-center gap-2 border-b border-gray-100/80 pb-2">
//                                                 <div className={`p-1.5 rounded-lg ${category.bg}`}>
//                                                     <category.icon className={`w-4 h-4 ${category.color}`} />
//                                                 </div>
//                                                 <h3 className="font-semibold text-gray-700">{category.category}</h3>
//                                             </div>
//                                             <ul
//                                                 className={`${category.category === "Events"
//                                                         ? "flex flex-wrap gap-3"
//                                                         : "space-y-2"
//                                                     }`}
//                                             >
//                                                 {category.items
//                                                     .slice(0, isExpanded ? 10 : 4)
//                                                     .map((item, itemIdx) => (
//                                                         <li
//                                                             key={itemIdx}
//                                                             className="text-sm text-gray-600 flex items-start gap-2"
//                                                         >
//                                                             <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
//                                                             <span>{item}</span>
//                                                         </li>
//                                                     ))}

//                                                 {!isExpanded && category.items.length > 4 && (
//                                                     <button
//                                                         onClick={() => setIsExpanded(true)}
//                                                         className="text-xs text-purple-500 font-medium mt-1 hover:text-purple-600"
//                                                     >
//                                                         +{category.items.length - 4} more features
//                                                     </button>
//                                                 )}
//                                             </ul>

//                                         </div>
//                                     ))}
//                             </div>

//                             {/* Benefits */}
//                             <div className="mt-6 pt-6 border-t border-gray-100/80">
//                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                                     {ultimatePackage.benefits.map((benefit, idx) => (
//                                         <div key={idx} className="flex items-center gap-2">
//                                             <benefit.icon className={`w-4 h-4 ${benefit.color} opacity-80`} />
//                                             <span className="text-xs text-gray-500">{benefit.text}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Column - Payment Options */}
//                 <div className="space-y-6">
//                     {/* Price Summary */}
//                     <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100/50 p-5 shadow-sm">
//                         <div className="flex items-center gap-2 mb-4">
//                             <DollarSign className="w-5 h-5 text-purple-400" />
//                             <h3 className="font-semibold text-gray-700">Payment Summary</h3>
//                         </div>
//                         <div className="space-y-3">
//                             <div className="flex justify-between items-center">
//                                 <span className="text-sm text-gray-500">Package</span>
//                                 <span className="font-medium text-gray-700">{ultimatePackage.name}</span>
//                             </div>
//                             <div className="flex justify-between items-center">
//                                 <span className="text-sm text-gray-500">Duration</span>
//                                 <span className="font-medium text-gray-700">Monthly</span>
//                             </div>
//                             <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-100">
//                                 <span className="text-gray-600">Total</span>
//                                 <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
//                                     {ultimatePackage.currency} {ultimatePackage.price}
//                                 </span>
//                             </div>
//                         </div>

//                         <button
//                             className="w-full mt-4 bg-gradient-to-r from-purple-400 to-blue-400 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-200/50 flex items-center justify-center gap-2"
//                         >
//                             <Rocket className="w-4 h-4" />
//                             Proceed to Payment
//                             <ChevronRight className="w-4 h-4" />
//                         </button>
//                     </div>

//                     {/* Payment Methods Preview - With Authentic Pakistani Icons */}
//                     <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/80 p-5 shadow-sm">
//                         <div className="flex items-center gap-2 mb-4">
//                             <CreditCard className="w-5 h-5 text-blue-400" />
//                             <h3 className="font-semibold text-gray-700">Payment Methods</h3>
//                         </div>

//                         <div className="space-y-3">
//                             {paymentMethods.map((method) => (
//                                 <div
//                                     key={method.id}
//                                     className={`flex items-center gap-3 px-3 py-1 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${method.borderColor} hover:${method.bgColor}`}
//                                 >
//                                     <div className="flex-1">
//                                         <div className="font-medium text-gray-700">{method.name}</div>
//                                         <div className="text-xs text-gray-400">Pay 500 PKR instantly</div>
//                                     </div>
//                                     <ChevronRight className="w-4 h-4 text-gray-300" />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Trust Badge */}
//                     <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-xl p-4 border border-purple-100/50">
//                         <div className="flex items-start gap-3">
//                             <ShieldCheck className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                             <div>
//                                 <h4 className="font-medium text-gray-600 text-sm">Secure Payment</h4>
//                                 <p className="text-xs text-gray-400 mt-1">
//                                     Your payment information is encrypted and secure. Account activation within 2-3 hours after verification.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//         </div>
//             </main >
//         </div >
//     )
// }



'use client'

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { message } from "antd"
import { DollarSign, CreditCard, ChevronRight, Rocket, ShieldCheck, Crown, CheckCircle } from "lucide-react"
import Header from "@/components/Header"

// Dummy user info for demo
const dummyUser = { uid: 'user', email: 'user@example.com', name: 'User' }

export default function PricingPage() {
    const [selectedPayment, setSelectedPayment] = useState<string>('jazzcash')
    const router = useRouter()

    const ultimatePackage = {
        id: 'ultimate-package',
        name: 'Ultimate Package',
        price: '500',
        currency: 'PKR',
    }

    // Payment Methods
    const paymentMethods = useMemo(() => [
        { id: 'jazzcash', name: 'JazzCash', color: 'text-[#DA291C]' },
        { id: 'easypaisa', name: 'EasyPaisa', color: 'text-[#107C10]' }
    ], [])

    const handlePayment = () => {
        if (selectedPayment === 'jazzcash') {
            // JazzCash payment redirection
            const merchantId = process.env.NEXT_PUBLIC_JAZZCASH_MERCHANT_ID
            const amount = ultimatePackage.price
            const txnRef = 'TXN_' + new Date().getTime()
            const returnUrl = encodeURIComponent(`${window.location.origin}/payment-callback`)

            // Redirect using POST form
            const form = document.createElement('form')
            form.method = 'POST'
            form.action = 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoMWalletTransaction' // Use sandbox for testing
            form.target = '_self'

            const params = {
                MerchantID: merchantId,
                Amount: amount,
                TransactionReferenceNumber: txnRef,
                CustomerEmail: dummyUser.email,
                ReturnURL: returnUrl,
                // Add other JazzCash params if needed (SecureHash, etc.)
            }

            Object.entries(params).forEach(([key, val]) => {
                const input = document.createElement('input')
                input.type = 'hidden'
                input.name = key
                input.value = val as string
                form.appendChild(input)
            })

            document.body.appendChild(form)
            form.submit()
        } else {
            message.info('EasyPaisa integration will be added soon!')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50/30">
            <Header userData={dummyUser} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Subscribe to <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Ultimate Package</span>
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Pay easily with JazzCash and manage your real estate efficiently
                    </p>
                </div>

                {/* Payment Summary */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100/50 p-5 shadow-sm mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-5 h-5 text-purple-400" />
                        <h3 className="font-semibold text-gray-700">Payment Summary</h3>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Package</span>
                        <span className="font-medium text-gray-700">{ultimatePackage.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-100">
                        <span className="text-gray-600">Total</span>
                        <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">{ultimatePackage.currency} {ultimatePackage.price}</span>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/80 p-5 shadow-sm mb-6">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-400" /> Select Payment Method
                    </h3>

                    <div className="flex justify-around items-center gap-3">
                        {paymentMethods.map(method => (
                            <div
                                key={method.id}
                                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg border cursor-pointer hover:shadow-sm ${selectedPayment === method.id ? 'border-purple-400 bg-purple-50' : 'border-gray-200'}`}
                                onClick={() => setSelectedPayment(method.id)}
                            >
                                <span className={`font-medium ${method.color}`}>{method.name}</span>
                                {selectedPayment === method.id && <CheckCircle className="w-5 h-5 text-purple-500" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Proceed Button */}
                <button
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-purple-400 to-blue-400 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <Rocket className="w-4 h-4" /> Proceed to Payment <ChevronRight className="w-4 h-4" />
                </button>

                {/* Trust Badge */}
                <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-xl p-4 border border-purple-100/50 mt-6 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-gray-600 text-sm">Secure Payment</h4>
                        <p className="text-xs text-gray-400 mt-1">
                            Your payment information is encrypted and secure. Account activation within 2-3 hours after verification.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}