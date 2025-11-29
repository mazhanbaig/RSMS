'use client';

import Button from "@/components/Button";
import Header from "@/components/Header";
import { getData, deleleData } from "@/FBConfig/fbFunctions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientsPage() {
    const router = useRouter();
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        getData('clients/')
            .then((res: any) => {
                if (res) {
                    const clientsArray = Object.values(res);
                    setClients(clientsArray);
                    console.log(clientsArray); // log the actual fetched data
                } else {
                    setClients([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deleteClient=(i:number)=>{
        let client=clients[i]
        deleleData(client.firstName)
        .then((res)=>{
            const updated = [...clients];
            updated.splice(i, 1);
            setClients(updated);
        })
        .catch((err)=>{
            console.log(err);
            
        })

    }

    

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="p-6 max-w-7xl mx-auto">
                {/* Page Header with Stats */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Clients</h1>

                    <div className="flex gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">0</div>
                            <div className="text-sm text-gray-600">Total Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">0</div>
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
                                variant="theme2"
                                size="md"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <input
                                type="text"
                                placeholder="Search clients..."
                                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Status</option>
                                <option>Leads</option>
                                <option>Active</option>
                                <option>Closed</option>
                            </select>
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
                                <th className="text-left p-3 font-semibold text-gray-900">Notes</th>
                                <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {clients && clients.length > 0 ? (
                                clients.map((client: any, index: number) => (
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
                                        <td className="p-3">{client.notes}</td>
                                        <td className="p-3 flex gap-2"> 
                                            <Button onClick={()=>{

                                            }} label='Edit' size="sm" />
                                            <Button onClick={() => {
                                                deleteClient(index)
                                            }} label='Delete' size="sm" />
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

