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
import { getData } from "@/FBConfig/fbFunctions"
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
            .catch((err:any)=>{
                message.error('Cant Fetch the Property')
            })
        let userInfo:any=localStorage.getItem('userInfo')  
        let parsed=JSON.parse(userInfo) 
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
        setIsDownloading(true)

        // Create a temporary container
        const container = document.createElement('div')
        container.style.position = 'absolute'
        container.style.left = '-9999px'
        container.style.top = '-9999px'
        container.style.width = '1056px'
        container.style.height = '768px'
        container.style.backgroundColor = 'white'
        container.style.border = '8px solid black'
        container.style.padding = '80px'
        container.style.fontFamily = 'Arial, sans-serif'
        container.style.background = 'linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%)'

        // Add gold corners
        const addCorner = (position: string) => {
            const corner = document.createElement('div')
            corner.style.position = 'absolute'
            corner.style.width = '60px'
            corner.style.height = '60px'
            corner.style.border = '2px solid #D4AF37'
            corner.style.transform = 'rotate(45deg)'

            switch (position) {
                case 'tl':
                    corner.style.top = '30px'
                    corner.style.left = '30px'
                    break
                case 'tr':
                    corner.style.top = '30px'
                    corner.style.right = '30px'
                    break
                case 'bl':
                    corner.style.bottom = '30px'
                    corner.style.left = '30px'
                    break
                case 'br':
                    corner.style.bottom = '30px'
                    corner.style.right = '30px'
                    break
            }
            container.appendChild(corner)
        }

        // Create certificate content using YOUR component's exact design
        const certificateHTML = renderToStaticMarkup(
            <ZStateCertificate
                dealType={property.propertyStatus}
                property={property}
                formData={formData}
            />
        );

        container.innerHTML = certificateHTML

        // Add gold corners
        addCorner('tl')
        addCorner('tr')
        addCorner('bl')
        addCorner('br')

        // Add gold seal
        const goldSeal = document.createElement('div')
        goldSeal.style.position = 'absolute'
        goldSeal.style.bottom = '40px'
        goldSeal.style.right = '40px'
        goldSeal.style.width = '100px'
        goldSeal.style.height = '100px'
        goldSeal.style.background = 'radial-gradient(circle, #D4AF37 0%, #FFD700 100%)'
        goldSeal.style.borderRadius = '50%'
        goldSeal.style.display = 'flex'
        goldSeal.style.alignItems = 'center'
        goldSeal.style.justifyContent = 'center'
        goldSeal.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3)'

        goldSeal.innerHTML = `
        <div style="width: 84px; height: 84px; background: white; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Playfair Display', serif;">
            <div style="font-size: 32px; font-weight: 900; color: #D4AF37; line-height: 1;">Z</div>
            <div style="font-size: 12px; font-weight: 700; color: #000000; letter-spacing: 0.1em; margin-top: 5px;">STATE</div>
        </div>
    `

        container.appendChild(goldSeal)
        document.body.appendChild(container)

        try {
            // Generate PDF
            const canvas = await html2canvas(container, {
                scale: 2,
                backgroundColor: '#ffffff',
                width: 1056,
                height: 768,
                useCORS: true,
                logging: false
            })

            const pdf = new jsPDF('landscape', 'mm', 'a4')
            const imgWidth = 297
            const imgHeight = (canvas.height * imgWidth) / canvas.width

            pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, imgWidth, imgHeight)
            pdf.save(`ZState-Certificate-${formData.certificateId}.pdf`)

            message.success("Certificate downloaded successfully!")
        } catch (error) {
            console.error('Error generating certificate:', error)
            message.error("Failed to generate certificate. Please try again.")
        } finally {
            setIsDownloading(false)
            if (document.body.contains(container)) {
                document.body.removeChild(container)
            }
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
                                                    value={property.ownerName}
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
                                                    value={property.ownerContact}
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
                                                    value={formData.customerName}
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
                                                    value={formData.customerContact}
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
                                                    value={formData.dealAmount}
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
                                                    value={formData.dealDate}
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
                                                    value={userInfo?.name??''}
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
                                                    value={formData.agreementDuration}
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
                                                onClick={() => router.push(`/property/viewproperty/${propertyId}`)}
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








// 'use client'

// import { useSearchParams, useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import Header from "@/components/Header"
// import Button from "@/components/Button"
// import {
//     User, Phone, Mail, Calendar, DollarSign,
//     FileText, Home, MapPin, Building, Download,
//     ArrowRight, CheckCircle, Shield, Hash
// } from "lucide-react"
// import { getData } from "@/FBConfig/fbFunctions"
// import { message } from "antd"
// import html2canvas from "html2canvas"
// import jsPDF from "jspdf"

// export default function DealPage() {
//     const params = useSearchParams()
//     const router = useRouter()
//     const propertyId = params.get("id")
//     const dealType = params.get("type")

//     const [currentStep, setCurrentStep] = useState(1)
//     const [isDownloading, setIsDownloading] = useState(false)
//     const [property, setProperty] = useState<any>("")
//     const [formData, setFormData] = useState<any>({
//         customerName: "",
//         customerContact: "",
//         dealAmount: "",
//         dealDate: new Date().toISOString().split('T')[0],
//         agreementDuration: "12 months",
//         agentName: "",
//         propertyId: propertyId || "",
//         certificateId: `ZS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
//     })

//     useEffect(() => {
//         if (!propertyId) return

//         getData(`properties/${propertyId}`)
//             .then((res: any) => {
//                 console.log(res);
//                 setProperty(res)
//             })
//     }, [propertyId])

//     const handleInputChange = (field: string, value: string) => {
//         setFormData((prev: any) => ({ ...prev, [field]: value }))
//     }

//     const handleNextStep = () => {
//         if (!formData.customerName || !formData.customerContact || !formData.dealAmount) {
//             message.error("Please fill all required fields marked with *")
//             return
//         }
//         setCurrentStep(2)
//     }

//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString)
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         })
//     }

