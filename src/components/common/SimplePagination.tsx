
export const SimplePagination = ({ setCurrentPage, currentPage, totalPages }: { setCurrentPage: any, totalPages: number, currentPage: number }) => {

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center space-x-2 mt-8">
            <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium border rounded-md ${currentPage === page
                            ? 'text-white bg-blue-600 border-blue-600'
                            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
};