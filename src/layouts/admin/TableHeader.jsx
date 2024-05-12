import { memo } from 'react';
import { Link } from 'react-router-dom';

const TableHeader = ({
  navTitles,
  currentTab,
  setCurrentTab,
  isExport = false,
  isCreate = true,
  handleOpenAddModal,
}) => {
  return (
    <div className="flex justify-between mb-5 border-b border-[#eee] dark:border-strokedark">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
        {navTitles?.map((item, index) => (
          <li key={index} className="me-2">
            <button
              className={`inline-block p-4 rounded-t-lg text-title-xsm ${
                index === currentTab &&
                'text-primary border-b-2 border-b-primary'
              }`}
              onClick={() => setCurrentTab(index)}
            >
              {item}
            </button>
          </li>
        ))}
        {isCreate && (
          <li className="me-2">
            <button
              className="inline-flex items-center justify-center gap-1 p-4 rounded-t-lg text-title-xsm text-meta-3"
              onClick={handleOpenAddModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Thêm mới
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default memo(TableHeader);
