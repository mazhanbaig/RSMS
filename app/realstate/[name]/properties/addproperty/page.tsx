"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Header from "@/components/Header";
import AddPropertyPart1 from "@/components/AddPropertyPart1";
import AddPropertyPart2 from "@/components/AddPropertyPart2";
import { getData, saveData, updateData, uploadImages } from "@/FBConfig/fbFunctions";
import { useAuth } from "@/hooks/useAuth";
import { message } from 'antd';
import AddPropertyPart3 from '@/components/AddPropertyPart3';
import { Home, Building, Image, CheckCircle, ArrowLeft, ArrowRight, Save, MapPin, DollarSign, PenTool } from "lucide-react";
import Loader from "@/components/Loader";

interface UserInfo {
    uid: string;
    email: string;
    name: string;
}

export default function AddPropertyPage() {

    interface PropertyFormData {
        id?: string;
        title: string;
        description: string;
        propertyType: string;
        price: string;
        priceUnit: string;
        location: string;
        city: string;
        area: string;
        areaUnit: string;
        bedrooms: string;
        bathrooms: string;
        yearBuilt?: string;
        ownerName: string;
        ownerContact?: string;
        ownerId?: string;
        features: string[];
        amenities: string[];
        facingDirection?: string;
        propertyCondition: string;
        isFurnished: boolean;
        hasParking: boolean;
        hasGarden: boolean;
        hasSecurity: boolean;
        propertyStatus: 'available' | 'rented' | 'sold' | 'under-Negotiation';
        images?: string[];
    }

    const router = useRouter();
    const searchParams = useSearchParams();

    const { user, loading: authLoading } = useAuth();
    const [activeSection, setActiveSection] = useState('basic');
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [propertyId, setPropertyId] = useState<string | null>(null);

    const sections = [
        { id: "basic", label: "Basic Info", icon: Home },
        { id: "details", label: "Property Details", icon: Building },
        { id: "images", label: "Photos", icon: Image }
    ];

    const [formData, setFormData] = useState<PropertyFormData>({
        title: '',
        description: '',
        propertyType: '',
        price: '',
        priceUnit: 'Lakh',
        location: '',
        city: '',
        area: '',
        areaUnit: 'Square Feet',
        bedrooms: '',
        bathrooms: '',
        yearBuilt: new Date().getFullYear().toString(),
        ownerName: '',
        ownerContact: '',
        ownerId: '',
        features: [],
        amenities: [],
        facingDirection: '',
        propertyCondition: '',
        isFurnished: false,
        hasParking: false,
        hasGarden: false,
        hasSecurity: false,
        propertyStatus: 'available'
    });

    // Authentication and data loading
    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            message.error('Please Login First');
            router.replace('/login');
            return;
        }

        const propertyData = searchParams.get('propertyData');
        if (propertyData) {
            try {
                const parsedData = JSON.parse(propertyData);
                setFormData(prev => ({ ...prev, ...parsedData }));
                setIsEditing(true);
                setPropertyId(parsedData.id);

                if (parsedData.images && parsedData.images.length > 0) {
                    setImagePreviews(parsedData.images);
                }
            } catch (err) {
                console.error("Failed to parse property data:", err);
            }
        }
    }, [user, authLoading, router, searchParams]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value ?? ''
        }));
    };

    const handleFeatureToggle = (feature: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const handleAmenityToggle = (amenity: string) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages = [...images, ...files].slice(0, 10);
        setImages(newImages);
        const previews = newImages.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    const sanitize = (obj: any) =>
        Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [
                k,
                v === undefined ? null : v
            ])
        );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            message.error("User not detected!");
            return;
        }

        setIsLoading(true);

        const required = ['title', 'propertyType', 'price', 'area', 'city', 'location', 'description'];
        const missing = required.filter(field => !formData[field as keyof typeof formData]);

        if (missing.length > 0) {
            message.error(`Please fill: ${missing.join(", ")}`);
            setIsLoading(false);
            return;
        }

        let uploadedUrls: string[] = [];

        if (images.length > 0) {
            try {
                const response = await uploadImages(images);
                uploadedUrls = response?.data || [];
                if (uploadedUrls.length === 0) {
                    throw new Error("No images uploaded");
                }
            } catch (err) {
                message.error("Failed to upload images");
                setIsLoading(false);
                return;
            }
        } else if (imagePreviews.length > 0) {
            uploadedUrls = imagePreviews;
        }

        const propertyData = sanitize({
            ...formData,
            agentUid: user.uid,
            agentName: user.name,
            propertyStatus: formData.propertyStatus || "available",
            images: uploadedUrls,
            updatedAt: new Date().toISOString(),
            ...(isEditing ? {} : { createdAt: new Date().toISOString() }),
            id: isEditing ? propertyId : crypto.randomUUID()
        });

        try {
            if (isEditing && propertyId) {
                await updateData(`properties/${user.uid}/${propertyId}`, propertyData);
                await updateData(`public_properties/${propertyId}`, {
                    ...propertyData,
                    publicViewable: true,
                    updatedAt: new Date().toISOString()
                });
                message.success('Property updated successfully!');
                
                router.push(`/realstate/${user.uid}/properties`);
            } else {
                await saveData(`properties/${user.uid}/${propertyData.id}`, propertyData);
                await saveData(`public_properties/${propertyData.id}`, {
                    ...propertyData,
                    publicViewable: true,
                    publishedAt: new Date().toISOString()
                });
                router.push(`/realstate/${user.uid}/properties`);
            }
        } catch (err) {
            console.error(err);
            message.error('Error saving property. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
    const isFirstSection = currentSectionIndex === 0;
    const isLastSection = currentSectionIndex === sections.length - 1;

    if (authLoading || !user) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
            <Header userData={user} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                                {isEditing ? 'Edit Property' : 'New Property'}
                            </span>
                            <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100">
                                {isEditing ? <PenTool className="h-6 w-6 text-purple-600" /> : <Home className="h-6 w-6 text-purple-600" />}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                                    {isEditing ? 'Edit Property' : 'Add New Property'}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {isEditing ? 'Update your property details' : 'List your property in simple steps'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {sections.map((section, idx) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                const isCompleted = sections.findIndex(s => s.id === activeSection) > idx;

                                return (
                                    <div key={section.id} className="flex-1 relative">
                                        <div className="flex flex-col items-center">
                                            <button
                                                onClick={() => setActiveSection(section.id)}
                                                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 text-white scale-110'
                                                        : isCompleted
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircle className="h-5 w-5" />
                                                ) : (
                                                    <Icon className="h-5 w-5" />
                                                )}
                                            </button>
                                            <span className={`mt-2 text-xs font-medium ${isActive ? 'text-purple-600' : 'text-gray-500'
                                                }`}>
                                                {section.label}
                                            </span>
                                        </div>
                                        {idx < sections.length - 1 && (
                                            <div className={`absolute top-6 left-1/2 w-full h-0.5 ${sections.findIndex(s => s.id === activeSection) > idx
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-200'
                                                }`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl shadow-purple-900/5 overflow-hidden">
                        <div className="relative px-6 pt-5 pb-3 border-b border-gray-100/80">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                                    {activeSection === "basic" && <Home className="h-3.5 w-3.5 text-purple-500" />}
                                    {activeSection === "details" && <Building className="h-3.5 w-3.5 text-blue-500" />}
                                    {activeSection === "images" && <Image className="h-3.5 w-3.5 text-cyan-500" />}
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {activeSection === "basic" && "Basic Information"}
                                    {activeSection === "details" && "Property Details"}
                                    {activeSection === "images" && "Property Photos"}
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {activeSection === 'basic' && (
                                <AddPropertyPart1 formData={formData} handleChange={handleChange} />
                            )}
                            {activeSection === 'details' && (
                                <AddPropertyPart2
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleFeatureToggle={handleFeatureToggle}
                                    handleAmenityToggle={handleAmenityToggle}
                                />
                            )}
                            {activeSection === 'images' && (
                                <AddPropertyPart3
                                    formData={formData}
                                    handleChange={handleChange}
                                    imagePreviews={imagePreviews}
                                    handleImageUpload={handleImageUpload}
                                    removeImage={removeImage}
                                    uid={user.uid}
                                />
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between gap-4 mt-8 pt-4 border-t border-gray-100">
                                <Button
                                    label="Previous"
                                    onClick={() => {
                                        if (!isFirstSection) {
                                            setActiveSection(sections[currentSectionIndex - 1].id);
                                        }
                                    }}
                                    variant="secondary"
                                    classNameC={`rounded-xl ${isFirstSection ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    size="md"
                                    icon={<ArrowLeft />}
                                    disabled={isFirstSection}
                                />

                                {!isLastSection ? (
                                    <Button
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                            setActiveSection(sections[currentSectionIndex + 1].id);
                                        }}
                                        label="Next Step"
                                        size="md"
                                        variant="theme"
                                        icon={<ArrowRight />}
                                    />
                                ) : (
                                    <Button
                                        label={isLoading ? "Saving..." : (isEditing ? "Update Property" : "Save Property")}
                                        type="submit"
                                        size="md"
                                        variant="theme2"
                                        icon={<Save />}
                                        disabled={isLoading}
                                    />
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Helpful Tips Card */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <DollarSign className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">Property Listing Tips</h3>
                                <p className="text-xs text-gray-600 mt-1">
                                    • Add high-quality photos to attract more buyers<br />
                                    • Be accurate with property details and pricing<br />
                                    • Highlight unique features and amenities<br />
                                    • Keep contact information up to date
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
