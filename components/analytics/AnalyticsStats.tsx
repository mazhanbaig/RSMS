'use client';

import { useMemo } from 'react';
import { Home, DollarSign, TrendingUp, Check, Calendar, Building } from 'lucide-react';
import { AnalyticsData } from '@/lib/analytics/processAnalyticsData';

interface AnalyticsStatsProps {
  data: AnalyticsData;
}

export default function AnalyticsStats({ data }: AnalyticsStatsProps) {
  const stats = useMemo(() => [
    {
      title: 'Total Properties',
      value: data.totalProperties,
      icon: <Home className="w-5 h-5" />,
      color: 'purple',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Revenue',
      value: `Rs ${(data.totalRevenue / 10000000).toFixed(2)} Cr`,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'green',
      bgGradient: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      textColor: 'text-green-600'
    },
    {
      title: 'Sold Properties',
      value: data.soldProperties,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'blue',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      title: 'Available',
      value: data.availableProperties,
      icon: <Check className="w-5 h-5" />,
      color: 'emerald',
      bgGradient: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Rented Properties',
      value: data.rentedProperties,
      icon: <Calendar className="w-5 h-5" />,
      color: 'orange',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600'
    },
  ], [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="relative group">
          <div className={`bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor} rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg bg-white border ${stat.borderColor}`}>
                <div className={stat.textColor}>
                  {stat.icon}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <div className={`text-2xl font-bold ${stat.textColor}`}>
              {stat.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
