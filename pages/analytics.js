// pages/analytics.js
import React from 'react';
import AnalyticsChart from '../components/AnalyticsChart';

export default function AnalyticsPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center text-blue-600">Analytics</h2>
      <AnalyticsChart />
    </div>
  );
}
