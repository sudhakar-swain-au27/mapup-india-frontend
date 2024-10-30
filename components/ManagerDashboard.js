import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AnalyticsChart from '../components/AnalyticsChart';
import PaginatedTable from '../components/PaginatedTable';
import SummaryCards from '../components/SummaryCards'; 
import UserListTable from '@/components/UserListTable';

export default function AdminDashboard() {
  const [pageData, setPageData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [summaryData, setSummaryData] = useState({
    totalFiles: 12,
    totalRecords: 4500,
    lastUploadDate: "2024-10-28",
    dataValidity: "Valid",
    isProcessing: false,
  });

  const fetchData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/data/file-data`);
      if (!response.ok) throw new Error('Failed to fetch stock data');
      const result = await response.json();
      setStockData(result.data || []);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data for admin dashboard
  }, []);

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <Sidebar />
      <div className="flex-1 ml-64">
        <main className="p-4 space-y-6">
          <SummaryCards
            totalFiles={summaryData.totalFiles}
            totalRecords={summaryData.totalRecords}
            lastUploadDate={summaryData.lastUploadDate}
            dataValidity={summaryData.dataValidity}
            isProcessing={summaryData.isProcessing}
            onFileUpload={fetchData} 
          />
          <PaginatedTable data={stockData} rowsPerPage={10} onPageChange={setPageData} />
          <AnalyticsChart pageData={pageData} />
          <UserListTable />
        </main>
      </div>
    </div>
  );
}
