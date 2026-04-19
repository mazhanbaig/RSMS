'use client';

import { useState, useCallback } from 'react';
import { ChevronDown, X, Sliders } from 'lucide-react';

interface FilterState {
    priceRange: [number, number];
    bedrooms: string[];
    bathrooms: string[];
    areaRange: [number, number];
    condition: string[];
    isFurnished: boolean | null;
    hasParking: boolean | null;
    hasGarden: boolean | null;
    hasSecurity: boolean | null;
}

interface AdvancedPropertyFilterProps {
    onFilterChange: (filters: FilterState) => void;
    isOpen: boolean;
    onToggle: (open: boolean) => void;
}

export default function AdvancedPropertyFilter({
    onFilterChange,
    isOpen,
    onToggle
}: AdvancedPropertyFilterProps) {
    const [filters, setFilters] = useState<FilterState>({
        priceRange: [0, 10000000],
        bedrooms: [],
        bathrooms: [],
        areaRange: [0, 50000],
        condition: [],
        isFurnished: null,
        hasParking: null,
        hasGarden: null,
        hasSecurity: null
    });

    const handleFilterChange = useCallback((updatedFilters: FilterState) => {
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    }, [onFilterChange]);

    const resetFilters = useCallback(() => {
        const defaultFilters: FilterState = {
            priceRange: [0, 10000000],
            bedrooms: [],
            bathrooms: [],
            areaRange: [0, 50000],
            condition: [],
            isFurnished: null,
            hasParking: null,
            hasGarden: null,
            hasSecurity: null
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    }, [onFilterChange]);

    const toggleMultiSelect = (key: keyof Pick<FilterState, 'bedrooms' | 'bathrooms' | 'condition'>, value: string) => {
        const updated = { ...filters };
        const arr = updated[key] as string[];
        if (arr.includes(value)) {
            updated[key] = arr.filter(v => v !== value) as any;
        } else {
            updated[key] = [...arr, value] as any;
        }
        handleFilterChange(updated);
    };

    const toggleBoolean = (key: keyof Pick<FilterState, 'isFurnished' | 'hasParking' | 'hasGarden' | 'hasSecurity'>) => {
        const current = filters[key];
        const updated = { ...filters };
        updated[key] = current === null ? true : current === true ? false : null;
        handleFilterChange(updated);
    };

    const activeFiltersCount = Object.values(filters).filter(f => {
        if (Array.isArray(f)) return f.length > 0;
        if (typeof f === 'boolean') return true;
        if (Array.isArray(f) && f[0] !== undefined) return f[0] !== 0 || f[1] !== (f === filters.priceRange ? 10000000 : 50000);
        return false;
    }).length;

    return (
        <div className="relative">
            {/* Filter Toggle Button */}
            <button
                onClick={() => onToggle(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
                <Sliders className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Advanced Filters</span>
                {activeFiltersCount > 0 && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-medium">
                        {activeFiltersCount}
                    </span>
                )}
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter Panel */}
            {isOpen && (
                <div className="absolute top-12 left-0 w-96 max-w-screen bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-6 space-y-6">
                    {/* Bedrooms */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Bedrooms</label>
                        <div className="grid grid-cols-5 gap-2">
                            {['1', '2', '3', '4', '5+'].map((bed) => (
                                <button
                                    key={bed}
                                    onClick={() => toggleMultiSelect('bedrooms', bed)}
                                    className={`py-2 rounded-lg font-medium text-sm transition-all ${
                                        filters.bedrooms.includes(bed)
                                            ? 'bg-purple-600 text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {bed}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Bathrooms</label>
                        <div className="grid grid-cols-5 gap-2">
                            {['1', '2', '3', '4', '5+'].map((bath) => (
                                <button
                                    key={bath}
                                    onClick={() => toggleMultiSelect('bathrooms', bath)}
                                    className={`py-2 rounded-lg font-medium text-sm transition-all ${
                                        filters.bathrooms.includes(bath)
                                            ? 'bg-purple-600 text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {bath}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Property Condition */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Condition</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['New', 'Excellent', 'Good', 'Fair'].map((cond) => (
                                <button
                                    key={cond}
                                    onClick={() => toggleMultiSelect('condition', cond)}
                                    className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                                        filters.condition.includes(cond)
                                            ? 'bg-purple-600 text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {cond}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Amenities</label>
                        <div className="space-y-2">
                            {[
                                { key: 'isFurnished', label: 'Furnished' },
                                { key: 'hasParking', label: 'Parking' },
                                { key: 'hasGarden', label: 'Garden/Lawn' },
                                { key: 'hasSecurity', label: '24/7 Security' }
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => toggleBoolean(key as any)}
                                    className={`w-full text-left px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                                        filters[key as keyof Pick<FilterState, 'isFurnished' | 'hasParking' | 'hasGarden' | 'hasSecurity'>] === true
                                            ? 'bg-green-100 text-green-700 border border-green-300'
                                            : filters[key as keyof Pick<FilterState, 'isFurnished' | 'hasParking' | 'hasGarden' | 'hasSecurity'>] === false
                                                ? 'bg-red-100 text-red-700 border border-red-300'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                    }`}
                                >
                                    <span className="flex items-center justify-between">
                                        {label}
                                        {filters[key as keyof Pick<FilterState, 'isFurnished' | 'hasParking' | 'hasGarden' | 'hasSecurity'>] === true && '✓'}
                                        {filters[key as keyof Pick<FilterState, 'isFurnished' | 'hasParking' | 'hasGarden' | 'hasSecurity'>] === false && '✗'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={resetFilters}
                        className="w-full py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-colors flex items-center justify-center gap-2"
                    >
                        <X className="w-4 h-4" />
                        Reset All Filters
                    </button>
                </div>
            )}
        </div>
    );
}
