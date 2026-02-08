"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Header from "@/components/Header";
import AddPropertyPart1 from "@/components/AddPropertyPart1";
import AddPropertyPart2 from "@/components/AddPropertyPart2";
import { checkUserSession, getData, saveData, updateData, uploadImage, uploadImagesToCloudinary } from "@/FBConfig/fbFunctions";
import { message } from 'antd';
import AddPropertyPart3 from '@/components/AddPropertyPart3';

interface UserInfo {
    uid: string;
    email: string;
    name: string;
}

export default function AddPropertyPage() {

    interface PropertyFormData {
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
        ownerId?: string,
        features: string[];
        amenities: string[];
        facingDirection?: string;
        propertyCondition: string;
        isFurnished: boolean;
        hasParking: boolean;
        hasGarden: boolean;
        hasSecurity: boolean;
        propertyStatus: 'available' | 'rented' | 'sold' | 'under-Negotiation'

    }

    const router = useRouter();

    // State for userInfo from localStorage
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const [activeSection, setActiveSection] = useState('basic');
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);

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
        features: [] as string[],
        amenities: [] as string[],
        facingDirection: '',
        propertyCondition: '',
        isFurnished: false,
        hasParking: false,
        hasGarden: false,
        hasSecurity: false,
        propertyStatus: 'available'
    });

    const sections = ['basic', 'details', 'images'];

    // Check authentication and load data
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user: any = await checkUserSession();
                if (!user) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                const storedUser: any = localStorage.getItem('userInfo')
                const userData = JSON.parse(storedUser);
                setUserInfo(userData);

            } catch (err) {
                message.error('Error occurred during authentication');
                router.replace('/login');
            }
        };

        checkAuth();
    }, [router]);

    // Load userInfo from localStorage once
    useEffect(() => {
        const data = localStorage.getItem("userInfo");
        if (data) {
            try {
                let parsed = JSON.parse(data)
                getData(`users/${parsed.uid}`)
                    .then((res: any) => {
                        setUserInfo(res)
                    })
                    .catch((err: any) => {
                        console.error(err.message);
                    })
            } catch (err) {
                console.error("Failed to parse userInfo from localStorage:", err);
            }
        }
    }, []);

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
        const newImages = images.filter((img, i) => i !== index);
        const newPreviews = imagePreviews.filter((img, i) => i !== index);
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
        if (!userInfo) {
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
        try {
            uploadedUrls = await uploadImagesToCloudinary(images);
            if (uploadedUrls.length === 0) throw new Error("No images uploaded");
        } catch (err) {
            message.error("Failed to upload images");
            setIsLoading(false);
            return;
        }

        const propertyData = sanitize({
            ...formData,
            agentUid: userInfo.uid,
            agentName: userInfo.name,
            propertyStatus: "available",
            images: uploadedUrls,
            createdAt: new Date().toISOString(),
            id: crypto.randomUUID()
        });

        saveData(`properties/${propertyData.id}`, propertyData)
            .then(() => {
                message.success('Property saved successfully!');
                router.replace(`/realstate/${userInfo?.uid}/properties`)
            })
            .catch(err => {
                console.error(err);
                message.error('Error saving property. Please try again.');
            })
            .finally(() => setIsLoading(false));
    };



    if (!userInfo) {
        return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
            <Header userData={userInfo} />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add Property</h1>
                    <p className="text-gray-600 mt-2">List your property in simple steps</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                    {sections.map((section, index) => (
                        <div key={section} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === section ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                {index + 1}
                            </div>
                            <span className="text-sm mt-2 capitalize">{section}</span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
                    {activeSection === 'basic' && <AddPropertyPart1 formData={formData} handleChange={handleChange} />}
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
                        />
                    )}


                    <div className="flex justify-between mt-8 pt-6 border-t">
                        <Button
                            type="button"
                            label="Back"
                            variant="secondary"
                            onClick={() => {
                                const idx = sections.indexOf(activeSection);
                                if (idx > 0) setActiveSection(sections[idx - 1]);
                            }}
                            disabled={activeSection === 'basic'}
                        />

                        {activeSection !== sections[sections.length - 1] ? (
                            <Button
                                type="button"
                                label="Next"
                                variant="theme"
                                onClick={(e: any) => {
                                    e.preventDefault()
                                    const idx = sections.indexOf(activeSection);
                                    if (idx < sections.length - 1) setActiveSection(sections[idx + 1]);
                                }}
                            />
                        ) : (
                            <Button
                                type="submit"
                                label={isLoading ? "Saving..." : "Save Property"}
                                variant="theme2"
                                disabled={isLoading}
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
