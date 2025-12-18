// 'use client'

// import React from 'react'

// interface CertificateProps {
//     certificateId: string
//     issueDate: string
//     customerName: string
//     propertyTitle: string
//     propertyLocation: string
//     agentName: string
//     dealType: 'Sale' | 'Rental'
// }

// export default function ZStateCanvaCertificate({
//     certificateId,
//     issueDate,
//     customerName,
//     propertyTitle,
//     propertyLocation,
//     agentName,
//     dealType,
// }: CertificateProps) {
//     return (
//         <div className="max-w-6xl mx-auto bg-white p-12 rounded-2xl border border-gray-300 shadow-2xl relative">
//             {/* Gold Corners */}
//             <div className="absolute inset-0 pointer-events-none">
//                 <div className="absolute top-4 left-4 w-32 h-32 border-t-8 border-l-8 border-yellow-500" />
//                 <div className="absolute bottom-4 right-4 w-32 h-32 border-b-8 border-r-8 border-yellow-500" />
//             </div>

//             {/* Header */}
//             <div className="text-center mb-10">
//                 <h1 className="text-5xl font-extrabold tracking-widest">CERTIFICATE</h1>
//                 <p className="text-sm tracking-widest text-gray-600 mt-2">
//                     OFFICIAL PROPERTY TRANSACTION CERTIFICATE
//                 </p>
//             </div>

//             {/* Main Content */}
//             <div className="text-center space-y-6">
//                 <p className="text-gray-600">This certificate is proudly presented to</p>

//                 <h2 className="text-4xl font-[cursive] text-gray-900">
//                     {customerName}
//                 </h2>

//                 <p className="max-w-3xl mx-auto text-gray-700">
//                     For successfully completing a <strong>{dealType}</strong> transaction
//                     for the property <strong>{propertyTitle}</strong>, located at{' '}
//                     <strong>{propertyLocation}</strong>, officially managed and verified by
//                     ZState.
//                 </p>
//             </div>

//             {/* Footer Info */}
//             <div className="grid grid-cols-3 gap-6 mt-14 text-sm">
//                 <div className="text-left">
//                     <p className="font-semibold">Certificate ID</p>
//                     <p className="text-gray-600">{certificateId}</p>
//                 </div>
//                 <div className="text-center">
//                     <p className="font-semibold">Issued By</p>
//                     <p className="text-gray-600">{agentName}</p>
//                 </div>
//                 <div className="text-right">
//                     <p className="font-semibold">Issue Date</p>
//                     <p className="text-gray-600">{issueDate}</p>
//                 </div>
//             </div>

//             {/* Signatures */}
//             <div className="grid grid-cols-3 gap-8 mt-16 text-center">
//                 <div className="border-t pt-3">Owner Signature</div>
//                 <div className="border-t pt-3">Agent Signature</div>
//                 <div className="border-t pt-3 font-bold">ZSTATE</div>
//             </div>

//             {/* Footer */}
//             <p className="text-center text-xs text-gray-500 mt-10">
//                 Issued & Verified by ZState • Secure • Verified • Trusted
//             </p>
//         </div>
//     )
// }
// components/ClassicZStateCertificate.tsx
'use client'

import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Award, Building, MapPin, User, Calendar, DollarSign } from 'lucide-react'

interface ClassicZStateCertificateProps {
    dealType: 'sold' | 'rented'
    property: any
    formData: any
}

export default function ClassicZStateCertificate({ dealType, property, formData }: ClassicZStateCertificateProps) {
    const certificateRef = useRef<HTMLDivElement>(null)

    const downloadAsPDF = () => {
        if (certificateRef.current) {
            html2canvas(certificateRef.current, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png')
                const pdf = new jsPDF('landscape', 'mm', 'a4')
                const imgWidth = 297
                const imgHeight = (canvas.height * imgWidth) / canvas.width

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
                pdf.save(`ZState-Classic-Certificate-${formData.certificateId}.pdf`)
            })
        }
    }

    return (
        <>
            <div className="flex justify-center mb-6">
                <button
                    onClick={downloadAsPDF}
                    className="px-6 py-2 bg-black text-[#D4AF37] border-2 border-[#D4AF37] rounded-lg font-bold hover:bg-gray-900 transition-colors flex items-center gap-2"
                >
                    <Award size={18} />
                    Download This Design
                </button>
            </div>

            {/* Classic Certificate Design */}
            <div
                ref={certificateRef}
                className="relative w-[1056px] h-[768px] mx-auto bg-white border-8 border-black"
                style={{
                    background: 'linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%)'
                }}
            >
                {/* Certificate Content */}
                <div className="relative p-20 h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-8xl font-black tracking-widest text-black mb-4" style={{ letterSpacing: '0.3em' }}>
                            CERTIFICATE
                        </h1>
                        <div className="h-1 w-64 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto mb-6"></div>
                        <h2 className="text-3xl font-bold text-black tracking-widest">
                            OF {dealType === 'sold' ? 'PROPERTY SALE' : 'RENTAL AGREEMENT'}
                        </h2>
                    </div>

                    {/* Body */}
                    <div className="text-center">
                        <p className="text-xl text-gray-700 mb-12">
                            This certification is presented to:
                        </p>

                        <div className="relative inline-block mb-12">
                            <div className="absolute -inset-6 bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-full"></div>
                            <h3 className="relative text-5xl font-bold text-black py-6 px-16 border-4 border-[#D4AF37] bg-white">
                                {formData.customerName}
                            </h3>
                        </div>

                        <div className="max-w-3xl mx-auto text-lg text-gray-800 leading-relaxed mb-16">
                            For successfully completing the {dealType === 'sold' ? 'purchase' : 'rental'} of<br />
                            <span className="font-bold text-xl text-black">{property.title}</span><br />
                            located at {property.location}, {property.city}<br />
                            {dealType === 'sold' ? 'Total Amount: ' : 'Rental Amount: '}
                            <span className="font-bold text-[#D4AF37] text-xl">
                                {new Intl.NumberFormat('en-IN', {
                                    style: 'currency',
                                    currency: 'INR',
                                    maximumFractionDigits: 0
                                }).format(Number(formData.dealAmount))}
                            </span>
                            {dealType === 'rented' && ` for ${formData.agreementDuration}`}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto">
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="text-center">
                                <div className="h-px w-48 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto mb-4"></div>
                                <p className="text-sm text-gray-600">Property Owner</p>
                                <p className="font-bold text-lg text-black">{property.ownerName}</p>
                            </div>

                            <div className="text-center">
                                <div className="h-px w-48 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto mb-4"></div>
                                <p className="text-sm text-gray-600">ZState Agent</p>
                                <p className="font-bold text-lg text-black">{formData.agentName}</p>
                            </div>
                        </div>

                        <div className="text-center border-t border-gray-300 pt-6">
                            <div className="flex items-center justify-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Building size={16} className="text-[#D4AF37]" />
                                    <span className="text-sm text-gray-700">{property.propertyType}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-[#D4AF37]" />
                                    <span className="text-sm text-gray-700">
                                        {new Date(formData.dealDate).toLocaleDateString('en-IN')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign size={16} className="text-[#D4AF37]" />
                                    <span className="text-sm text-gray-700">
                                        {formData.certificateId}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gold Corner Designs */}
                <div className="absolute top-12 left-12 w-8 h-8 border-2 border-[#D4AF37] transform rotate-45"></div>
                <div className="absolute top-12 right-12 w-8 h-8 border-2 border-[#D4AF37] transform rotate-45"></div>
                <div className="absolute bottom-12 left-12 w-8 h-8 border-2 border-[#D4AF37] transform rotate-45"></div>
                <div className="absolute bottom-12 right-12 w-8 h-8 border-2 border-[#D4AF37] transform rotate-45"></div>
            </div>
        </>
    )
}