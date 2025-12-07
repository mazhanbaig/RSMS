'use client'

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { getData, deleleData, auth } from "@/FBConfig/fbFunctions";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function OwnersPage() {
    const router = useRouter();
    const [owners, setOwners] = useState<any[]>([]);
    const [searchVal, setSearchVal] = useState("");
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace("/login");
            } else {
                try {
                    const storedUser = localStorage.getItem("userInfo");
                    if (!storedUser) return;

                    const { uid } = JSON.parse(storedUser);

                    const userData = await getData(`users/${uid}`);
                    setUserInfo(userData);

                    // Fetch owners related to this user
                    const res = await getData("owners/");
                    if (res) {
                        const allOwners = Object.values(res).filter(
                            (owner: any) => owner.ownerUid === uid
                        );
                        setOwners(allOwners);
                    } else {
                        setOwners([]);
                    }
                } catch (err) {
                    console.log("Error fetching data:", err);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const deleteOwner = (i: number) => {
        const owner = owners[i];
        deleleData(`owners/${owner.id}`)
            .then(() => setOwners(prev => prev.filter((_, idx) => idx !== i)))
            .catch(console.log);
    };

    const filteredOwners = owners.filter(owner =>
        owner.firstName.toLowerCase().includes(searchVal.toLowerCase())
    );

    if (!userInfo) {
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header userData={userInfo} />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Owners</h1>
                    <div className="flex gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{owners.length}</div>
                            <div className="text-sm text-gray-500">Total Owners</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                {owners.filter(o => o.status === "active").length}
                            </div>
                            <div className="text-sm text-gray-500">Active Owners</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                            <Button
                                label="+ Add Owner"
                                onClick={() => router.push("/owners/addowner")}
                                variant="theme2"
                                size="md"
                            />

                        </div>

                        <div className="flex flex-wrap gap-3">
                            <input
                                type="text"
                                value={searchVal}
                                placeholder="Search clients..."
                                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={(e) => setSearchVal(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="w-full min-w-[700px]">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left font-semibold text-gray-900">#</th>
                                <th className="p-3 text-left font-semibold text-gray-900">Owner Name</th>
                                <th className="p-3 text-left font-semibold text-gray-900">Email</th>
                                <th className="p-3 text-left font-semibold text-gray-900">Phone</th>
                                <th className="p-3 text-left font-semibold text-gray-900">Status</th>
                                <th className="p-3 text-left font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredOwners.length > 0 ? (
                                filteredOwners.map((owner, i) => (
                                    <tr onClick={() => router.push(`owners/viewowner/${owner.id}`)} key={i} className="hover:bg-gray-50">
                                        <td className="p-3">{i + 1}</td>
                                        <td className="p-3">{owner.firstName} {owner.lastName}</td>
                                        <td className="p-3">{owner.email || "-"}</td>
                                        <td className="p-3">{owner.phone}</td>
                                        <td className={`p-3 capitalize ${owner.status === "active" ? "text-green-500" : owner.status === "closed" ? 'text-red-500' : 'text-purple-500'}`}>
                                            {owner.status}
                                        </td>
                                        <td className="p-3 flex gap-2">
                                            <Button
                                                label="Edit"
                                                size="sm"
                                                variant="theme2"
                                                onClick={(e:any) =>{
                                                    e.stopPropagation()
                                                    router.push(`/owners/addowner?ownerData=${encodeURIComponent(JSON.stringify(owner))}`)
                                                }
                                                }
                                            />
                                            <Button label="Delete" size="sm" variant="theme" onClick={() => deleteOwner(i)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No owners found. Click "Add Owner" to start.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
