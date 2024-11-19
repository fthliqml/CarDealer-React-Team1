import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@headlessui/react";

const Pagination = ({ page, onSetPage, totalPages }) => {
  const next = () => {
    if (page < totalPages) {
      onSetPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      onSetPage(page - 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-5">
      <Button
        onClick={prev}
        disabled={page === 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
          page === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-200"
        }`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        Previous
      </Button>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => onSetPage(index + 1)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              page === index + 1
                ? "bg-[#5e8979] text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <Button
        onClick={next}
        disabled={page === totalPages}
        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
          page === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-200"
        }`}
      >
        Next
        <ChevronRightIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Pagination;
