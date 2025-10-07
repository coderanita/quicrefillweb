import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaCalendar, FaChevronDown, FaFilter, FaDownload, FaArrowLeft, FaSearch } from 'react-icons/fa';
import flatpickr from 'flatpickr';

interface CustomButtonProps {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface FilterCategory {
  name: string;
  options: string[];
}

interface PageHeaderWithFiltersProps {
  title: string;
  filterTitle?:string;
  breadcrumbs: BreadcrumbItem[];
  filterCategories?: FilterCategory[];
  onDateChange?: (mode: string, startDate: Date | null, endDate: Date | null) => void;
  onFilterChange?: (filters: { [key: string]: string[] }) => void;
  onExportClick?: () => void;
  onSearchChange?: (query: string) => void;
  showDateSelector?: boolean;
  showFilterDropdown?: boolean;
  showExportButton?: boolean;
  showBackButton?: boolean;
  showSearchBox?: boolean;
  onBackClick?: () => void;
  customButton?: CustomButtonProps;
}

const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <div className="flex flex-wrap items-center space-x-0.5 text-gray-600 text-xs mt-1">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href && index !== items.length - 1 ? (
            <a href={item.href} className="hover:text-yellow-500 text-xs">{item.label}</a>
          ) : (
            <span className="text-gray-800 font-semibold text-xs">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-0.5">{'>'}</span>}
        </div>
      ))}
    </div>
  );
};

// 🔹 SearchBox Component
const SearchBox = ({ onSearchChange }: { onSearchChange?: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  return (
    <div className="relative w-40">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="bg-white w-40 px-2 py-1 text-xs border border-gray-300 rounded-md bg-gray-100 focus:outline-none pr-10"
      />
      <span className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
        <FaSearch />
      </span>
    </div>
  );
};

const DateSelector = ({ onDateChange }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState('Today');
  const [dateValue, setDateValue] = useState('');
  const [selectedDatesInternal, setSelectedDatesInternal] = useState<Date[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const fpInstance = useRef<any>(null);
  const lastReportedToday = useRef<Date | null>(null);

  const formatDate = (date: Date | null, includeYear: boolean = true) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
    if (includeYear) options.year = 'numeric';
    return date.toLocaleDateString('en-GB', options);
  };

  const setupFlatpickr = useCallback(() => {
    if (fpInstance.current) {
      fpInstance.current.destroy();
      fpInstance.current = null;
    }

    if (!dateInputRef.current) return;

    let config: flatpickr.Options = {
      dateFormat: 'd M, Y',
      onClose: (selectedDates, dateStr) => {
        let newStartDate: Date | null = null;
        let newEndDate: Date | null = null;

        if (selectedDates.length > 0) {
          if (mode === 'Specific Date') {
            newStartDate = selectedDates[0];
            newEndDate = selectedDates[0];
          } else if (mode === 'Monthly' && selectedDates.length === 2) {
            newStartDate = selectedDates[0];
            newEndDate = selectedDates[1];
          }
        }

        const currentStartDate = selectedDatesInternal[0] || null;
        const currentEndDate = (mode === 'Monthly' && selectedDatesInternal.length === 2) ? selectedDatesInternal[1] : currentStartDate;

        const startDateChanged = (newStartDate?.getTime() !== currentStartDate?.getTime());
        const endDateChanged = (newEndDate?.getTime() !== currentEndDate?.getTime());

        if (startDateChanged || endDateChanged) {
          if (selectedDates.length > 0) {
            if (mode === 'Specific Date') {
              setDateValue(formatDate(newStartDate));
              setSelectedDatesInternal([newStartDate]);
              onDateChange('Specific Date', newStartDate, newEndDate);
            } else if (mode === 'Monthly' && selectedDates.length === 2) {
              setDateValue(`${formatDate(newStartDate)} - ${formatDate(newEndDate)}`);
              setSelectedDatesInternal([newStartDate, newEndDate]);
              onDateChange('Monthly', newStartDate, newEndDate);
            }
          } else {
            if (currentStartDate !== null || currentEndDate !== null) {
              setDateValue('');
              setSelectedDatesInternal([]);
              onDateChange(mode, null, null);
            }
          }
        }
        setShowDropdown(false);
      },
    };

    if (mode === 'Specific Date') {
      config.defaultDate = selectedDatesInternal[0] || null;
    } else if (mode === 'Monthly') {
      config.mode = 'range';
      config.defaultDate = selectedDatesInternal;
    }

    fpInstance.current = flatpickr(dateInputRef.current, config);
  }, [mode, selectedDatesInternal, onDateChange]);

  useEffect(() => {
    if (mode === 'Today') {
      const today = new Date();
      const hasTodayDateChanged = !lastReportedToday.current ||
        lastReportedToday.current.toDateString() !== today.toDateString();

      setDateValue(formatDate(today));

      if (hasTodayDateChanged) {
        onDateChange('Today', today, today);
        lastReportedToday.current = today;
      }

      if (fpInstance.current) {
        fpInstance.current.destroy();
        fpInstance.current = null;
      }
    } else {
      setupFlatpickr();
      lastReportedToday.current = null;
    }

    return () => {
      if (fpInstance.current) {
        fpInstance.current.destroy();
        fpInstance.current = null;
      }
    };
  }, [mode, onDateChange, setupFlatpickr]);

  const handleInputClick = () => {
    if (fpInstance.current && (mode === 'Specific Date' || mode === 'Monthly')) {
      fpInstance.current.open();
    }
  };

  const handleModeChange = (newMode: string) => {
    if (newMode === mode) {
      if (newMode === 'Specific Date' || newMode === 'Monthly') {
        setupFlatpickr();
        fpInstance.current?.open();
      }
    } else {
      setMode(newMode);
      setDateValue('');
      setSelectedDatesInternal([]);

      if (newMode === 'Specific Date' || newMode === 'Monthly') {
        setTimeout(() => {
          fpInstance.current?.open();
        }, 0);
      }
    }
    setShowDropdown(false);
  };

  return (
    <div className="flex gap-2 items-center flex-nowrap">
      <div className="relative w-36">
        <input
          type="text"
          ref={dateInputRef}
          value={dateValue}
          readOnly
          className="pl-8 pr-2 py-1 text-xs border rounded-md w-full focus:outline-none cursor-pointer text-gray-700"
          onClick={handleInputClick}
        />
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          <FaCalendar />
        </span>
      </div>

      <div className="relative text-xs">
        <button
          className="px-4 py-1 border rounded-md bg-white text-gray-700 focus:outline-none flex items-center"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {mode} <FaChevronDown className="ml-1 text-gray-600 hover:text-amber-500" />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-20">
            {['Today', 'Specific Date', 'Monthly'].map(option => (
              <button
                key={option}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={() => handleModeChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DynamicFilterDropdown = ({ filterCategories, onFilterChange,filterTitle }) => {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({});
  const [title, setTitle] = useState(filterTitle);

  const toggleOption = (filterName: string, option: string) => {
    const currentOptions = selectedOptions[filterName] || [];
    if (currentOptions.includes(option)) {
      setSelectedOptions({
        ...selectedOptions,
        [filterName]: currentOptions.filter(item => item !== option),
      });
    } else {
      setSelectedOptions({
        ...selectedOptions,
        [filterName]: [...currentOptions, option],
      });
    }
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedOptions);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 px-2 py-1 bg-white border rounded-lg text-xs">
        <FaFilter className="sm" /> {title}
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
          <div className="relative w-11/12 max-w-lg bg-white border rounded-lg shadow-lg p-4 max-h-[80vh] overflow-auto text-xs">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setOpen(false)}>X</button>
            <h3 className="text-gray-700 font-medium mb-3">Select Filter</h3>

            <div className="grid grid-cols-3 gap-2">
              {filterCategories.map(category => (
                <button
                  key={category.name}
                  onClick={() => setSelectedFilter(category.name)}
                  className={`px-3 py-2 rounded-lg text-xs ${selectedFilter === category.name ? 'bg-yellow-400' : 'border'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {filterCategories.map(category => (
              selectedFilter === category.name && (
                <div key={category.name} className="mt-3">
                  <h3 className="text-gray-700 font-medium mb-2">Select {category.name}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {category.options.map(option => (
                      <button
                        key={option}
                        onClick={() => toggleOption(category.name, option)}
                        className={`px-3 py-2 rounded-lg text-xs ${selectedOptions[category.name]?.includes(option) ? 'bg-yellow-400' : 'border'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}

            <div className="mt-4 text-center">
              <button onClick={handleApplyFilters} className="px-4 py-2 bg-yellow-400 rounded-lg text-xs">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PageHeaderWithFilters: React.FC<PageHeaderWithFiltersProps> = ({
  title,
  breadcrumbs,
  filterTitle='Filter',
  filterCategories = [],
  onDateChange,
  onFilterChange,
  onExportClick,
  onSearchChange,
  showDateSelector = true,
  showFilterDropdown = true,
  showExportButton = true,
  showBackButton = false,
  showSearchBox = false,   // 🔹 default hidden
  onBackClick = () => { },
  customButton
}) => {
  return (
    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-center mb-4 p-2">
      <div className="w-full md:w-auto flex items-center">
        {showBackButton && (
          <button onClick={onBackClick} className="text-lg text-gray-700 bg-white pl-2 pr-2 border p-1 rounded-md mr-2">
            <FaArrowLeft />
          </button>
        )}
        <div>
          <h1 className="text-lg font-bold text-gray-800">{title}</h1>
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 w-full md:w-auto">

        {customButton && (
          customButton.href ? (
            <a
              href={customButton.href}
              className={`cursor-pointer bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded text-sm flex items-center ${customButton.className || ''}`}
            >
              {customButton.icon && <span className="mr-2">{customButton.icon}</span>}
              {customButton.label}
            </a>
          ) : (
            <button
              onClick={customButton.onClick}
              className={`cursor-pointer bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded text-sm flex items-center ${customButton.className || ''}`}
            >
              {customButton.icon && <span className="mr-2">{customButton.icon}</span>}
              {customButton.label}
            </button>
          )
        )}

        {showSearchBox && <SearchBox onSearchChange={onSearchChange} />}

        {showDateSelector && (<DateSelector onDateChange={onDateChange} />)}

        {showFilterDropdown && filterCategories.length > 0 && (
          <DynamicFilterDropdown filterCategories={filterCategories} onFilterChange={onFilterChange} filterTitle={filterTitle} />
        )}

        {showExportButton && (
          <button
            className="bg-white border border-gray-300 rounded px-2 py-1 flex items-center text-xs"
            onClick={onExportClick}
          >
            <FaDownload className="mr-2" /> Export
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeaderWithFilters;
