'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { message } from 'antd';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { checkUserSession, getData } from '@/FBConfig/fbFunctions';
import { processAnalyticsData, Property, AnalyticsData } from '@/lib/analytics/processAnalyticsData';
import AnalyticsStats from '@/components/analytics/AnalyticsStats';
import MonthlyOverviewChart from '@/components/analytics/MonthlyOverviewChart';
import RevenueChart from '@/components/analytics/RevenueChart';
import PropertyTypeChart from '@/components/analytics/PropertyTypeChart';
import DealsChart from '@/components/analytics/DealsChart';
import MarketInsights from '@/components/MarketInsights';
import { calculateMarketStats } from '@/lib/dashboardUtils';

interface UserInfo {
  uid: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const params = useParams();
  const uid = params.uid as string;

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user: any = await checkUserSession();
        if (!user) {
          message.error('Please Login First');
          router.replace('/login');
          return;
        }

        // if (user.uid !== uid) {
        //   message.error('Unauthorized access');
        //   router.replace('/login');
        //   return;
        // }

        const storedUser = localStorage.getItem('userInfo');
        let userData;

        if (storedUser) {
          userData = JSON.parse(storedUser);
        } else {
          userData = await getData(`users/${user.uid}`);
          if (userData) {
            localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, ...userData }));
          }
        }

        if (userData) {
          setUserInfo({ uid: user.uid, ...userData });
          await fetchProperties(user.uid);
        }
      } catch (err) {
        console.error('Authentication error:', err);
        message.error('Error occurred during authentication');
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [uid, router]);

  const fetchProperties = async (userId: string) => {
    try {
      const propertiesData: any = await getData(`properties/${userId}`);

      if (propertiesData) {
        const propertiesArray: Property[] = Object.entries(propertiesData)
          .map(([id, data]: [string, any]) => ({
            id,
            ...data
          }))
          .filter((property: Property) => property.agentUid === userId)
          .sort((a: Property, b: Property) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });

        setProperties(propertiesArray);
        const analytics = processAnalyticsData(propertiesArray);
        setAnalyticsData(analytics);
      } else {
        setProperties([]);
        setAnalyticsData(processAnalyticsData([]));
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
      setAnalyticsData(processAnalyticsData([]));
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!analyticsData) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
      <Header userData={userInfo} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Analytics Dashboard</span>
              <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Property Analytics
            </h1>
            <p className="text-gray-600">
              Comprehensive insights into your property portfolio performance and market trends.
            </p>
          </div>
        </div>

        {/* Market Insights */}
        <div className="mb-8">
          {analyticsData && (
            <MarketInsights
              {...calculateMarketStats(properties)}
            />
          )}
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <AnalyticsStats data={analyticsData!} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MonthlyOverviewChart data={analyticsData!.monthlyData} />
          <RevenueChart data={analyticsData!.monthlyData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PropertyTypeChart data={analyticsData!.propertyTypeData} />
          <DealsChart data={analyticsData!.dealsData} />
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No analytics data available</p>
            <p className="text-gray-500 text-sm">
              Start adding properties to see your analytics dashboard populate with insights.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
