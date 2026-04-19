'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PropertyTypeData } from '@/lib/analytics/processAnalyticsData';

interface PropertyTypeChartProps {
  data: PropertyTypeData[];
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

export default function PropertyTypeChart({ data }: PropertyTypeChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center justify-center h-96">
        <p className="text-gray-500">No property data available</p>
      </div>
    );
  }

  // Transform data to include 'name' field for Recharts
  const chartData = data.map(item => ({
    ...item,
    name: item.type,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties by Type</h3>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent = 0 }) => `${name} (${(percent * 100).toFixed(1)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Breakdown</h4>
        <div className="space-y-2">
          {data.map((type, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-700">{type.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">{type.count}</span>
                <span className="text-sm text-gray-500">{type.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
