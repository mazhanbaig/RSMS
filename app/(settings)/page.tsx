// 'use client';

// import Header from "@/components/Header";
// import Button from "@/components/Button";
// import { useState, useContext, useEffect } from "react";
// import { UserContext } from "@/app/context/UserContext";
// import { getData, saveData, updateData } from "@/FBConfig/fbFunctions";

// export default function SettingsPage() {
//     const userInfo = useContext(UserContext);
//     const [activeTab, setActiveTab] = useState('profile');
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [userData, setUserData] = useState<any>(null);
//     const [formData, setFormData] = useState<any>({});

//     const cardStyle = isDarkMode
//         ? 'bg-gray-800 border-gray-700 text-gray-100'
//         : 'bg-white border-gray-200 text-gray-900';

//     useEffect(() => {
//         if (!userInfo) return;
//         getData(`users/${userInfo.uid}`)
//             .then(res => {
//                 setUserData(res);
//                 setFormData(res); // initialize form with fetched data
//             })
//             .catch(err => console.log(err));
//     }, [userInfo]);

//     const handleChange = (field: string, value: string) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//     }

//     const handleSave = () => {
//         updateData(`users/${userInfo.uid}`, formData)
//             .then(() => setUserData(prev => ({ ...prev, ...formData })))
//             .catch(err => console.log(err));
//     }

//     if (!userData) {
//         return (
//             <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen flex items-center justify-center`}>
//                 <p className="text-gray-500">Loading user data...</p>
//             </div>
//         );
//     }

//     return (
//         <div className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-300`}>
//             <Header />

//             <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
//                 <div>
//                     <h1 className="text-4xl font-bold">Settings</h1>
//                     <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                         Manage your account, security, and preferences
//                     </p>
//                 </div>

//                 <div className="flex flex-col lg:flex-row gap-6 items-start">
//                     <div className={`lg:w-72 p-6 rounded-xl border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
//                         <div className="flex items-center gap-4 mb-6">
//                             <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xl">
//                                 {userData?.name?.slice(0, 1).toUpperCase() || 'U'}
//                             </div>
//                             <div>
//                                 <h2 className="font-semibold">{userData?.name || 'User'}</h2>
//                                 <p className="text-sm text-gray-400">{userData?.email || 'email@example.com'}</p>
//                             </div>
//                         </div>

//                         <nav className="space-y-2">
//                             {['profile', 'security', 'preferences', 'notifications'].map(tab => (
//                                 <button
//                                     key={tab}
//                                     onClick={() => setActiveTab(tab)}
//                                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-200
//                                         ${activeTab === tab ? 'bg-black text-white' : isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
//                                 >
//                                     <span className="capitalize font-medium">{tab}</span>
//                                 </button>
//                             ))}
//                         </nav>

//                         <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                             <div className="flex justify-between items-center">
//                                 <span>Dark Mode</span>
//                                 <button
//                                     onClick={() => setIsDarkMode(!isDarkMode)}
//                                     className={`w-12 h-6 rounded-full transition-all ${isDarkMode ? 'bg-black' : 'bg-gray-300'}`}
//                                 >
//                                     <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex-1 space-y-6">
//                         {activeTab === 'profile' && (
//                             <div className={`p-6 rounded-xl border shadow-sm ${cardStyle}`}>
//                                 <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <input type="text" placeholder="First Name" value={formData?.firstName || ''} className="input-style" onChange={e => handleChange('firstName', e.target.value)} />
//                                     <input type="text" placeholder="Last Name" value={formData?.lastName || ''} className="input-style" onChange={e => handleChange('lastName', e.target.value)} />
//                                 </div>
//                                 <input type="email" placeholder="Email" value={formData?.email || ''} className="input-style mt-4" onChange={e => handleChange('email', e.target.value)} />
//                                 <input type="tel" placeholder="Phone" value={formData?.phone || ''} className="input-style mt-4" onChange={e => handleChange('phone', e.target.value)} />
//                                 <div className="flex justify-end gap-3 mt-6">
//                                     <Button label="Cancel" variant="theme2" />
//                                     <Button onClick={handleSave} label="Save Changes" variant="theme" />
//                                 </div>
//                             </div>
//                         )}

//                         {activeTab === 'security' && (
//                             <div className={`p-6 rounded-xl border shadow-sm ${cardStyle}`}>
//                                 <h2 className="text-2xl font-bold mb-4">Account Security</h2>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <input type="password" placeholder="New Password" className="input-style" />
//                                     <input type="password" placeholder="Confirm Password" className="input-style" />
//                                 </div>
//                                 <Button label="Update Password" variant="theme" className="mt-4 w-full" />
//                             </div>
//                         )}

//                         <div className={`p-6 rounded-xl border shadow-sm ${isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
//                             <h2 className="text-xl font-bold mb-2 text-red-600">Danger Zone</h2>
//                             <p className={`${isDarkMode ? 'text-red-200' : 'text-red-700'} mb-4`}>Deleting your account is permanent. Be sure!</p>
//                             <Button label="Delete Account" variant="danger" className="w-full" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//                 .input-style {
//                     width: 100%;
//                     padding: 0.75rem 1rem;
//                     border-radius: 0.5rem;
//                     border: 1px solid ${isDarkMode ? '#4B5563' : '#D1D5DB'};
//                     background-color: ${isDarkMode ? '#1F2937' : '#FFFFFF'};
//                     color: ${isDarkMode ? '#F9FAFB' : '#111827'};
//                     transition: all 0.3s;
//                 }
//                 .input-style:focus {
//                     outline: none;
//                     border-color: ${isDarkMode ? '#9D7CD8' : '#4B5563'};
//                     box-shadow: 0 0 0 2px ${isDarkMode ? 'rgba(157,124,216,0.3)' : 'rgba(75,85,99,0.2)'};
//                 }
//             `}</style>
//         </div>
//     );
// }
