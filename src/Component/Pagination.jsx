import React from 'react';
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const handlePageClick = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            onPageChange(pageNum);
        }
    };

    const renderPages = () => {
        const pages = [];
        pages.push(1);

        if (currentPage > 4) {
            pages.push('...');
        }

        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(i);
            }
        }

        if (currentPage < totalPages - 3) {
            pages.push('...');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-between items-end my-4 w-full flex-wrap gap-2 ">
            {/* Mobile View: Compact Controls */}
            <div className="flex sm:hidden justify-between items-center w-full">
                <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border bg-[#ffffff13] backdrop-blur-md text-black disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border bg-[#fd3d3d13] backdrop-blur-md text-black disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Desktop View: Full Numeric Pagination */}
            <div className="hidden sm:flex justify-end items-center flex-wrap gap-2 w-full">
                <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-md border bg-[#ffffff13] backdrop-blur-md text-black disabled:opacity-50"
                >
                    &lt;
                </button>

                {renderPages().map((item, index) => (
                    <button
                        key={index}
                        onClick={() => typeof item === 'number' && handlePageClick(item)}
                        disabled={item === '...'}
                        className={`w-10 h-10 rounded-md border text-sm 
                            ${item === currentPage
                                ? 'bg-bg-color backdrop-blur-md text-white'
                                : 'bg-white/10 text-black'
                            } 
                            ${item === '...' && 'cursor-default'}`}
                    >
                        {item}
                    </button>
                ))}

                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-md border bg-[#ffffff13] backdrop-blur-md text-black disabled:opacity-50"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Pagination;
