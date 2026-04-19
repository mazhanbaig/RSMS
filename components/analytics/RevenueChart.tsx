'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '@/lib/analytics/processAnalyticsData';

interface RevenueChartProps {
  data: MonthlyData[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const formattedData = data.map(d => ({
    ...d,
    displayRevenue: d.revenue / 10000000 // Convert to Crore for display
  }));

  const maxRevenue = Math.max(...formattedData.map(d => d.displayRevenue));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Revenue (Crore)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              formatter={(value: any) => [`Rs ${value.toFixed(2)} Cr`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="displayRevenue"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">
            Rs {(data.reduce((sum, m) => sum + m.revenue, 0) / 10000000).toFixed(2)} Cr
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
          <p className="text-sm text-gray-600 mb-1">Peak Month</p>
          <p className="text-2xl font-bold text-emerald-600">
            Rs {(maxRevenue).toFixed(2)} Cr
          </p>
        </div>
      </div>
    </div>
  );
}
