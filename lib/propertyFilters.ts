interface AdvancedFilters {
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

interface Property {
    id: string;
    title: string;
    propertyType: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    propertyCondition: string;
    isFurnished: boolean;
    hasParking: boolean;
    hasGarden: boolean;
    hasSecurity: boolean;
    [key: string]: any;
}

export function applyAdvancedFilters(properties: Property[], filters: AdvancedFilters): Property[] {
    return properties.filter(property => {
        const price = parseFloat(property.price) || 0;
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;

        if (filters.bedrooms.length > 0) {
            const beds = property.bedrooms?.toString();
            const matches = filters.bedrooms.includes(beds) ||
                (filters.bedrooms.includes('5+') && parseInt(beds) >= 5);
            if (!matches) return false;
        }

        if (filters.bathrooms.length > 0) {
            const baths = property.bathrooms?.toString();
            const matches = filters.bathrooms.includes(baths) ||
                (filters.bathrooms.includes('5+') && parseInt(baths) >= 5);
            if (!matches) return false;
        }

        if (filters.condition.length > 0) {
            if (!filters.condition.includes(property.propertyCondition)) return false;
        }

        const area = parseFloat(property.area) || 0;
        if (area < filters.areaRange[0] || area > filters.areaRange[1]) return false;

        if (filters.isFurnished !== null && property.isFurnished !== filters.isFurnished) return false;
        if (filters.hasParking !== null && property.hasParking !== filters.hasParking) return false;
        if (filters.hasGarden !== null && property.hasGarden !== filters.hasGarden) return false;
        if (filters.hasSecurity !== null && property.hasSecurity !== filters.hasSecurity) return false;

        return true;
    });
}

export type { AdvancedFilters };
