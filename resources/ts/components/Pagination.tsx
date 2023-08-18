import { useState, useEffect } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link } from '@/interface/pagination';

interface onClickParams {
  url: string;
}

interface PaginationProps {
  links?: Link[];
  current_page?: number;
  from?: number;
  to?: number;
  total?: number;
  per_page?: number;
  next_page_url?: string;
  prev_page_url?: string;
  first_page_url?: string;
  last_page_url?: string;
  last_page?: number;
  onChangePagination?: ({ url }: onClickParams) => void;
}

function Pagination({
  links = [],
  current_page = 1,
  from = 0,
  to = 0,
  total = 0,
  per_page = 0,
  next_page_url = '',
  prev_page_url = '',
  first_page_url = '',
  // last_page_url = '',
  last_page = 0,
  onChangePagination = () => {},
}: PaginationProps) {
  const [pageInput, setPageInput] = useState(String(current_page));

  useEffect(() => {
    setPageInput(String(current_page));
  }, [current_page]);

  if (!links) return null;
  return (
    <div className="flex items-center justify-between px-5 py-3 sm:px-7.5">
      <div className="flex flex-1 justify-between text-graydark dark:text-white sm:hidden">
        <button
          disabled={current_page <= 1}
          onClick={() => onChangePagination({ url: prev_page_url })}
          className="border-gray-300 hover:bg-gray-50 relative inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium dark:bg-boxdark"
        >
          Previous
        </button>
        <button
          disabled={current_page >= last_page}
          onClick={() => onChangePagination({ url: next_page_url })}
          className="border-gray-300 hover:bg-gray-50 relative ml-3 inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium dark:bg-boxdark"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing <span className="font-medium">{from}</span> to{' '}
            <span className="font-medium">{to}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={per_page}
            onChange={(e) =>
              onChangePagination({
                url: `${first_page_url}&size=${e.target.value}`,
              })
            }
            className="flex h-9 cursor-pointer items-center justify-center rounded-md border border-stroke  bg-inherit bg-white px-1 outline-none dark:border-strokedark dark:bg-boxdark"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>per page</span>
          <button
            disabled={current_page <= 1}
            onClick={() => onChangePagination({ url: prev_page_url })}
            className="disabled:text-gray-400 flex h-9 w-10 items-center justify-center rounded-md border border-stroke bg-white disabled:bg-whiter dark:border-strokedark dark:bg-boxdark"
          >
            <MdArrowBackIosNew />
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (1 <= Number(pageInput) && Number(pageInput) <= last_page) {
                onChangePagination({
                  url:
                    links.find((item) => item.label === pageInput)?.url || '',
                });
              } else {
                setPageInput(String(current_page));
              }
            }}
          >
            <input
              type="text"
              name="pageInput"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={(e) => {
                const value = Number(e.target.value);
                if (1 <= value && value <= last_page) {
                  setPageInput(e.target.value);
                } else {
                  setPageInput(String(current_page));
                }
              }}
              className="h-9 w-9 border-b border-stroke bg-transparent text-center outline-none dark:border-strokedark"
            />
          </form>
          <span>from {last_page}</span>
          <button
            disabled={current_page >= last_page}
            onClick={() => onChangePagination({ url: next_page_url })}
            className="disabled:text-gray-400 flex h-9 w-10 items-center justify-center rounded-md border border-stroke bg-white disabled:bg-whiter dark:border-strokedark dark:bg-boxdark"
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
