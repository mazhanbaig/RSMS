'use client'

import html2canvas from "html2canvas";
import { renderToStaticMarkup } from "react-dom/server";
import jsPDF from "jspdf";
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Button from "@/components/Button"
import {
    User, Phone, Mail, Calendar, DollarSign,
    FileText, Home, MapPin, Building, Download,
    ArrowRight, CheckCircle, Shield, Hash
} from "lucide-react"
import { getData, updateData } from "@/FBConfig/fbFunctions"
import { message } from "antd"
import ZStateCertificate from "@/components/ZStateCertificate"
import ZStateCanvaCertificate from "@/components/ZStateCertificate"
import ClassicZStateCertificate from "@/components/ZStateCertificate"

export default function DealPage() {
    const params = useSearchParams()
    const router = useRouter()
    const propertyId = params.get("id")
    const dealType = params.get("type")

    const [currentStep, setCurrentStep] = useState(1)
    const [isDownloading, setIsDownloading] = useState<any>(false)
    const [property, setProperty] = useState<any>("")
    const [userInfo, setUserInfo] = useState<any>('')
    const [formData, setFormData] = useState<any>({
        customerName: "",
        customerContact: "",
        dealAmount: "",
        dealDate: new Date().toISOString().split('T')[0],
        agreementDuration: "12 months",
        agentName: "",
        propertyId: propertyId || "",
        certificateId: `ZS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    })

    useEffect(() => {
        if (!propertyId) return

        getData(`properties/${propertyId}`)
            .then((res: any) => {
                console.log(res);
                setProperty(res)
            })
            .catch((err: any) => {
                message.error('Cant Fetch the Property')
            })
        let userInfo: any = localStorage.getItem('userInfo')
        let parsed = JSON.parse(userInfo)
        setUserInfo(parsed)
    }, [propertyId])



    const handleInputChange = (field: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    const handleNextStep = () => {
        if (!formData.customerName || !formData.customerContact || !formData.dealAmount) {
            message.error("Please fill all required fields marked with *")
            return
        }
        setCurrentStep(2)
    }

    // In your handleDownloadCertificate function:

    const handleDownloadCertificate = async () => {
        if (property.dealType==='sold') {
            message.info("Certificate already downloaded. Deal is already completed.")
            return
        }

        setIsDownloading(true)

        const container = document.createElement('div')
        container.style.position = 'absolute'
        container.style.left = '-9999px'
        container.style.top = '-9999px'
        container.style.width = '1056px'
        container.style.height = '768px'
        container.style.background = 'linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%)'
        container.style.border = '8px solid black'
        container.style.fontFamily = 'Arial, sans-serif'
        container.style.boxSizing = 'border-box'

        container.innerHTML = `
    <div style="padding:80px; height:100%; display:flex; flex-direction:column; justify-content:space-between; position:relative;">

        <!-- Header -->
        <div style="text-align:center;">
            <h1 style="font-size:72px; font-weight:900; letter-spacing:0.3em; margin-bottom:20px;">
                CERTIFICATE
            </h1>
            <div style="height:4px; width:260px; margin:0 auto 24px; background:linear-gradient(to right,#D4AF37,#FFD700);"></div>
            <h2 style="font-size:28px; font-weight:700; letter-spacing:0.2em;">
            OF ${dealType === 'sold' ? 'PROPERTY SALE' : 'RENTAL AGREEMENT'}            </h2>
        </div>

        <!-- Body -->
        <div style="text-align:center;">
            <p style="font-size:20px; color:#555; margin-bottom:40px;">
                This certification is presented to:
            </p>

            <div style="display:inline-block; padding:24px 64px; border:4px solid #D4AF37; font-size:42px; font-weight:700; background:white; margin-bottom:40px;">
                ${formData.customerName}
            </div>

            <div style="max-width:700px; margin:0 auto; font-size:18px; line-height:1.8; color:#333;">
                For successfully completing the ${property.propertyStatus === 'sold' ? 'purchase' : 'rental'} of<br/>
                <strong style="font-size:22px;">${property.title}</strong><br/>
                located at ${property.location}, ${property.city}<br/><br/>

                ${property.propertyStatus === 'sold' ? 'Total Amount:' : 'Rental Amount:'}
                <strong style="color:#D4AF37; font-size:22px;">
                    ₹${Number(formData.dealAmount).toLocaleString('en-IN')}
                </strong>
                ${property.propertyStatus === 'rented' ? `for ${formData.agreementDuration}` : ''}
            </div>
        </div>

        <!-- Footer -->
        <div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; margin-bottom:40px;">
                <div style="text-align:center;">
                    <div style="height:2px; width:180px; background:linear-gradient(to right,#D4AF37,transparent); margin:0 auto 10px;"></div>
                    <p style="font-size:14px; color:#666;">Property Owner</p>
                    <strong>${property.ownerName}</strong>
                </div>

                <div style="text-align:center;">
                    <div style="height:2px; width:180px; background:linear-gradient(to right,#D4AF37,transparent); margin:0 auto 10px;"></div>
                    <p style="font-size:14px; color:#666;">ZState Agent</p>
                    <strong>${formData.agentName}</strong>
                </div>
            </div>

            <div style="border-top:1px solid #ccc; padding-top:16px; text-align:center; font-size:14px; color:#555;">
                ${property.propertyType} • 
                ${new Date(formData.dealDate).toLocaleDateString('en-IN')} • 
                ${formData.certificateId}
            </div>
        </div>

        <!-- Gold Corners -->
        ${['top:30px;left:30px', 'top:30px;right:30px', 'bottom:30px;left:30px', 'bottom:30px;right:30px']
                .map(pos => `
            <div style="position:absolute; ${pos}; width:50px; height:50px; border:2px solid #D4AF37; transform:rotate(45deg);"></div>
        `).join('')}

        <!-- Gold Seal -->
        <div style="position:absolute; bottom:40px; right:40px; width:100px; height:100px; border-radius:50%;
            background:radial-gradient(circle,#FFD700,#D4AF37);
            display:flex; align-items:center; justify-content:center;">
            <div style="width:80px; height:80px; background:white; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                <div style="font-size:30px; font-weight:900; color:#D4AF37;">Z</div>
                <div style="font-size:12px; font-weight:700; letter-spacing:2px;">STATE</div>
            </div>
        </div>

    </div>
    `

        document.body.appendChild(container)

        try {
            const canvas = await html2canvas(container, { scale: 2 })
            const pdf = new jsPDF('landscape', 'mm', 'a4')

            const imgWidth = 297
            const imgHeight = (canvas.height * imgWidth) / canvas.width

            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight)
            pdf.save(`ZState-Certificate-${formData.certificateId}.pdf`)

            message.success("Certificate downloaded successfully!")

            const updatedProp = { ...property, dealCompleted: true, dealType: dealType }
            setProperty(updatedProp)
            await updateData(`properties/${property.id}`, updatedProp)

        } catch (err) {
            console.error(err)
            message.error("Failed to generate certificate")
        } finally {
            setIsDownloading(false)
            document.body.removeChild(container)
        }
    }


    // Add this helper function after your existing functions:
    const formatCurrency = (amount: string) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'PKR',
            maximumFractionDigits: 0
        }).format(Number(amount))
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <Header userData={userInfo} />


            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow mb-4">
                        <Shield className="text-purple-600" size={24} />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {dealType === 'sold' ? 'Sale Certificate' : 'Rental Agreement'}
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Fill the details below to generate official ZState certificate
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Main Content (2/3 width) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Step Indicator */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-8">
                                    <div className={`flex items-center ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>
                                            1
                                        </div>
                                        <span className="ml-2 font-medium">Fill Details</span>
                                    </div>
                                    <div className={`flex items-center ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>
                                            2
                                        </div>
                                        <span className="ml-2 font-medium">Download</span>
                                    </div>
                                </div>
                                <div className="hidden lg:block">
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                        Step {currentStep} of 2
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            {currentStep === 1 ? (
                                <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <FileText className="text-purple-600" size={24} />
                                        <h2 className="text-xl font-bold text-gray-900">Certificate Details</h2>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Property Owner Details */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Owner Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                                    value={property.ownerName || ''}
                                                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                                                    placeholder="Property Owner Name"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Owner Contact *
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                                    value={property.ownerContact || ''}
                                                    onChange={(e) => handleInputChange('ownerContact', e.target.value)}
                                                    placeholder="Owner contact number"
                                                />
                                            </div>
                                        </div>

                                        {/* Customer Details */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Customer Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                                    value={formData.customerName || ''}
                                                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                                                    placeholder="Customer Name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Customer Contact *
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                                    value={formData.customerContact || ''}
                                                    onChange={(e) => handleInputChange('customerContact', e.target.value)}
                                                    placeholder="03XX-XXXXXXX"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Deal Amount *
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                                    value={formData.dealAmount || ''}
                                                    onChange={(e) => handleInputChange('dealAmount', e.target.value)}
                                                    placeholder="Enter deal amount"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Deal Date *
                                                </label>
                                                <input
                                                    type="date"
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                                    value={formData.dealDate || ''}
                                                    onChange={(e) => handleInputChange('dealDate', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Agent Name (Yours) *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                                    value={userInfo?.name || ''}
                                                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                                                    placeholder="Customer Name"
                                                />
                                            </div>
                                        </div>

                                        {/* Agreement Duration for Rented */}
                                        {dealType === "rented" && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Agreement Duration *
                                                </label>
                                                <select
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                                    value={formData.agreementDuration || ''}
                                                    onChange={(e) => handleInputChange('agreementDuration', e.target.value)}
                                                >
                                                    <option value="6 months">6 Months</option>
                                                    <option value="12 months">12 Months</option>
                                                    <option value="24 months">2 Years</option>
                                                    <option value="36 months">3 Years</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-10 flex justify-end">
                                        <Button
                                            label="Next: Preview Certificate"
                                            variant="theme2"
                                            icon={<ArrowRight size={20} />}
                                            classNameC="px-8 py-3"
                                            onClick={handleNextStep}
                                        />
                                    </div>
                                </div>
                            )
                                : (
                                    // STEP 2: Preview
                                    <div className="p-8">
                                        <div className="text-center mb-8">
                                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                            <h2 className="text-2xl font-bold text-gray-900">Ready to Download!</h2>
                                            <p className="text-gray-600 mt-2">Review the details and download your certificate</p>
                                        </div>
                                        {/* <ZStateCanvaCertificate
                                            certificateId={formData.certificateId}
                                            issueDate={formData.dealDate}
                                            customerName={formData.customerName}
                                            propertyTitle={property.title}
                                            propertyLocation={`${property.location}, ${property.city}`}
                                            agentName={property.agentName}
                                            dealType={dealType === 'sold' ? 'Sale' : 'Rental'}
                                        /> */}

                                        {/* <ClassicZStateCertificate
                                            dealType={dealType as "sold" | "rented"}
                                            property={property}
                                            formData={formData}
                                        /> */}
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button
                                                label="Edit Details"
                                                variant="primary"
                                                classNameC="flex-1 py-3"
                                                onClick={() => setCurrentStep(1)}
                                            />
                                            <Button
                                                label={isDownloading ? "Downloading..." : "Download Certificate"}
                                                variant="theme2"
                                                icon={isDownloading ? null : <Download size={20} />}
                                                classNameC="flex-1 py-3"
                                                onClick={handleDownloadCertificate}
                                                disabled={isDownloading}
                                            />
                                        </div>

                                        <div className="mt-8 text-center">
                                            <button
                                                onClick={() => router.push(`/properties/viewproperty/${propertyId}`)}
                                                className="text-purple-600 hover:text-purple-800 font-medium"
                                            >
                                                ← Back to Property
                                            </button>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>


                    {/* RIGHT COLUMN: Property Info (1/3 width) */}
                    <div className="space-y-6">
                        {/* Property Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Home className="text-purple-600" size={20} />
                                <h3 className="font-bold text-gray-900">Property Information</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">{property.title}</h4>
                                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                                        <MapPin size={14} />
                                        <span className="text-sm">{property.location}, {property.city}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500">Price</div>
                                        <div className="font-bold text-purple-700">₹{parseInt(property.price).toLocaleString('en-IN')}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500">Area</div>
                                        <div className="font-medium">{property.area} {property.areaUnit}</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Type</span>
                                        <span className="font-medium flex items-center gap-1">
                                            <Building size={14} />
                                            {property.propertyType}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Bedrooms</span>
                                        <span className="font-medium">{property.bedrooms}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Bathrooms</span>
                                        <span className="font-medium">{property.bathrooms}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Owner</span>
                                        <span className="font-medium">{property.ownerName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                            <div className="flex items-start gap-3">
                                <FileText className="text-blue-600" size={20} />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">About ZState Certificates</h4>
                                    <p className="text-gray-700 text-sm mb-3">
                                        Official digital certificates for property transactions.
                                    </p>
                                    <ul className="text-gray-700 text-sm space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>Legally valid proof</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={14} className="text-green-500" />
                                            <span>Digitally signed</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={14} className="text-green-500" />
                                            <span>Permanent record</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Current Step Info */}
                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-700 mb-2">Step {currentStep} of 2</div>
                                <p className="text-gray-600 text-sm">
                                    {currentStep === 1 ? 'Fill in all required details' : 'Review and download certificate'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
