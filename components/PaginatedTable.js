import { useState, useEffect } from 'react';

export default function PaginatedTable({ data = [], rowsPerPage = 10, onPageChange, loading }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages based on data length and rows per page
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Slice the data based on the current page and rows per page
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Update the current page data when the current page changes
  useEffect(() => {
    onPageChange(currentData);
  }, [currentPage, currentData, onPageChange]);

  // Format date for display
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  // Handle page change by updating the current page and triggering the onPageChange callback
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get the previous and next page buttons
  const getPaginationButtons = () => {
    const maxButtons = 5;
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="p-6 shadow-md rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>
        U.S. Stock Market Historical Data (Kaggle)
      </h2>
      
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-4 border-b font-semibold">Date</th>
                <th className="py-3 px-4 border-b font-semibold">Open</th>
                <th className="py-3 px-4 border-b font-semibold">High</th>
                <th className="py-3 px-4 border-b font-semibold">Low</th>
                <th className="py-3 px-4 border-b font-semibold">Close</th>
                <th className="py-3 px-4 border-b font-semibold">Volume</th>
                <th className="py-3 px-4 border-b font-semibold">Open Interest</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length ? (
                currentData.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50 text-sm">
                    <td className="py-3 px-4 border-b">{formatDate(item.date)}</td>
                    <td className="py-3 px-4 border-b">{item.open}</td>
                    <td className="py-3 px-4 border-b">{item.high}</td>
                    <td className="py-3 px-4 border-b">{item.low}</td>
                    <td className="py-3 px-4 border-b">{item.close}</td>
                    <td className="py-3 px-4 border-b">{item.volume}</td>
                    <td className="py-3 px-4 border-b">{item.openInt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 px-4 text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        {getPaginationButtons().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            aria-label={`Page ${pageNumber}`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === pageNumber
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
