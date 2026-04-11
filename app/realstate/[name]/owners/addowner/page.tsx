// 'use client'

// import { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import Button from "@/components/Button";
// import { auth, checkUserSession, getData, saveData, updateData } from "@/FBConfig/fbFunctions";
// import { useRouter, useSearchParams } from "next/navigation";
// import AddClientPart1 from "@/components/AddClientPart1";
// import { message } from 'antd'
// import { onAuthStateChanged } from "firebase/auth";

// export default function AddOwnerPage() {
//     interface UserInfo {
//         uid: string;
//         email?: string;
//         name?: string;
//         [key: string]: any;
//     }

//     const [formData, setFormData] = useState({
//         id: "",
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         status: "active",
//         notes: "",
//     });

//     const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
//     const searchParams = useSearchParams();
//     const router = useRouter();

//     // Check authentication and load data
//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const user: any = await checkUserSession();
//                 if (!user) {
//                     message.error('Please Login First');
//                     router.replace('/login');
//                     return;
//                 }

//                 const storedUser: any = localStorage.getItem('userInfo')
//                 const userData = JSON.parse(storedUser);
//                 setUserInfo(userData);

//             } catch (err) {
//                 message.error('Error occurred during authentication');
//                 router.replace('/login');
//             } finally {
//             }
//         };

//         checkAuth();
//     }, [router]);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//             if (!user) {
//                 router.replace(`/login`)
//             }
//         })

//         const storedUser = localStorage.getItem("userInfo");
//         if (!storedUser) return;

//         const { uid } = JSON.parse(storedUser);

//         getData(`users/${uid}`)
//             .then((res: any) => {
//                 setUserInfo(res);
//             })

//         return () => unsubscribe();
//     }, [router])

//     // Prefill form if editing
//     useEffect(() => {
//         const ownerData = searchParams.get("ownerData");
//         if (ownerData) setFormData(prev => ({ ...prev, ...JSON.parse(ownerData) }));
//     }, [searchParams]);

//     const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!userInfo) return message.error("User not detected!");

//         const requiredFields: (keyof typeof formData)[] = ["firstName", "phone", "status"];
//         const emptyFields = requiredFields.filter(f => !formData[f]?.trim());
//         if (emptyFields.length > 0) return alert(`Please fill in: ${emptyFields.join(", ")}`);

//         const ownerFullData = {
//             ...formData,
//             createdAt: new Date().toISOString(),
//             agentUid: userInfo.uid,
//             agentName: userInfo.name
//         };

//         if (formData.id) {
//             updateData(`owners/${userInfo.uid}/${formData.id}`, ownerFullData)
//                 .then(() => { message.success("Edited Successfully"); router.push(`/realstate/${userInfo?.uid}/owners`); })
//                 .catch(console.log);
//         } else {
//             const newId = crypto.randomUUID();
//             saveData(`owners/${userInfo.uid}/${newId}`, { ...ownerFullData, id: newId })
//                 .then(() => { message.success("Saved Successfully"); router.push(`/realstate/${userInfo?.uid}/owners`); })
//                 .catch(console.log);
//         }
//     };

//     if (!userInfo) {
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//         </div>
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Header userData={userInfo} />
//             <div className="max-w-3xl mx-auto p-6">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
//                     {formData.id ? "Edit Owner" : "Add Owner"}
//                 </h1>
//                 <p className="text-center text-gray-600 mb-6">Fill in the owner details below</p>

//                 <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <AddClientPart1 formData={formData} handleChange={handleChange} />
//                         <div className="flex justify-end">
//                             <Button label="Save Owner" type="submit" size="md" variant="theme2" disabled={!userInfo} />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }



'use client'

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { auth, checkUserSession, getData, saveData, updateData } from "@/FBConfig/fbFunctions";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from 'antd'
import { onAuthStateChanged } from "firebase/auth";
import { Building, UserPlus, Save, ArrowLeft, Briefcase, Phone, Mail, User, AlertCircle } from "lucide-react";