//     const formatCurrency = (amount: string) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             maximumFractionDigits: 0
//         }).format(Number(amount))
//     }

//     const generateCertificateHTML = () => {
//         return `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Great+Vibes&family=Montserrat:wght@300;400;600;700&display=swap');
                
//                 body {
//                     margin: 0;
//                     padding: 0;
//                     background: #f5f5f5;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     min-height: 100vh;
//                     font-family: 'Montserrat', sans-serif;
//                 }
                
//                 .certificate-container {
//                     width: 1056px;
//                     height: 768px;
//                     background: #ffffff;
//                     border: 12px solid #000000;
//                     position: relative;
//                     overflow: hidden;
//                     box-shadow: 0 20px 60px rgba(0,0,0,0.3);
//                 }
                
//                 /* Gold decorative corners */
//                 .corner {
//                     position: absolute;
//                     width: 80px;
//                     height: 80px;
//                     border: 3px solid #D4AF37;
//                     transform: rotate(45deg);
//                     border-radius: 12px;
//                 }
                
//                 .corner-tl { top: 40px; left: 40px; }
//                 .corner-tr { top: 40px; right: 40px; }
//                 .corner-bl { bottom: 40px; left: 40px; }
//                 .corner-br { bottom: 40px; right: 40px; }
                
//                 /* Gold border accents */
//                 .border-top {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     right: 0;
//                     height: 4px;
//                     background: linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37);
//                 }
                
//                 .border-bottom {
//                     position: absolute;
//                     bottom: 0;
//                     left: 0;
//                     right: 0;
//                     height: 4px;
//                     background: linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37);
//                 }
                
//                 /* Certificate content */
//                 .certificate-content {
//                     padding: 80px;
//                     height: 100%;
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: space-between;
//                 }
                
//                 .header {
//                     text-align: center;
//                     margin-bottom: 60px;
//                 }
                
//                 .header h1 {
//                     font-size: 80px;
//                     font-weight: 900;
//                     letter-spacing: 0.3em;
//                     color: #000000;
//                     margin: 0 0 20px 0;
//                     text-transform: uppercase;
//                     font-family: 'Playfair Display', serif;
//                 }
                
//                 .gold-line {
//                     height: 3px;
//                     width: 300px;
//                     background: linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37);
//                     margin: 0 auto 30px auto;
//                     border-radius: 2px;
//                 }
                
//                 .header h2 {
//                     font-size: 36px;
//                     font-weight: 700;
//                     color: #000000;
//                     letter-spacing: 0.2em;
//                     text-transform: uppercase;
//                     margin: 0;
//                 }
                
//                 /* Recipient section */
//                 .recipient-section {
//                     text-align: center;
//                     margin-bottom: 40px;
//                 }
                
//                 .presented-to {
//                     font-size: 24px;
//                     color: #666666;
//                     margin-bottom: 30px;
//                     font-style: italic;
//                 }
                
//                 .recipient-name {
//                     display: inline-block;
//                     position: relative;
//                     margin: 0 0 40px 0;
//                 }
                
//                 .name-glow {
//                     position: absolute;
//                     top: -15px;
//                     left: -15px;
//                     right: -15px;
//                     bottom: -15px;
//                     background: linear-gradient(45deg, #D4AF37, #FFD700);
//                     opacity: 0.15;
//                     border-radius: 999px;
//                     z-index: 0;
//                 }
                
//                 .recipient-name h3 {
//                     font-size: 56px;
//                     font-weight: 700;
//                     color: #000000;
//                     position: relative;
//                     z-index: 1;
//                     padding: 30px 60px;
//                     border: 4px solid #D4AF37;
//                     border-radius: 999px;
//                     background: #ffffff;
//                     font-family: 'Playfair Display', serif;
//                     margin: 0;
//                 }
                
//                 /* Details section */
//                 .details-section {
//                     text-align: center;
//                     margin-bottom: 60px;
//                 }
                
//                 .details-text {
//                     font-size: 20px;
//                     color: #333333;
//                     line-height: 1.8;
//                     max-width: 800px;
//                     margin: 0 auto;
//                 }
                
//                 .property-title {
//                     font-size: 28px;
//                     font-weight: 700;
//                     color: #000000;
//                     display: block;
//                     margin: 20px 0;
//                 }
                
//                 .amount {
//                     font-size: 32px;
//                     font-weight: 700;
//                     color: #D4AF37;
//                     display: inline-block;
//                     margin: 20px 0;
//                 }
                
//                 /* Signatures */
//                 .signatures {
//                     display: grid;
//                     grid-template-columns: repeat(3, 1fr);
//                     gap: 40px;
//                     margin-bottom: 60px;
//                 }
                
//                 .signature-item {
//                     text-align: center;
//                 }
                
//                 .signature-line {
//                     height: 2px;
//                     width: 150px;
//                     background: linear-gradient(90deg, #D4AF37, transparent);
//                     margin: 0 auto 20px auto;
//                 }
                
//                 .signature-label {
//                     font-size: 14px;
//                     color: #666666;
//                     margin-bottom: 10px;
//                     text-transform: uppercase;
//                     letter-spacing: 1px;
//                 }
                
//                 .signature-name {
//                     font-size: 20px;
//                     font-weight: 700;
//                     color: #000000;
//                 }
                
//                 /* Certificate ID */
//                 .certificate-id {
//                     text-align: center;
//                     padding-top: 40px;
//                     border-top: 1px solid #e5e7eb;
//                 }
                
//                 .id-label {
//                     font-size: 14px;
//                     color: #666666;
//                     margin-right: 10px;
//                 }
                
//                 .id-value {
//                     font-size: 18px;
//                     font-weight: 700;
//                     color: #000000;
//                     font-family: 'Courier New', monospace;
//                 }
                
//                 /* Status indicators */
//                 .status-indicators {
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     gap: 30px;
//                     margin-top: 20px;
//                 }
                
//                 .status-item {
//                     display: flex;
//                     align-items: center;
//                     gap: 8px;
//                 }
                
//                 .status-dot {
//                     width: 10px;
//                     height: 10px;
//                     border-radius: 50%;
//                 }
                
//                 .status-text {
//                     font-size: 12px;
//                     color: #666666;
//                 }
                
//                 /* Gold seal */
//                 .gold-seal {
//                     position: absolute;
//                     bottom: 40px;
//                     right: 40px;
//                     width: 100px;
//                     height: 100px;
//                     background: radial-gradient(circle, #D4AF37 0%, #FFD700 100%);
//                     border-radius: 50%;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
//                 }
                
//                 .seal-inner {
//                     width: 84px;
//                     height: 84px;
//                     background: #ffffff;
//                     border-radius: 50%;
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                     justify-content: center;
//                     font-family: 'Playfair Display', serif;
//                 }
                
//                 .seal-z {
//                     font-size: 32px;
//                     font-weight: 900;
//                     color: #D4AF37;
//                     line-height: 1;
//                 }
                
//                 .seal-text {
//                     font-size: 12px;
//                     font-weight: 700;
//                     color: #000000;
//                     letter-spacing: 0.1em;
//                     margin-top: 5px;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="certificate-container">
//                 <!-- Gold decorative corners -->
//                 <div class="corner corner-tl"></div>
//                 <div class="corner corner-tr"></div>
//                 <div class="corner corner-bl"></div>
//                 <div class="corner corner-br"></div>
                
//                 <!-- Gold border accents -->
//                 <div class="border-top"></div>
//                 <div class="border-bottom"></div>
                
//                 <div class="certificate-content">
//                     <!-- Header -->
//                     <div class="header">
//                         <h1>CERTIFICATE</h1>
//                         <div class="gold-line"></div>
//                         <h2>OF ${dealType === 'sold' ? 'PROPERTY SALE' : 'RENTAL AGREEMENT'}</h2>
//                     </div>
                    
//                     <!-- Recipient Section -->
//                     <div class="recipient-section">
//                         <div class="presented-to">This certification is presented to:</div>
//                         <div class="recipient-name">
//                             <div class="name-glow"></div>
//                             <h3>${formData.customerName}</h3>
//                         </div>
//                     </div>
                    
//                     <!-- Details Section -->
//                     <div class="details-section">
//                         <div class="details-text">
//                             For successfully completing the ${dealType === 'sold' ? 'purchase' : 'rental'} of<br>
//                             <span class="property-title">${property?.title || 'Property Title'}</span>
//                             located at ${property?.location || 'Location'}, ${property?.city || 'City'}<br>
//                             ${dealType === 'sold' ? 'Purchase Amount: ' : 'Rental Amount: '}
//                             <span class="amount">${formatCurrency(formData.dealAmount)}</span>
//                             ${dealType === 'rented' ? `for ${formData.agreementDuration}` : ''}
//                         </div>
//                     </div>
                    
//                     <!-- Signatures -->
//                     <div class="signatures">
//                         <div class="signature-item">
//                             <div class="signature-line"></div>
//                             <div class="signature-label">Property Owner</div>
//                             <div class="signature-name">${property?.ownerName || 'Owner Name'}</div>
//                         </div>
                        
//                         <div class="signature-item">
//                             <div class="signature-line"></div>
//                             <div class="signature-label">${dealType === 'sold' ? 'Buyer' : 'Tenant'}</div>
//                             <div class="signature-name">${formData.customerName}</div>
//                         </div>
                        
//                         <div class="signature-item">
//                             <div class="signature-line"></div>
//                             <div class="signature-label">ZState Agent</div>
//                             <div class="signature-name">${formData.agentName || 'Agent Name'}</div>
//                         </div>
//                     </div>
                    
//                     <!-- Certificate ID -->
//                     <div class="certificate-id">
//                         <div>
//                             <span class="id-label">Certificate ID:</span>
//                             <span class="id-value">${formData.certificateId}</span>
//                         </div>
                        
//                         <div class="status-indicators">
//                             <div class="status-item">
//                                 <div class="status-dot" style="background: #10B981;"></div>
//                                 <span class="status-text">Digitally Verified</span>
//                             </div>
//                             <div class="status-item">
//                                 <div class="status-dot" style="background: #3B82F6;"></div>
//                                 <span class="status-text">Official Document</span>
//                             </div>
//                             <div class="status-item">
//                                 <div class="status-dot" style="background: #D4AF37;"></div>
//                                 <span class="status-text">ZState Certified</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                 <!-- Gold Seal -->
//                 <div class="gold-seal">
//                     <div class="seal-inner">
//                         <div class="seal-z">Z</div>
//                         <div class="seal-text">STATE</div>
//                     </div>
//                 </div>
//             </div>
//         </body>
//         </html>
//         `
//     }

//     const handleDownloadCertificate = async () => {
//         setIsDownloading(true)

//         try {
//             // Create a temporary iframe to render the certificate
//             const iframe = document.createElement('iframe')
//             iframe.style.position = 'absolute'
//             iframe.style.width = '1056px'
//             iframe.style.height = '768px'
//             iframe.style.left = '-9999px'
//             iframe.style.top = '-9999px'
//             document.body.appendChild(iframe)

//             // Write the certificate HTML to iframe
//             const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
//             if (iframeDoc) {
//                 iframeDoc.open()
//                 iframeDoc.write(generateCertificateHTML())
//                 iframeDoc.close()

//                 // Wait for fonts and images to load
//                 await new Promise(resolve => setTimeout(resolve, 500))

//                 // Generate canvas from iframe content
//                 const canvas = await html2canvas(iframeDoc.body, {
//                     scale: 2, // Higher quality
//                     useCORS: true,
//                     logging: false,
//                     backgroundColor: '#ffffff',
//                     width: 1056,
//                     height: 768,
//                     allowTaint: true,
//                     foreignObjectRendering: true,
//                     onclone: (clonedDoc) => {
//                         // Ensure all styles are loaded
//                         const style = clonedDoc.createElement('style')
//                         style.innerHTML = `
//                             * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
//                         `
//                         clonedDoc.head.appendChild(style)
//                     }
//                 })

//                 // Create PDF
//                 const pdf = new jsPDF('landscape', 'mm', 'a4')
//                 const imgWidth = 297
//                 const imgHeight = (canvas.height * imgWidth) / canvas.width

//                 // Add image to PDF
//                 const imgData = canvas.toDataURL('image/png', 1.0)
//                 pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

//                 // Save PDF
//                 pdf.save(`ZState-Certificate-${formData.certificateId}.pdf`)

//                 message.success("Certificate downloaded successfully!")

//                 // Clean up
//                 document.body.removeChild(iframe)
//             }

//         } catch (error) {
//             console.error('Error generating certificate:', error)
//             message.error("Failed to generate certificate. Please try again.")

//             // Fallback: Create simple PDF
//             try {
//                 const pdf = new jsPDF('landscape', 'mm', 'a4')
//                 pdf.setFontSize(20)
//                 pdf.text("ZState Certificate", 105, 50, { align: 'center' })
//                 pdf.setFontSize(12)
//                 pdf.text(`Certificate ID: ${formData.certificateId}`, 105, 70, { align: 'center' })
//                 pdf.text(`Customer: ${formData.customerName}`, 105, 80, { align: 'center' })
//                 pdf.text(`Property: ${property?.title}`, 105, 90, { align: 'center' })
//                 pdf.text(`Amount: ${formatCurrency(formData.dealAmount)}`, 105, 100, { align: 'center' })
//                 pdf.save(`ZState-Certificate-${formData.certificateId}.pdf`)
//                 message.success("Certificate downloaded successfully!")
//             } catch (fallbackError) {
//                 message.error("Unable to generate certificate. Please check your data.")
//             }
//         } finally {
//             setIsDownloading(false)
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Header />

//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 {/* Header */}
//                 <div className="text-center mb-10">
//                     <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow mb-4">
//                         <Shield className="text-purple-600" size={24} />
//                         <h1 className="text-3xl font-bold text-gray-900">
//                             {dealType === 'sold' ? 'Sale Certificate' : 'Rental Agreement'}
//                         </h1>
//                     </div>
//                     <p className="text-gray-600 text-lg">
//                         Fill the details below to generate official ZState certificate
//                     </p>
//                 </div>

