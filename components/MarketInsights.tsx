'use client';

import { TrendingUp, TrendingDown, Home, DollarSign, BarChart3, Calendar } from 'lucide-react';

interface MarketInsightsProps {
    totalProperties: number;
    averagePrice: number;
    priceChange: number;
    totalRevenue: number;
    revenueChange: number;
    activeListings: number;
    soldListings: number;
    daysOnMarket: number;
}

export default function MarketInsights({
    totalProperties,
    averagePrice,
    priceChange,
    totalRevenue,
    revenueChange,
    activeListings,
    soldListings,
    daysOnMarket
}: MarketInsightsProps) {
    const formatPrice = (price: number) => {
        if (price >= 10000000) return `Rs ${(price / 10000000).toFixed(1)} Cr`;
        if (price >= 100000) return `Rs ${(price / 100000).toFixed(1)} L`;
        return `Rs ${price.toLocaleString()}`;
    };

    const insightCards = [
        {
            title: 'Average Property Price',
            value: formatPrice(averagePrice),
            change: priceChange,
            icon: <DollarSign className="w-5 h-5 text-blue-600" />,
            color: 'bg-gradient-to-br from-blue-50 to-blue-100',
            borderColor: 'border-blue-200'
        },
        {
            title: 'Total Revenue',
            value: formatPrice(totalRevenue),
            change: revenueChange,
            icon: <BarChart3 className="w-5 h-5 text-green-600" />,
            color: 'bg-gradient-to-br from-green-50 to-green-100',
            borderColor: 'border-green-200'
        },
        {
            title: 'Active Listings',
            value: activeListings.toString(),
            change: null,
            icon: <Home className="w-5 h-5 text-purple-600" />,
            color: 'bg-gradient-to-br from-purple-50 to-purple-100',
            borderColor: 'border-purple-200'
        },
        {
            title: 'Sold Properties',
            value: soldListings.toString(),
            change: null,
            icon: <TrendingUp className="w-5 h-5 text-orange-600" />,
            color: 'bg-gradient-to-br from-orange-50 to-orange-100',
            borderColor: 'border-orange-200'
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {insightCards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`${card.color} border ${card.borderColor} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="p-2 rounded-lg bg-white border border-gray-200">
                                    {card.icon}
                                </div>
                                {card.change !== null && (
                                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                                        card.change >= 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {card.change >= 0 ? (
                                            <TrendingUp className="w-4 h-4" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4" />
                                        )}
                                        {Math.abs(card.change)}%
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{card.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Average Days on Market */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-white border border-cyan-200">
                        <Calendar className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Average Days on Market</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">Properties take this long to sell on average</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-cyan-600">{daysOnMarket}</span>
                    <span className="text-gray-600 font-medium">days</span>
                </div>
            </div>
        </div>
    );
}