export default function AddOwnerPage() {
    interface UserInfo {
        uid: string;
        email?: string;
        name?: string;
        [key: string]: any;
    }

    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "active",
        notes: "",
    });

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace(`/login`)
            }
        })

        const storedUser = localStorage.getItem("userInfo");
        if (!storedUser) return;

        const { uid } = JSON.parse(storedUser);

        getData(`users/${uid}`)
            .then((res: any) => {
                setUserInfo(res);
            })

        return () => unsubscribe();
    }, [router])

    // Prefill form if editing
    useEffect(() => {
        const ownerData = searchParams.get("ownerData");
        if (ownerData) setFormData(prev => ({ ...prev, ...JSON.parse(ownerData) }));
    }, [searchParams]);

    const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!userInfo) {
            message.error("User not detected!");
            return;
        }

        const requiredFields: (keyof typeof formData)[] = ["firstName", "phone", "status"];
        const emptyFields = requiredFields.filter(f => !formData[f]?.trim());
        
        if (emptyFields.length > 0) {
            message.error(`Please fill in: ${emptyFields.join(", ")}`);
            return;
        }

        setIsSubmitting(true);

        const ownerFullData = {
            ...formData,
            updatedAt: new Date().toISOString(),
            agentUid: userInfo.uid,
            agentName: userInfo.name
        };

        try {
            if (formData.id) {
                await updateData(`owners/${userInfo.uid}/${formData.id}`, ownerFullData);
                message.success("Owner Updated Successfully");
                router.push(`/realstate/${userInfo?.uid}/owners`);
            } else {
                const newId = crypto.randomUUID();
                await saveData(`owners/${userInfo.uid}/${newId}`, { 
                    ...ownerFullData, 
                    id: newId,
                    createdAt: new Date().toISOString() 
                });
                message.success("Owner Added Successfully");
                router.push(`/realstate/${userInfo?.uid}/owners`);
            }
        } catch (error) {
            message.error("Something went wrong!");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!userInfo) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
            <Header userData={userInfo} />
            
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                                {formData.id ? 'Edit Owner' : 'New Owner'}
                            </span>
                            <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100">
                                <Building className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    {formData.id ? 'Edit Owner' : 'Add New Owner'}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {formData.id ? 'Update owner information' : 'Register a new property owner in the system'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/80  rounded-2xl border border-white/50 shadow-xl shadow-purple-900/5 overflow-hidden">
                        <div className="relative px-6 pt-5 pb-3 border-b border-gray-100/80">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                                    <Briefcase className="h-3.5 w-3.5 text-purple-500" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Owner Information
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-5">
                                {/* Two Column Grid for basic info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* First Name */}
                                    <div className="group">
                                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="Enter first name"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="group">
                                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="owner@example.com"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="group">
                                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+1 234 567 8900"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                                            Owner Status <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white appearance-none cursor-pointer"
                                            >
                                                <option value="active"> Active</option>
                                                <option value="inactive"> Inactive</option>
                                                <option value="blacklisted"> Deal done</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes Section - Full Width */}
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                                        Additional Notes
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Any additional information about this owner (properties owned, preferences, etc.)..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white resize-none"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-400">
                                        Include property details, special requirements, or any important notes
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                                <Button
                                    label="Cancel"
                                    onClick={() => router.back()}
                                    variant="secondary"
                                    classNameC="rounded-xl"
                                    size="md"
                                />
                                <Button
                                    label={isSubmitting ? "Saving..." : (formData.id ? "Update Owner" : "Save Owner")}
                                    type="submit"
                                    size="md"
                                    variant="theme2"
                                    icon={<Save/>}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </form>
                    </div>

                    {/* Helpful Tips Card */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <Building className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">Owner Management Tips</h3>
                                <p className="text-xs text-gray-600 mt-1">
                                    • Keep owner contact information up to date for property communications<br/>
                                    • Track property ownership history for each owner<br/>
                                    • Maintain notes about owner preferences for better service
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}