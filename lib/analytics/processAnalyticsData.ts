export interface Property {
  id: string;
  createdAt: any;
  title: string;
  price: string;
  priceUnit: string;
  propertyType: string;
  propertyStatus: 'available' | 'rented' | 'sold' | 'under-Negotiation';
  agentUid: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalProperties: number;
  soldProperties: number;
  rentedProperties: number;
  availableProperties: number;
  monthlyData: MonthlyData[];
  propertyTypeData: PropertyTypeData[];
  dealsData: DealsData[];
}

export interface MonthlyData {
  month: string;
  revenue: number;
  properties: number;
}

export interface PropertyTypeData {
  type: string;
  count: number;
  percentage: number;
}

export interface DealsData {
  month: string;
  sold: number;
  rented: number;
  available: number;
}

export function processAnalyticsData(properties: Property[]): AnalyticsData {
  if (!properties || properties.length === 0) {
    return {
      totalRevenue: 0,
      totalProperties: 0,
      soldProperties: 0,
      rentedProperties: 0,
      availableProperties: 0,
      monthlyData: [],
      propertyTypeData: [],
      dealsData: [],
    };
  }

  // Calculate basic stats
  const totalProperties = properties.length;
  const soldProperties = properties.filter(
    (p) => p.propertyStatus === 'sold'
  ).length;
  const rentedProperties = properties.filter(
    (p) => p.propertyStatus === 'rented'
  ).length;
  const availableProperties = properties.filter(
    (p) => p.propertyStatus === 'available'
  ).length;

  // Calculate total revenue
  const totalRevenue = properties.reduce((sum, p) => {
    const price = parseFloat(p.price) || 0;
    let convertedPrice = price;

    if (p.priceUnit === 'Lakh') {
      convertedPrice = price * 100000;
    } else if (p.priceUnit === 'Crore') {
      convertedPrice = price * 10000000;
    } else if (p.priceUnit === 'Million') {
      convertedPrice = price * 1000000;
    }

    return sum + convertedPrice;
  }, 0);

  // Generate monthly data (last 6 months)
  const monthlyData = generateMonthlyData(properties);

  // Generate property type data
  const propertyTypeData = generatePropertyTypeData(properties);

  // Generate deals data (monthly breakdown by status)
  const dealsData = generateDealsData(properties);

  return {
    totalRevenue,
    totalProperties,
    soldProperties,
    rentedProperties,
    availableProperties,
    monthlyData,
    propertyTypeData,
    dealsData,
  };
}

function generateMonthlyData(properties: Property[]): MonthlyData[] {
  const months: MonthlyData[] = [];
  const monthMap = new Map<string, { revenue: number; properties: number }>();

  // Get last 6 months
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  properties.forEach((property) => {
    const createdAt = property.createdAt.toDate
      ? property.createdAt.toDate()
      : new Date(property.createdAt);

    if (createdAt >= sixMonthsAgo) {
      const monthKey = createdAt.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

      const existing = monthMap.get(monthKey) || { revenue: 0, properties: 0 };
      const price = parseFloat(property.price) || 0;

      let convertedPrice = price;
      if (property.priceUnit === 'Lakh') {
        convertedPrice = price * 100000;
      } else if (property.priceUnit === 'Crore') {
        convertedPrice = price * 10000000;
      } else if (property.priceUnit === 'Million') {
        convertedPrice = price * 1000000;
      }

      existing.revenue += convertedPrice;
      existing.properties += 1;
      monthMap.set(monthKey, existing);
    }
  });

  // Fill in missing months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
    const data = monthMap.get(monthKey) || { revenue: 0, properties: 0 };
    months.push({
      month: monthKey,
      revenue: Math.round(data.revenue),
      properties: data.properties,
    });
  }

  return months;
}

function generatePropertyTypeData(properties: Property[]): PropertyTypeData[] {
  const typeMap = new Map<string, number>();

  properties.forEach((property) => {
    const count = typeMap.get(property.propertyType) || 0;
    typeMap.set(property.propertyType, count + 1);
  });

  const total = properties.length;
  const data: PropertyTypeData[] = [];

  typeMap.forEach((count, type) => {
    data.push({
      type,
      count,
      percentage: parseFloat(((count / total) * 100).toFixed(1)),
    });
  });

  return data.sort((a, b) => b.count - a.count);
}

function generateDealsData(properties: Property[]): DealsData[] {
  const deals: DealsData[] = [];
  const dealsMap = new Map<string, { sold: number; rented: number; available: number }>();

  // Get last 6 months
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  properties.forEach((property) => {
    const createdAt = property.createdAt.toDate
      ? property.createdAt.toDate()
      : new Date(property.createdAt);

    if (createdAt >= sixMonthsAgo) {
      const monthKey = createdAt.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

      const existing = dealsMap.get(monthKey) || {
        sold: 0,
        rented: 0,
        available: 0,
      };

      if (property.propertyStatus === 'sold') {
        existing.sold += 1;
      } else if (property.propertyStatus === 'rented') {
        existing.rented += 1;
      } else if (property.propertyStatus === 'available') {
        existing.available += 1;
      }

      dealsMap.set(monthKey, existing);
    }
  });

  // Fill in missing months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
    const data = dealsMap.get(monthKey) || {
      sold: 0,
      rented: 0,
      available: 0,
    };
    deals.push({
      month: monthKey,
      ...data,
    });
  }

  return deals;
}
