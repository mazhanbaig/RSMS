'use client';

import Button from "@/components/Button";
import Header from "@/components/Header";
import { getData, deleleData } from "@/FBConfig/fbFunctions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientsPage() {
    interface UserInfo {
        uid: string;
        email?: string;
        name?: string;
        [key: string]: any;
    }

    const router = useRouter();
    const [clients, setClients] = useState<any[]>([]);
    const [searchVal, setSearchVal] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    // Load userInfo from localStorage once
    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
            try {
                const parsed: UserInfo = JSON.parse(stored);
                getData(`users/${parsed.uid}`)
                .then((res:any)=>{
                    setUserInfo(res)
                })
                .catch((err:any)=>{
                    console.error(err.message);           
                })
                setUserInfo(parsed);
            } catch (err) {
                console.error("Failed to parse userInfo:", err);
            }
        }
    }, []);

    // Fetch clients once userInfo is available
    useEffect(() => {
        getData('clients/')
            .then((res: any) => {
                if (res) {
                    const clientsArray = Object.values(res);
                    const ownerClients = clientsArray.filter(
                        (client: any) => client.ownerUid === userInfo.uid
                    );
                    setClients(ownerClients);
                    console.log('Fetched clients:', ownerClients);
                } else {
                    setClients([]);
                }
            })
            .catch(err => console.log(err));
    }, [userInfo]);

    // Delete client
    const deleteClient = (i: number) => {
        const client = clients[i];
        deleleData(`clients/${client.id}`)
            .then(() => {
                const updated = [...clients];
                updated.splice(i, 1);
                setClients(updated);
            })
            .catch(err => console.log(err));
    };

    // Filter clients based on search input
    const filteredClients = clients.filter(client =>
        client.firstName.toLowerCase().includes(searchVal.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Header userData={userInfo} />

            <div className="p-6 max-w-7xl mx-auto">
                {/* Page Header with Stats */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Clients</h1>

                    <div className="flex gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
                            <div className="text-sm text-gray-600">Total Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                {clients.filter(c => c.status === 'active').length}
                            </div>
                            <div className="text-sm text-gray-600">Active Leads</div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                            <Button
                                label="+ Add Client"
                                onClick={() => router.push("/clients/addclient")}
                                variant="theme2"
                                size="md"
                            />
                            <Button
                                label="Import Client"
                                onClick={() => router.push("/clients/addclient")}
                                variant="theme"
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

                {/* Clients Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-3 font-semibold text-gray-900">#</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Client Name</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Email</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Phone</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Property Type</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Preferred Locations</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Bedrooms</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Budget</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Source</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Status</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client: any, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{client.firstName} {client.lastName}</td>
                                        <td className="p-3">{client.email}</td>
                                        <td className="p-3">{client.phone}</td>
                                        <td className="p-3">{client.propertyType}</td>
                                        <td className="p-3">{client.preferredLocations}</td>
                                        <td className="p-3">{client.bedrooms}</td>
                                        <td className="p-3">{client.minBudget} - {client.maxBudget}</td>
                                        <td className="p-3">{client.source}</td>
                                        <td className="p-3 capitalize">{client.status}</td>
                                        <td className="p-3 flex gap-2">
                                            <Button
                                                onClick={() =>
                                                    router.push(`/clients/addclient?clientData=${encodeURIComponent(JSON.stringify(client))}`)
                                                }
                                                label='Edit'
                                                size="sm"
                                                variant="theme2"
                                            />
                                            <Button onClick={() => deleteClient(index)} label='Delete' size="sm" variant="theme" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={12} className="p-8 text-center text-gray-500">
                                        No clients found. Click "Add Client" to get started.
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
