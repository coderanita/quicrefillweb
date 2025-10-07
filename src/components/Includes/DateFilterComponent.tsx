import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { FaCalendarAlt, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- Utility Functions & Constants (Specific to Date Filtering) ---
const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date) ? '' : date.toLocaleDateString('en-US', options);
};

const getTodayDate = () => new Date().toISOString().slice(0, 10);
const getDateNDaysAgo = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
};

const TODAY = getTodayDate();
const SEVEN_DAYS_AGO = getDateNDaysAgo(7);
const THIRTY_DAYS_AGO = getDateNDaysAgo(30);
const DATE_MODES = ['No Filter', 'Today', 'Last 7 Days', 'Last 30 Days', 'Specific Date', 'Monthly'];

// --- Calendar Picker Sub-Component (Fully Dynamic) ---
const CalendarPicker = ({ mode, onApplyFilter, selectedDate, selectedRange }) => {
    const [viewDate, setViewDate] = useState(new Date()); 
    const [tempDate, setTempDate] = useState(selectedDate);
    const [tempRange, setTempRange] = useState(selectedRange);

    const isMonthlyMode = mode === 'Monthly';
    const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getCalendarDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const firstDayOfMonth = new Date(year, month, 1);
        const firstDayOfWeek = firstDayOfMonth.getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const calendarDays = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            calendarDays.push(null);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(day);
        }
        return calendarDays;
    };
    
    const getDateString = (day) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth() + 1;
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const handleMonthChange = (offset) => {
        setViewDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const handleDayClick = (day) => {
        if (!day) return;
        const dateString = getDateString(day);

        if (isMonthlyMode) {
            if (!tempRange.start || tempRange.end || dateString < tempRange.start) {
                setTempRange({ start: dateString, end: '' });
            } else {
                setTempRange(prev => ({ ...prev, end: dateString }));
            }
        } else {
            setTempDate(dateString);
        }
    };
    
    const applyFilter = () => {
        if (isMonthlyMode) {
            onApplyFilter(tempRange.start, tempRange.end);
        } else {
            onApplyFilter(tempDate);
        }
    };

    const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);
    
    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-4 text-gray-700 font-semibold">
                <FaChevronLeft 
                    className="cursor-pointer hover:text-gray-900" 
                    onClick={() => handleMonthChange(-1)} 
                />
                <span>{monthName}</span>
                <FaChevronRight 
                    className="cursor-pointer hover:text-gray-900" 
                    onClick={() => handleMonthChange(1)} 
                />
            </div>
            
            <div className="grid grid-cols-7 text-xs text-center text-gray-500 mb-2">
                {DAYS_OF_WEEK.map(day => <span key={day}>{day}</span>)}
            </div>

            <div className="grid grid-cols-7 text-sm text-center">
                {calendarDays.map((day, index) => {
                    if (day === null) {
                        return <span key={`pad-${index}`} className="h-8"></span>;
                    }

                    const dateString = getDateString(day);
                    const isSelectedSpecific = !isMonthlyMode && dateString === tempDate;
                    const isRangeStart = isMonthlyMode && dateString === tempRange.start;
                    const isRangeEnd = isMonthlyMode && dateString === tempRange.end;
                    const isInRange = isMonthlyMode && dateString > tempRange.start && dateString < tempRange.end && tempRange.end;
                    
                    const isToday = dateString === TODAY;

                    let dayClasses = `h-8 w-full flex items-center justify-center cursor-pointer transition 
                        ${isToday && !isSelectedSpecific && !isRangeStart ? 'border border-gray-400 rounded-full' : ''}
                        ${!isToday ? 'hover:bg-gray-100 text-gray-700' : ''}
                    `;
                    
                    if (isSelectedSpecific || isRangeEnd) {
                        dayClasses = `h-8 w-full flex items-center justify-center rounded-full cursor-pointer transition bg-yellow-500 text-gray-800 font-bold`;
                    } else if (isRangeStart) {
                        dayClasses = `h-8 w-full flex items-center justify-center font-bold text-gray-800 cursor-pointer transition bg-yellow-400 rounded-l-full`;
                    } else if (isInRange) {
                        dayClasses = `h-8 w-full flex items-center justify-center text-gray-800 cursor-pointer transition bg-yellow-200 rounded-none`;
                    } else if (isToday) {
                        dayClasses += ' text-gray-800 font-medium';
                    }

                    return (
                        <div key={dateString} className="py-1">
                            <span 
                                className={dayClasses}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                <button 
                    className="px-6 py-2 bg-yellow-500 text-gray-800 font-bold rounded-lg shadow-md hover:bg-yellow-600 transition disabled:opacity-50"
                    onClick={applyFilter}
                    disabled={isMonthlyMode && (!tempRange.start || !tempRange.end)}
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
};


// --- DateFilterComponent (The main export) ---
const DateFilterComponent = ({ onDateFilterChange }) => {
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
    const [dateMode, setDateMode] = useState('No Filter');
    const [filterDate, setFilterDate] = useState(TODAY);
    const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });

    // Inform parent component about the change whenever states update
    useEffect(() => {
        onDateFilterChange(dateMode, filterDate, filterDateRange);
    }, [dateMode, filterDate, filterDateRange, onDateFilterChange]);

    const dateDisplayValue = useMemo(() => {
        switch (dateMode) {
            case 'No Filter': return 'All Transfers';
            case 'Today': return formatDateForDisplay(TODAY);
            case 'Last 7 Days': return `Since ${formatDateForDisplay(SEVEN_DAYS_AGO)}`;
            case 'Last 30 Days': return `Since ${formatDateForDisplay(THIRTY_DAYS_AGO)}`;
            case 'Specific Date': return formatDateForDisplay(filterDate);
            case 'Monthly':
                 if (filterDateRange.start && filterDateRange.end) {
                    return `${formatDateForDisplay(filterDateRange.start)} - ${formatDateForDisplay(filterDateRange.end)}`;
                }
                return 'Select Range'; 
            default: return 'All Transfers';
        }
    }, [dateMode, filterDate, filterDateRange]);

    const handleDateModeChange = (mode) => {
        setDateMode(mode);
        // Clear specific/monthly settings when changing to a quick mode
        if (mode === 'No Filter' || mode === 'Today' || mode === 'Last 7 Days' || mode === 'Last 30 Days') {
            setFilterDate(TODAY);
            setFilterDateRange({ start: '', end: '' });
            setDateDropdownOpen(false);
        } else {
            setDateDropdownOpen(true);
        }
    };
    
    const handleApplySpecificDateFilter = (date) => {
        setFilterDate(date);
        setDateMode('Specific Date');
        setDateDropdownOpen(false);
    };
    
    const handleApplyMonthlyFilter = (start, end) => {
        setFilterDateRange({ start, end });
        setDateMode('Monthly');
        setDateDropdownOpen(false);
    };

    return (
        <div className="date-picker-wrapper relative">
            <div className="flex items-center border rounded-md overflow-hidden bg-white">
                <div className="pl-3 pr-2 text-gray-500">
                    <FaCalendarAlt />
                </div>
                <input 
                    type="text" 
                    className="datePicker py-2 text-sm text-gray-700 focus:outline-none cursor-pointer w-auto min-w-[150px]"
                    value={dateDisplayValue} 
                    readOnly 
                />

                <button 
                    type="button" 
                    className="w-24 px-3 py-2 border-l border-gray-300 text-sm text-gray-700 bg-white focus:outline-none flex items-center gap-1 justify-center"
                    onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                >
                    <span className="mode-label">{dateMode === 'No Filter' ? 'All' : dateMode.split(' ')[0]}</span>
                    <FaChevronDown className="text-xs" />
                </button>
            </div>
            
            {/* Full Date Picker/Filter Container */}
            {dateDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl w-[450px] z-40 flex overflow-hidden">
                    {/* Left Panel: Mode Selection */}
                    <div className="w-1/3 p-2 border-r border-gray-200">
                        {DATE_MODES.map(mode => (
                            <button 
                                key={mode} 
                                type="button"
                                onClick={() => handleDateModeChange(mode)}
                                className={`w-full text-left px-3 py-3 rounded-lg text-sm transition ${dateMode === mode ?
                                'bg-yellow-100 font-semibold text-gray-800' : 'hover:bg-gray-50 text-gray-700'}`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>

                    {/* Right Panel: Calendar/Instructions */}
                    <div className="w-2/3">
                        {(dateMode === 'Specific Date' || dateMode === 'Monthly') ?
                        (
                            <CalendarPicker 
                                mode={dateMode}
                                selectedDate={filterDate}
                                selectedRange={filterDateRange}
                                onApplyFilter={dateMode === 'Specific Date' ? handleApplySpecificDateFilter : handleApplyMonthlyFilter}
                            />
                        ) : (
                            <div className="p-8 text-center text-gray-500 flex flex-col justify-center items-center h-full">
                                <FaCalendarAlt size="3em" className="mb-4"/>
                                <p className="font-semibold text-gray-700">Displaying all transactions.</p>
                                <p className="text-sm">Select 'Specific Date' or 'Monthly' to view the calendar.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateFilterComponent;