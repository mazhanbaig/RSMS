// 'use client'

import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Download, FileText, CheckCircle, User, Calendar, Home, MapPin, DollarSign, Signature } from 'lucide-react'

interface PropertyData {
    title: string;
    propertyType: string;
    location: string;
    city: string;
    area: string;
    areaUnit: string;
    bedrooms: string;
    bathrooms: string;
    price: string;
    priceUnit: string;
    ownerName: string;
    ownerContact?: string;
    description?: string;
}

interface CertificateGeneratorProps {
    property: PropertyData;
    transactionType: 'sale' | 'rental';
    buyerRenterName: string;
    buyerRenterContact: string;
    transactionDate: string;
    transactionAmount: string;
    transactionId?: string;
    terms?: string[];
}

export default function CertificateGenerator({
    property,
    transactionType,
    buyerRenterName,
    buyerRenterContact,
    transactionDate,
    transactionAmount,
    transactionId,
    terms = [
        "This document serves as official proof of property transaction",
        "All parties have agreed to the terms and conditions",
        "Property condition has been verified and accepted",
        "Payment has been successfully transferred",
        "This certificate is legally binding"
    ]
}: CertificateGeneratorProps) {
    const certificateRef = useRef<HTMLDivElement>(null)

    const downloadPDF = async () => {
        if (!certificateRef.current) return

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 3,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            })

            const imgData = canvas.toDataURL('image/png', 1.0)
            const pdf = new jsPDF('p', 'mm', 'a4')
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height

            // Calculate ratio to fit the page
            const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 20) / imgHeight)
            const imgX = (pdfWidth - imgWidth * ratio) / 2
            const imgY = 10

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
            pdf.save(`property-${transactionType}-certificate-${Date.now()}.pdf`)
        } catch (error) {
            console.error('Error generating PDF:', error)
        }
    }

    return (
        <div className="space-y-6">
            {/* Certificate Preview */}
            <div
                ref={certificateRef}
                className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm max-w-4xl mx-auto"
                style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                    fontFamily: "'Georgia', 'Times New Roman', serif"
                }}
            >
                {/* Watermark Background */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="flex items-center justify-center h-full">
                        <FileText size={300} />
                    </div>
                </div>

                {/* Certificate Header */}
                <div className="text-center mb-10 relative">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="text-white" size={28} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {transactionType === 'sale' ? 'PROPERTY SALE CERTIFICATE' : 'PROPERTY RENTAL AGREEMENT'}
                        </h1>
                    </div>
                    <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-3"></div>
                    <p className="text-gray-600 text-lg">Certificate of Successful Transaction</p>
                    {transactionId && (
                        <div className="mt-4 inline-block px-4 py-1 bg-gray-100 rounded-full text-sm">
                            ID: {transactionId}
                        </div>
                    )}
                </div>

                {/* Certificate Body */}
                <div className="space-y-8 relative">
                    {/* Property Details Section */}
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Home className="text-emerald-600" />
                            Property Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Property Title</div>
                                    <div className="font-semibold text-gray-900">{property.title}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Property Type</div>
                                    <div className="font-semibold text-gray-900">{property.propertyType}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Location</div>
                                    <div className="font-semibold text-gray-900 flex items-center gap-1">
                                        <MapPin size={14} />
                                        {property.location}, {property.city}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Area</div>
                                    <div className="font-semibold text-gray-900">{property.area} {property.areaUnit}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Bedrooms</div>
                                        <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Bathrooms</div>
                                        <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Details Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <DollarSign className="text-blue-600" />
                            Transaction Details
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">
                                        {transactionType === 'sale' ? 'Seller' : 'Landlord'}
                                    </div>
                                    <div className="font-semibold text-gray-900">{property.ownerName}</div>
                                    {property.ownerContact && (
                                        <div className="text-sm text-gray-600 mt-1">{property.ownerContact}</div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">
                                        {transactionType === 'sale' ? 'Buyer' : 'Tenant'}
                                    </div>
                                    <div className="font-semibold text-gray-900">{buyerRenterName}</div>
                                    <div className="text-sm text-gray-600 mt-1">{buyerRenterContact}</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Transaction Date
                                    </div>
                                    <div className="font-semibold text-gray-900">{transactionDate}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">
                                        {transactionType === 'sale' ? 'Sale Price' : 'Monthly Rent'}
                                    </div>
                                    <div className="font-semibold text-lg text-emerald-700">
                                        ₹{Number(transactionAmount).toLocaleString('en-IN')}
                                        {transactionType === 'rental' && ' / month'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-xl border border-amber-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Terms & Conditions</h2>
                        <div className="space-y-3">
                            {terms.map((term, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700">{term}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Signatures Section */}
                    <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Signature className="text-purple-600" />
                            Signatures
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="h-px bg-gray-300 mb-2"></div>
                                    <div className="text-sm text-gray-500 mb-1">Signature of</div>
                                    <div className="font-semibold text-gray-900">{property.ownerName}</div>
                                    <div className="text-sm text-gray-600">
                                        {transactionType === 'sale' ? 'Seller / Property Owner' : 'Landlord'}
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500 text-center">
                                    Date: {transactionDate}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="h-px bg-gray-300 mb-2"></div>
                                    <div className="text-sm text-gray-500 mb-1">Signature of</div>
                                    <div className="font-semibold text-gray-900">{buyerRenterName}</div>
                                    <div className="text-sm text-gray-600">
                                        {transactionType === 'sale' ? 'Buyer' : 'Tenant'}
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500 text-center">
                                    Date: {transactionDate}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 pt-6 mt-8">
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <FileText size={16} />
                                <span>This certificate is digitally generated by</span>
                            </div>
                            <div className="font-bold text-gray-900 text-lg">ZState Property Management System</div>
                            <div className="text-gray-500 text-sm">
                                Generated on {new Date().toLocaleDateString('en-IN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div className="text-gray-400 text-xs mt-4">
                                Certificate ID: ZSTATE-{Date.now().toString().slice(-8).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <div className="text-center">
                <button
                    onClick={downloadPDF}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                >
                    <Download size={20} />
                    Download Certificate as PDF
                </button>
                <p className="text-gray-500 text-sm mt-3">
                    Download this certificate as a PDF document for official records
                </p>
            </div>
        </div>
    )
}