"use client";

interface PersonalInfoProps {
    formData: any;
    handleChange: (e: any) => void;
}

export default function AddClientPart1({ formData, handleChange }: PersonalInfoProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Status <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="lost">Lost</option>

                    </select>
                </div>

            </div>
        </div>
    );
}
