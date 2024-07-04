import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      {totalPages > 1 && (
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`px-3 py-2 border rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
          >
            Previous
          </button>
          {pages.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 border rounded ${page === currentPage ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={`px-3 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
