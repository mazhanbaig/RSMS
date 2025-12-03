"use client";

interface AdditionalInfoProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function AddClientPart3({ formData, handleChange }: AdditionalInfoProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Source
                    </label>
                    <select
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Source</option>
                        <option value="website">Website</option>
                        <option value="referral">Referral</option>
                        <option value="social-media">Social Media</option>
                        <option value="walk-in">Walk-in</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Additional Notes
                    </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Additional Notes"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

            </div>
        </div>
    );
}
