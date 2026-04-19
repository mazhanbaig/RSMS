import { ActivityItem } from '@/components/ActivityLog';

export interface Property {
    id: string;
    title: string;
    propertyType: string;
    price: string;
    priceUnit: string;
    createdAt: any;
    [key: string]: any;
}

export function generateActivityLog(
    properties: Property[],
    clients: any[],
    owners: any[],
    events: any[]
): ActivityItem[] {
    const activities: ActivityItem[] = [];
    const baseTime = new Date();

    // Add property activities
    properties.forEach((prop, index) => {
        const propTime = prop.createdAt?.toDate?.() || new Date(prop.createdAt);
        activities.push({
            id: `prop-${prop.id}`,
            type: 'property_added',
            title: `Property Added: ${prop.title}`,
            description: `${prop.propertyType} listed at Rs ${prop.price} ${prop.priceUnit}`,
            timestamp: propTime,
            metadata: {
                itemId: prop.id,
                itemName: prop.title,
                propertyType: prop.propertyType
            }
        });
    });

    // Add client activities
    clients.forEach((client) => {
        const clientTime = client.createdAt?.toDate?.() || new Date(client.createdAt) || new Date();
        activities.push({
            id: `client-${client.id}`,
            type: 'client_added',
            title: `Client Added: ${client.firstName} ${client.lastName || ''}`,
            description: `New ${client.status || 'active'} client registered`,
            timestamp: clientTime,
            metadata: {
                itemId: client.id,
                itemName: `${client.firstName} ${client.lastName}`
            }
        });
    });

    // Add event activities
    events.forEach((event) => {
        const eventTime = event.createdAt?.toDate?.() || new Date(event.createdAt) || new Date();
        activities.push({
            id: `event-${event.id}`,
            type: 'event_created',
            title: `Event Created: ${event.title || 'Untitled Event'}`,
            description: `Scheduled for ${new Date(event.eventDate || eventTime).toLocaleDateString()}`,
            timestamp: eventTime,
            metadata: {
                itemId: event.id,
                itemName: event.title
            }
        });
    });

    return activities.sort((a, b) => {
        const timeA = a.timestamp instanceof Date ? a.timestamp.getTime() : new Date(a.timestamp).getTime();
        const timeB = b.timestamp instanceof Date ? b.timestamp.getTime() : new Date(b.timestamp).getTime();
        return timeB - timeA;
    });
}

export function calculateMarketStats(properties: Property[]) {
    if (properties.length === 0) {
        return {
            totalProperties: 0,
            averagePrice: 0,
            priceChange: 0,
            totalRevenue: 0,
            revenueChange: 0,
            activeListings: 0,
            soldListings: 0,
            daysOnMarket: 0
        };
    }

    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Calculate total revenue
    const totalRevenue = properties.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);

    // Calculate properties added this month
    const thisMonthProps = properties.filter(p => {
        const pDate = p.createdAt?.toDate?.() || new Date(p.createdAt);
        return pDate >= currentMonth;
    }).length;

    const lastMonthProps = properties.filter(p => {
        const pDate = p.createdAt?.toDate?.() || new Date(p.createdAt);
        return pDate >= lastMonth && pDate < currentMonth;
    }).length;

    const priceChange = lastMonthProps > 0
        ? Math.round(((thisMonthProps - lastMonthProps) / lastMonthProps) * 100)
        : 0;

    // Average price
    const averagePrice = Math.round(totalRevenue / properties.length);

    // Count by status
    const activeListings = properties.filter(p => p.propertyStatus === 'available').length;
    const soldListings = properties.filter(p => p.propertyStatus === 'sold').length;

    // Estimate days on market (mock - should come from actual data)
    const daysOnMarket = soldListings > 0 ? Math.round(Math.random() * 90 + 30) : 0;

    return {
        totalProperties: properties.length,
        averagePrice,
        priceChange,
        totalRevenue,
        revenueChange: priceChange,
        activeListings,
        soldListings,
        daysOnMarket
    };
}
