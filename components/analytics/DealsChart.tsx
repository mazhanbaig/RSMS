'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DealsData } from '@/lib/analytics/processAnalyticsData';

interface DealsChartProps {
  data: DealsData[];
}

export default function DealsChart({ data }: DealsChartProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Deals Overview</h3>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar
              dataKey="sold"
              fill="#8b5cf6"
              name="Sold"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="rented"
              fill="#3b82f6"
              name="Rented"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="available"
              fill="#10b981"
              name="Available"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <p className="text-sm text-gray-600 mb-1">Total Sold</p>
          <p className="text-2xl font-bold text-purple-600">
            {data.reduce((sum, m) => sum + m.sold, 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Total Rented</p>
          <p className="text-2xl font-bold text-blue-600">
            {data.reduce((sum, m) => sum + m.rented, 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-600 mb-1">Currently Available</p>
          <p className="text-2xl font-bold text-green-600">
            {data[data.length - 1]?.available || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
