import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components for Chart.js
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

/**
 * AnalyticsChart component to display stock data in a line chart.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.pageData - Array of data points to be visualized in the chart.
 * @returns {JSX.Element} The rendered line chart.
 */
export default function AnalyticsChart({ pageData }) {
  // Generate chart data from pageData
  const chartData = {
    labels: pageData.map(entry => new Date(entry.date).toISOString().split('T')[0]), // Format date for labels
    datasets: [
      {
        label: 'Open',
        data: pageData.map(entry => entry.open),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        lineTension: 0.3,
      },
      {
        label: 'High',
        data: pageData.map(entry => entry.high),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        lineTension: 0.3,
      },
      {
        label: 'Low',
        data: pageData.map(entry => entry.low),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        lineTension: 0.3,
      },
      {
        label: 'Close',
        data: pageData.map(entry => entry.close),
        borderColor: 'rgba(102, 51, 153, 1)',
        backgroundColor: 'rgba(102, 51, 153, 0.2)',
        fill: true,
        lineTension: 0.3,
      },
      {
        label: 'Volume',
        data: pageData.map(entry => entry.volume),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        lineTension: 0.3,
        yAxisID: 'y1', // Separate scale for Volume
      },
    ],
  };

  // Define chart options for customization
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(102, 51, 153, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#666',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 10,
          color: '#666',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
          color: '#666',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: '#666',
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Volume',
          color: '#666',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          drawOnChartArea: false, // Keep y1 scale separate
        },
        ticks: {
          color: '#666',
        },
      },
    },
  };

  // Render the Line chart within a responsive container
  return (
    <div className="mt-4 w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Analytics</h2>
      <div className="relative h-80 w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