//                 <div className="grid lg:grid-cols-3 gap-8">
//                     {/* LEFT COLUMN: Main Content (2/3 width) */}
//                     <div className="lg:col-span-2 space-y-8">
//                         {/* Step Indicator */}
//                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center space-x-8">
//                                     <div className={`flex items-center ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
//                                         <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>
//                                             1
//                                         </div>
//                                         <span className="ml-2 font-medium">Fill Details</span>
//                                     </div>
//                                     <div className={`flex items-center ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
//                                         <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>
//                                             2
//                                         </div>
//                                         <span className="ml-2 font-medium">Download</span>
//                                     </div>
//                                 </div>
//                                 <div className="hidden lg:block">
//                                     <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
//                                         Step {currentStep} of 2
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Main Content Card */}
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                             {currentStep === 1 ? (
//                                 <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
//                                     <div className="flex items-center gap-3 mb-6">
//                                         <FileText className="text-purple-600" size={24} />
//                                         <h2 className="text-xl font-bold text-gray-900">Certificate Details</h2>
//                                     </div>

//                                     <div className="space-y-6">
//                                         {/* Property Owner Details */}
//                                         <div className="grid md:grid-cols-2 gap-6">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Owner Name *
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
//                                                     value={property?.ownerName || ''}
//                                                     onChange={(e) => handleInputChange('ownerName', e.target.value)}
//                                                     placeholder="Property Owner Name"
//                                                 />
//                                             </div>

//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Owner Contact *
//                                                 </label>
//                                                 <input
//                                                     type="tel"
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
//                                                     value={property?.ownerContact || ''}
//                                                     onChange={(e) => handleInputChange('ownerContact', e.target.value)}
//                                                     placeholder="Owner contact number"
//                                                 />
//                                             </div>
//                                         </div>

//                                         {/* Customer Details */}
//                                         <div className="grid md:grid-cols-2 gap-6">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Customer Name *
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
//                                                     value={formData.customerName}
//                                                     onChange={(e) => handleInputChange('customerName', e.target.value)}
//                                                     placeholder="Customer Name"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Customer Contact *
//                                                 </label>
//                                                 <input
//                                                     type="tel"
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
//                                                     value={formData.customerContact}
//                                                     onChange={(e) => handleInputChange('customerContact', e.target.value)}
//                                                     placeholder="03XX-XXXXXXX"
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div className="grid md:grid-cols-3 gap-6">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Deal Amount *
//                                                 </label>
//                                                 <input
//                                                     type="number"
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
//                                                     value={formData.dealAmount}
//                                                     onChange={(e) => handleInputChange('dealAmount', e.target.value)}
//                                                     placeholder="Enter deal amount"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Deal Date *
//                                                 </label>
//                                                 <input
//                                                     type="date"
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
//                                                     value={formData.dealDate}
//                                                     onChange={(e) => handleInputChange('dealDate', e.target.value)}
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Agent Name (Yours) *
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
//                                                     value={formData.agentName}
//                                                     onChange={(e) => handleInputChange('agentName', e.target.value)}
//                                                     placeholder="Your Name"
//                                                 />
//                                             </div>
//                                         </div>

//                                         {/* Agreement Duration for Rented */}
//                                         {dealType === "rented" && (
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Agreement Duration *
//                                                 </label>
//                                                 <select
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
//                                                     value={formData.agreementDuration}
//                                                     onChange={(e) => handleInputChange('agreementDuration', e.target.value)}
//                                                 >
//                                                     <option value="6 months">6 Months</option>
//                                                     <option value="12 months">12 Months</option>
//                                                     <option value="24 months">2 Years</option>
//                                                     <option value="36 months">3 Years</option>
//                                                 </select>
//                                             </div>
//                                         )}
//                                     </div>

//                                     <div className="mt-10 flex justify-end">
//                                         <Button
//                                             label="Next: Generate Certificate"
//                                             variant="theme2"
//                                             icon={<ArrowRight size={20} />}
//                                             classNameC="px-8 py-3"
//                                             onClick={handleNextStep}
//                                         />
//                                     </div>
//                                 </div>
//                             )
//                                 : (
//                                     // STEP 2: Download Only
//                                     <div className="p-8">
//                                         <div className="text-center mb-8">
//                                             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                                             <h2 className="text-2xl font-bold text-gray-900">Ready to Download!</h2>
//                                             <p className="text-gray-600 mt-2">Click below to download your professional certificate</p>

//                                             {/* Certificate Summary Preview */}
//                                             <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 max-w-3xl mx-auto border border-purple-200">
//                                                 <div className="grid grid-cols-2 gap-6 text-left">
//                                                     <div>
//                                                         <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
//                                                         <p className="font-bold text-gray-900">{formData.certificateId}</p>
//                                                     </div>
//                                                     <div>
//                                                         <p className="text-sm text-gray-500 mb-1">Issue Date</p>
//                                                         <p className="font-bold text-gray-900">{formatDate(formData.dealDate)}</p>
//                                                     </div>
//                                                     <div className="col-span-2">
//                                                         <p className="text-sm text-gray-500 mb-1">Customer Name</p>
//                                                         <p className="font-bold text-2xl text-purple-700">{formData.customerName}</p>
//                                                     </div>
//                                                     <div className="col-span-2">
//                                                         <p className="text-sm text-gray-500 mb-1">Property</p>
//                                                         <p className="font-bold text-lg text-gray-900">{property?.title}</p>
//                                                         <p className="text-gray-600">{property?.location}, {property?.city}</p>
//                                                     </div>
//                                                     <div>
//                                                         <p className="text-sm text-gray-500 mb-1">Transaction Amount</p>
//                                                         <p className="font-bold text-xl text-green-600">{formatCurrency(formData.dealAmount)}</p>
//                                                     </div>
//                                                     <div>
//                                                         <p className="text-sm text-gray-500 mb-1">Agent Name</p>
//                                                         <p className="font-bold text-gray-900">{formData.agentName}</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="flex flex-col sm:flex-row gap-4 mt-8">
//                                             <Button
//                                                 label="Edit Details"
//                                                 variant="primary"
//                                                 classNameC="flex-1 py-3"
//                                                 onClick={() => setCurrentStep(1)}
//                                             />
//                                             <Button
//                                                 label={isDownloading ? "Generating Certificate..." : "Download Certificate"}
//                                                 variant="theme2"
//                                                 icon={isDownloading ? null : <Download size={20} />}
//                                                 classNameC="flex-1 py-3"
//                                                 onClick={handleDownloadCertificate}
//                                                 disabled={isDownloading}
//                                             />
//                                         </div>

//                                         <div className="mt-8 text-center">
//                                             <button
//                                                 onClick={() => router.push(`/property/viewproperty/${propertyId}`)}
//                                                 className="text-purple-600 hover:text-purple-800 font-medium flex items-center justify-center gap-2 mx-auto"
//                                             >
//                                                 <ArrowRight className="rotate-180" size={16} />
//                                                 Back to Property
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                         </div>
//                     </div>

//                     {/* RIGHT COLUMN: Property Info (1/3 width) */}
//                     <div className="space-y-6">
//                         {/* Property Card */}
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <Home className="text-purple-600" size={20} />
//                                 <h3 className="font-bold text-gray-900">Property Information</h3>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <h4 className="text-lg font-semibold text-gray-900">{property?.title}</h4>
//                                     <div className="flex items-center gap-2 text-gray-600 mt-1">
//                                         <MapPin size={14} />
//                                         <span className="text-sm">{property?.location}, {property?.city}</span>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-3">
//                                     <div className="bg-gray-50 p-3 rounded-lg">
//                                         <div className="text-sm text-gray-500">Price</div>
//                                         <div className="font-bold text-purple-700">₹{parseInt(property?.price || 0).toLocaleString('en-IN')}</div>
//                                     </div>
//                                     <div className="bg-gray-50 p-3 rounded-lg">
//                                         <div className="text-sm text-gray-500">Area</div>
//                                         <div className="font-medium">{property?.area} {property?.areaUnit}</div>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-3">
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-gray-600">Type</span>
//                                         <span className="font-medium flex items-center gap-1">
//                                             <Building size={14} />
//                                             {property?.propertyType}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-gray-600">Bedrooms</span>
//                                         <span className="font-medium">{property?.bedrooms}</span>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-gray-600">Bathrooms</span>
//                                         <span className="font-medium">{property?.bathrooms}</span>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-gray-600">Owner</span>
//                                         <span className="font-medium">{property?.ownerName}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Info Box */}
//                         <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
//                             <div className="flex items-start gap-3">
//                                 <FileText className="text-blue-600" size={20} />
//                                 <div>
//                                     <h4 className="font-bold text-gray-900 mb-2">About ZState Certificates</h4>
//                                     <p className="text-gray-700 text-sm mb-3">
//                                         Official digital certificates for property transactions.
//                                     </p>
//                                     <ul className="text-gray-700 text-sm space-y-2">
//                                         <li className="flex items-start gap-2">
//                                             <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
//                                             <span>Legally valid proof</span>
//                                         </li>
//                                         <li className="flex items-center gap-2">
//                                             <CheckCircle size={14} className="text-green-500" />
//                                             <span>Digitally signed</span>
//                                         </li>
//                                         <li className="flex items-center gap-2">
//                                             <CheckCircle size={14} className="text-green-500" />
//                                             <span>Permanent record</span>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Current Step Info */}
//                         <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
//                             <div className="text-center">
//                                 <div className="text-2xl font-bold text-purple-700 mb-2">Step {currentStep} of 2</div>
//                                 <p className="text-gray-600 text-sm">
//                                     {currentStep === 1 ? 'Fill in all required details' : 'Download your certificate'}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }