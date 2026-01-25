export type PropertyStatus = 'active' | 'sold' | 'pending' | 'inactive'

export type PropertyType ='House' | 'Flat/Apartment' | 'Commercial' | 'Plot'

export type PriceUnit = 'Lakh' | 'Crore' | 'Million'

export interface Property {
        title: string
        description: string
        propertyType: string
        price: string
        priceUnit: string
        location: string 
        city: string
        area: string
        areaUnit: string
        bedrooms: string
        bathrooms: string
        yearBuilt?: string
        ownerName: string
        ownerContact?: string
        features: string[]
        amenities: string[]
        facingDirection?: string
        propertyCondition: string
        isFurnished: boolean
        hasParking: boolean
        hasGarden: boolean
        hasSecurity: boolean
        propertyStatus: 'available' | 'rented' | 'sold' | 'under-Negotiation'
        agentUid: string
        agentName: string
        images: any[]
        createdAt: any
        id: string
}
