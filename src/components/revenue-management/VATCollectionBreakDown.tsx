import React, { useState, useMemo, useEffect } from 'react';
import { FaCalendarAlt, FaChevronDown, FaChevronLeft, FaChevronRight, FaFilter } from 'react-icons/fa'; //   2]

// --- Utility Functions ---
const formatDateForDisplay = (dateString) => { //   3]
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' }; //   4]
    const date = new Date(dateString);
    // Adjust for timezone to avoid off-by-one day errors   5]
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return isNaN(date) ? '' : date.toLocaleDateString('en-US', options); //   6]
};

const getTodayDate = () => new Date().toISOString().slice(0, 10); //   6]
const getDateNDaysAgo = (n) => { //   7]
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10); //   7, 8]
};

// --- Constants ---
const TODAY = getTodayDate(); //   8]
const SEVEN_DAYS_AGO = getDateNDaysAgo(7); //   8]
const THIRTY_DAYS_AGO = getDateNDaysAgo(30); //   8]
const DATE_MODES = ['No Filter', 'Today', 'Last 7 Days', 'Last 30 Days', 'Specific Date', 'Monthly']; //   9]
const SERVICE_TYPES = ['Gas Refill', 'Diesel', 'Petroleum', 'Accessories', 'Electricity']; //   10]
const formatNumber = (num) => new Intl.NumberFormat().format(num); //   10]

// --- New Data Source for VAT Collections (from user's HTML) ---
const vatData = [
    { date: '2025-03-01', type: 'Gas Refill', txnId: 'TXN-2001', userId: 'U-3052', amount: 50000, vatRate: '7.5%', vatCollected: 3750, status: 'Paid' }, //   137, 138, 139]
    { date: '2025-03-01', type: 'Diesel', txnId: 'TXN-2002', userId: 'U-3078', amount: 30000, vatRate: '7.5%', vatCollected: 2250, status: 'Pending' }, //   140, 141, 142]
    { date: '2025-03-02', type: 'Diesel', txnId: 'TXN-2003', userId: 'U-3120', amount: 75000, vatRate: '7.5%', vatCollected: 5625, status: 'Paid' }, //   143, 144, 145]
    { date: '2025-03-02', type: 'Petroleum', txnId: 'TXN-2004', userId: 'U-3155', amount: 40000, vatRate: '7.5%', vatCollected: 3000, status: 'Paid' }, //   147, 148, 149]
    { date: '2025-03-03', type: 'Accessories', txnId: 'TXN-2005', userId: 'U-3190', amount: 25000, vatRate: '7.5%', vatCollected: 1875, status: 'Failed' }, //   150, 151, 152]
    { date: '2025-03-03', type: 'Accessories', txnId: 'TXN-2006', userId: 'U-3218', amount: 100000, vatRate: '7.5%', vatCollected: 7500, status: 'Paid' }, //   153, 154, 155]
    { date: '2025-03-04', type: 'Electricity', txnId: 'TXN-2007', userId: 'U-3255', amount: 45000, vatRate: '7.5%', vatCollected: 3375, status: 'Paid' }, //   156, 157, 158]
    { date: '2025-03-05', type: 'Electricity', txnId: 'TXN-2008', userId: 'U-3301', amount: 60000, vatRate: '7.5%', vatCollected: 4500, status: 'Pending' }, //   160, 161, 162]
    { date: '2025-03-05', type: 'Petroleum', txnId: 'TXN-2009', userId: 'U-3352', amount: 35000, vatRate: '7.5%', vatCollected: 2625, status: 'Paid' }, //   163, 164, 165]
    { date: '2025-03-06', type: 'Gas Refill', txnId: 'TXN-2010', userId: 'U-3400', amount: 28000, vatRate: '7.5%', vatCollected: 2100, status: 'Paid' }, //   166, 167, 168]
    // Add more entries if needed to match the blueprint's data structure and test pagination
    { date: '2025-03-06', type: 'Diesel', txnId: 'TXN-2011', userId: 'U-3415', amount: 90000, vatRate: '7.5%', vatCollected: 6750, status: 'Paid' }, 
    { date: '2025-03-07', type: 'Petroleum', txnId: 'TXN-2012', userId: 'U-3430', amount: 55000, vatRate: '7.5%', vatCollected: 4125, status: 'Paid' },
    { date: '2025-03-07', type: 'Accessories', txnId: 'TXN-2013', userId: 'U-3450', amount: 15000, vatRate: '7.5%', vatCollected: 1125, status: 'Failed' },
    { date: '2025-03-08', type: 'Electricity', txnId: 'TXN-2014', userId: 'U-3475', amount: 70000, vatRate: '7.5%', vatCollected: 5250, status: 'Paid' },
    { date: '2025-03-08', type: 'Gas Refill', txnId: 'TXN-2015', userId: 'U-3490', amount: 32000, vatRate: '7.5%', vatCollected: 2400, status: 'Pending' },
    { date: '2025-03-09', type: 'Diesel', txnId: 'TXN-2016', userId: 'U-3505', amount: 85000, vatRate: '7.5%', vatCollected: 6375, status: 'Paid' },
    { date: '2025-03-09', type: 'Petroleum', txnId: 'TXN-2017', userId: 'U-3520', amount: 48000, vatRate: '7.5%', vatCollected: 3600, status: 'Paid' },
    { date: '2025-03-10', type: 'Accessories', txnId: 'TXN-2018', userId: 'U-3535', amount: 65000, vatRate: '7.5%', vatCollected: 4875, status: 'Paid' },
    { date: '2025-03-10', type: 'Electricity', txnId: 'TXN-2019', userId: 'U-3550', amount: 20000, vatRate: '7.5%', vatCollected: 1500, status: 'Pending' },
    { date: '2025-03-11', type: 'Gas Refill', txnId: 'TXN-2020', userId: 'U-3565', amount: 42000, vatRate: '7.5%', vatCollected: 3150, status: 'Paid' }
];

// --- Component for Status Pill (Reused) ---
const StatusPill = ({ status }) => {
    let colorClass = '';
    switch (status) { //   16]
        case 'Paid': colorClass = 'text-green-600'; break; //   16]
        case 'Pending': colorClass = 'text-yellow-500'; break; //   17]
        case 'Failed': colorClass = 'text-red-600'; break; //   18]
        default: colorClass = 'text-gray-600'; //   18]
    }
    return <span className={colorClass}>{status}</span>; //   18]
};

// --- Custom Calendar Sub-Component (Reused with Personalization) ---
const CalendarPicker = ({ mode, onApplyFilter, selectedDate, selectedRange }) => {
    const [viewDate] = useState(new Date('2025-09-01')); //   19]
    const [tempDate, setTempDate] = useState(selectedDate); //   19]
    const [tempRange, setTempRange] = useState(selectedRange); //   19]

    const isMonthlyMode = mode === 'Monthly'; //   20]
    const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); //   20]
    const days = Array.from({ length: 30 }, (_, i) => i + 1); //   21]
    const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; //   22]

    const getDateString = (day) => `2025-09-${String(day).padStart(2, '0')}`; //   22]

    // **Personalization applied: Remembered date selection for 'Specific Date'**
    useEffect(() => { //   23]
        // Setting default date to 2025-09-27 when in 'Specific Date' mode and no date is selected, 
        // based on your saved preference for the TopUpChargeBreakDown component.
        if (mode === 'Specific Date' && !selectedDate) {
            setTempDate(getDateString(27));
        }
    }, [mode, selectedDate]); //   23]

    const handleDayClick = (day) => { //   24]
        const dateString = getDateString(day); //   24]
        if (isMonthlyMode) { //   25]
            if (!tempRange.start || tempRange.end) {
                setTempRange({ start: dateString, end: '' }); //   25]
            } else if (dateString > tempRange.start) { //   26]
                setTempRange(prev => ({ ...prev, end: dateString })); //   26]
            } else {
                setTempRange({ start: dateString, end: '' }); //   27]
            }
        } else {
            setTempDate(dateString); //   28]
        }
    }; //   28]
    
    const applyFilter = () => { //   29]
        if (isMonthlyMode) {
            onApplyFilter(tempRange.start, tempRange.end); //   29]
        } else { //   30]
            onApplyFilter(tempDate);
        }
    }; //   30]

    return ( //   31]
        <div className="p-4 w-full"> {/*   31] */}
            <div className="flex justify-between items-center mb-4 text-gray-700 font-semibold"> {/*   31] */}
                <FaChevronLeft className="cursor-pointer hover:text-gray-900" /> {/*   31] */}
                <span>{monthName}</span> {/*   31] */}
                <FaChevronRight className="cursor-pointer hover:text-gray-900" /> {/*   31] */}
            </div>
     
            <div className="grid grid-cols-7 text-xs text-center text-gray-500 mb-2"> {/*   32] */}
                {DAYS_OF_WEEK.map(day => <span key={day}>{day}</span>)} {/*   32] */}
            </div>

            <div className="grid grid-cols-7 text-sm text-center"> {/*   32] */}
                <span className="h-8"></span> 
          
                {days.map(day => { //   33]
                    const dateString = getDateString(day); //   33]
                    const isSelectedSpecific = !isMonthlyMode && dateString === tempDate; //   33]
                    const isRangeStart = isMonthlyMode && dateString === tempRange.start; //   33]
               
                    const isRangeEnd = isMonthlyMode && dateString === tempRange.end; //   34]
                    const isInRange = isMonthlyMode && tempRange.start && tempRange.end && dateString > tempRange.start && dateString < tempRange.end; //   35]
                    const dayClasses = `h-8 w-full flex items-center justify-center rounded-full cursor-pointer transition 
                        ${isSelectedSpecific || //   36]
                        isRangeEnd ? 'bg-yellow-500 text-gray-800 font-bold' : ''} //   37]
                        ${isRangeStart ? //   37]
                        'bg-yellow-400 font-bold text-gray-800 rounded-r-none' : ''} //   38]
                        ${isInRange ? //   38]
                        'bg-yellow-200 text-gray-800 rounded-none' : ''} //   39]
                        ${!isSelectedSpecific && !isRangeStart && !isRangeEnd && !isInRange ? //   39]
                        'hover:bg-gray-100 text-gray-700' : ''} //   40]
                    `; //   40]
                    return ( //   41]
                        <div key={day} className="py-1"> {/*   41] */}
                            <span className={dayClasses} onClick={() => handleDayClick(day)}>{day}</span> {/*   41] */}
                        </div>
                 
                    ); //   42]
                })}
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100"> {/*   42] */}
                <button 
                    className="px-6 py-2 bg-yellow-500 text-gray-800 font-bold rounded-lg shadow-md hover:bg-yellow-600 transition disabled:opacity-50"
                    
                    onClick={applyFilter} //   43]
                    disabled={(isMonthlyMode && (!tempRange.start || !tempRange.end)) || //   43]
                    (!isMonthlyMode && !tempDate)} //   44]
                >
                    Apply Filter
                </button>
            </div>
        </div>
    ); //   45]
};

// --- Main VATCollectionBreakDown Component ---
const VATCollectionBreakDown = () => {
    // --- State Management (Blueprint Reused) ---
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false); //   45]
    const [dateMode, setDateMode] = useState('No Filter'); //   46]
    const [filterDate, setFilterDate] = useState(''); //   46]
    const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' }); //   47]
    const [serviceFilterOpen, setServiceFilterOpen] = useState(false); //   47]
    const [selectedServices, setSelectedServices] = useState([]); //   47]
    const [currentPage, setCurrentPage] = useState(1); //   48]
    const itemsPerPage = 8; //   48]

    // --- Display Logic (Blueprint Reused) ---
    const dateDisplayValue = useMemo(() => { //   49]
        switch (dateMode) { //   49]
            case 'No Filter': return 'All Transactions'; //   49]
            case 'Today': return formatDateForDisplay(TODAY); //   49]
            case 'Last 7 Days': return `Since ${formatDateForDisplay(SEVEN_DAYS_AGO)}`; //   49]
            case 'Last 30 Days': return `Since ${formatDateForDisplay(THIRTY_DAYS_AGO)}`; //   49]
            case 'Specific Date': return filterDate ? formatDateForDisplay(filterDate) : 'Select Date'; //   49]
            case 'Monthly':
                if (filterDateRange.start && filterDateRange.end) {
                    return `${formatDateForDisplay(filterDateRange.start)} - ${formatDateForDisplay(filterDateRange.end)}`;
                }
       
                return 'Select Range'; //   50]
            default: return 'All Transactions'; //   50]
        }
    }, [dateMode, filterDate, filterDateRange]); //   50]

    // --- Event Handlers (Blueprint Reused) ---
    const handleDateModeChange = (mode) => { //   51]
        setDateMode(mode); //   51]
        setCurrentPage(1); //   52]
        if (mode !== 'Specific Date' && mode !== 'Monthly') {
            setDateDropdownOpen(false); //   53]
        }
    }; //   53]

    const handleApplySpecificDateFilter = (date) => { //   53]
        setFilterDate(date); //   54]
        setDateDropdownOpen(false); //   54]
    }; //   54]

    const handleApplyMonthlyFilter = (start, end) => { //   54]
        setFilterDateRange({ start, end }); //   55]
        setDateDropdownOpen(false); //   55]
    }; //   55]
    
    const handleServiceToggle = (service) => { //   55]
        setSelectedServices(prev => //   55]
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service] //   56]
        );
    }; //   56]

    const handleApplyServiceFilters = () => { //   56]
        setServiceFilterOpen(false); //   56]
        setCurrentPage(1); //   56]
    }; //   56]

    // --- Filtering Logic (Blueprint Reused, applied to vatData) ---
    const filteredData = useMemo(() => { //   57]
        return vatData.filter(item => { // Changed from serviceChargeData to vatData
            const serviceMatch = selectedServices.length === 0 || selectedServices.includes(item.type); //   57]
            if (!serviceMatch) return false; //   57]

            switch (dateMode) { //   57]
                case 'No Filter': return true; //   58]
        
                case 'Today': return item.date === TODAY; //   58]
                case 'Last 7 Days': return item.date >= SEVEN_DAYS_AGO; //   58]
                case 'Last 30 Days': return item.date >= THIRTY_DAYS_AGO; //   58]
                case 'Specific Date': return filterDate && item.date === filterDate; //   58]
                case 'Monthly': //   59]
                    if (!filterDateRange.start || !filterDateRange.end) return true; //   59]
                    return item.date >= filterDateRange.start && item.date <= filterDateRange.end; //   59]
                default: return true; //   59]
            }
        });
    }, [selectedServices, dateMode, filterDate, filterDateRange]); //   59]

    // --- Pagination & Summary Logic (Blueprint Reused, adjusted for vatCollected) ---
    const totalEntries = filteredData.length; //   60]
    const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1; //   61]
    
    const currentTableData = useMemo(() => { //   61]
        const firstPageIndex = (currentPage - 1) * itemsPerPage; //   61]
        return filteredData.slice(firstPageIndex, firstPageIndex + itemsPerPage); //   61]
    }, [currentPage, filteredData, itemsPerPage]); //   61]

    const totalVATCollected = useMemo(() => {
        // Calculate total VAT only from the data on the current page.
        return currentTableData
            .filter(item => item.status !== 'Failed') 
            .reduce((sum, item) => sum + item.vatCollected, 0);
    }, [currentTableData]);

    // --- Component Render (Blueprint Reused and Adapted) ---
    return ( //   63]
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">  
            <div className="container mx-auto">  
                {/* Header and Controls */}
                <div className="flex justify-between items-center mb-4">  
                    <div>
  
                        <h2 className="text-lg font-semibold text-gray-800">VAT Collection Report</h2> {/* Title changed */}
                        <p className="text-sm text-gray-600">Summary of VAT applied to transactions, including tax rates and total VAT collected per service.</p> {/* Subtitle changed */}
                    </div>
                
     
                    <div className="flex items-center space-x-2"> {/*   65] */}
                        {/* Date Picker (Reused) */}
                        <div className="relative"> {/*   65] */}
                     
                            <div className="flex items-center border rounded-md overflow-hidden bg-white"> {/*   66] */}
                                <div className="pl-3 pr-2 text-gray-500"><FaCalendarAlt /></div> {/*   66] */}
                                <input 
                  
                                    type="text" //   67]
                                    className="py-2 text-sm text-gray-700 focus:outline-none cursor-pointer w-auto min-w-[150px]" //   67]
                                    value={dateDisplayValue} //   67]
 
                                    readOnly //   68]
                                    onClick={() => setDateDropdownOpen(!dateDropdownOpen)} //   68]
                          
                                /> {/*   69] */}
                                <button 
                                    type="button" 
                        
                                    className="w-24 px-3 py-2 border-l border-gray-300 text-sm text-gray-700 bg-white focus:outline-none flex items-center gap-1 justify-center" //   70]
                                    onClick={() => setDateDropdownOpen(!dateDropdownOpen)} //   70]
                                >
      
                                    <span>{dateMode === 'No Filter' ? //   71]
                                'All' : dateMode.split(' ')[0]}</span> {/*   72] */}
                                    <FaChevronDown className="text-xs" /> {/*   72] */}
                                </button>
                           
                            </div> {/*   73] */}
                            
                            {dateDropdownOpen && ( //   73]
                                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl w-[450px] z-40 flex overflow-hidden"> 
                                    <div className="w-1/3 p-2 border-r border-gray-200"> 
                                        {DATE_MODES.map(mode => ( 
                 
                                            <button 
                                                key={mode} //   75]
                       
                                                 type="button" //   76]
                                                 onClick={() => handleDateModeChange(mode)} //   76]
                       
                                                className={`w-full text-left px-3 py-3 rounded-lg text-sm transition ${dateMode === mode ? 'bg-yellow-100 font-semibold text-gray-800' : 'hover:bg-gray-50 text-gray-700'}`} //   77]
                                            >
               
                                                {mode} {/*   78] */}
                                            </button>
                       
                                        ))} {/*   79] */}
                                    </div>
                                    <div className="w-2/3"> {/*   79] */}
          
                                        {(dateMode === 'Specific Date' || //   80]
                                        dateMode === 'Monthly') ? ( //   81]
                                            <CalendarPicker 
                                                mode={dateMode}
   
                                                 selectedDate={filterDate} //   82]
                                                selectedRange={filterDateRange}
       
                                                 onApplyFilter={dateMode === 'Specific Date' ? handleApplySpecificDateFilter : handleApplyMonthlyFilter} //   83]
                                            />
        
                                        ) : ( //   84]
                                            <div className="p-8 text-center text-gray-500 flex flex-col justify-center items-center h-full"> {/*   84] */}
              
                                                <FaCalendarAlt size="3em" className="mb-4"/> {/*   85] */}
                                                <p className="font-semibold text-gray-700">Displaying transactions.</p> {/*   85] */}
             
                                                <p className="text-sm">Select 'Specific Date' or 'Monthly' to view the calendar.</p> {/*   86] */}
                                            </div>
            
                                        )} {/*   87] */}
                                    </div>
                                </div>
    
                            )} {/*   88] */}
                        </div>
                        
                        {/* Service Type Filter (Reused) 
                        */} {/*   89] */}
                        <div className="relative"> {/*   89] */}
                            <button 
                                onClick={() => setServiceFilterOpen(!serviceFilterOpen)} 
           
                                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg" //   90]
                            >
                                <FaFilter /> Service Type
         
                            </button> {/*   91] */}
                            
                            {serviceFilterOpen && ( //   91]
                       
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg p-4 z-30"> {/*   92] */}
                                    <h3 className="text-gray-700 font-medium mb-3">Select Service Type</h3> {/*   92] */}
                                    <div className="grid grid-cols-2 gap-2"> {/*   93] */}
                                        {SERVICE_TYPES.map(service => ( //   93]
                                            <button 
             
                                                 key={service} //   94]
                                                 onClick={() => handleServiceToggle(service)} //   94]
              
                                                className={`px-3 py-2 rounded-lg text-sm ${ //   95]
                                                    selectedServices.includes(service) ? //   95]
                                                'bg-yellow-400 text-gray-800 font-semibold' : 'border text-gray-700' //   96]
                                                }`}
                                            >
   
                                                {service} {/*   97] */}
                                            </button>
           
                                        ))} {/*   98] */}
                                    </div>
                                   
                                    <div className="mt-4 text-center"> {/*   99] */}
                                        <button 
                                            onClick={handleApplyServiceFilters} 
           
                                            className="px-4 py-2 bg-yellow-400 rounded-lg text-gray-800 font-semibold hover:bg-yellow-500 transition" //   100]
                                        >
                    
                                            Apply {/*   101] */}
                                        </button>
                                    
                                    </div> {/*   102] */}
                                </div>
                            )}
                        </div>
                
                    </div> {/*   103] */}
                </div>
                
                {/* Data Table */}
                <div className="overflow-x-auto"> {/*   103] */}
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"> {/*   103] */}
  
                        <thead className="bg-gray-200 text-left text-gray-600 text-sm"> {/*   104] */}
                            <tr>
                                <th className="p-3">Date</th> {/*   132] */}
             
                                <th className="p-3">Service Type</th> {/*   133] */}
                                <th className="p-3">Transaction ID</th> {/*   133] */}
                                <th className="p-3">User ID</th> {/*   133] */}
           
                                <th className="p-3">Amount (₦)</th> {/*   134] */}
                                <th className="p-3">VAT Rate (%)</th> {/* New column based on HTML */}
                                <th className="p-3">VAT Collected (₦)</th> {/* New column based on HTML   135] */}
                                <th className="p-3">Status</th> {/*   135] */}
        
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm"> {/*   136] */}
                            {currentTableData.length > 0 ? ( //   108]
                                <>
                                    {currentTableData.map((row, index) => ( //   108]
                           
                                        <tr key={index} className="border-t hover:bg-gray-100"> {/*   109] */}
                                            <td className="p-3">{formatDateForDisplay(row.date)}</td> {/*   109] */}
                                       
                                            <td className="p-3">{row.type}</td> {/*   110] */}
                                            <td className="p-3">{row.txnId}</td> {/*   110] */}
                                            <td className="p-3">{row.userId}</td> {/*   110] */}
    
                                            <td className="p-3">{formatNumber(row.amount)}</td> {/*   111] */}
                                            <td className="p-3">{row.vatRate}</td> {/* VAT Rate */}
                                            <td className="p-3">{formatNumber(row.vatCollected)}</td> {/* VAT Collected */}
              
                                            <td className="p-3"><StatusPill status={row.status} /></td> {/*   112] */}
                                        </tr>
                           
                                    ))} {/*   113] */}
                                    <tr className="border-t bg-gray-50"> {/*   113] */}
                                        <td className="p-3 font-bold" colSpan="6">Total VAT Collected (from this page)</td> {/* Column span adjusted */}
    
                                        <td className="p-3 font-bold">₦{formatNumber(totalVATCollected)}</td> {/* VAT total */}
                                        <td className="p-3"></td> {/*   115] */}
                     
                                    </tr>
                                </>
                            ) : (
                       
                                <tr className="border-t"> {/*   116] */}
                                    <td colSpan="8" className="text-center p-6 text-gray-500">No transactions found for the selected filters.</td> {/* Column span adjusted */}
                                </tr>
            
                            )} {/*   117] */}
                        </tbody>
                    </table>
                </div>
                
        
                {/* Pagination (Reused) */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t"> {/*   118] */}
                    <span className="text-sm text-gray-600">Total entries: <span className="font-bold">{totalEntries}</span></span> {/*   118] */}
                    
                    <div className="flex items-center space-x-1"> {/*   119] */}
                        <button 
                            className={`px-3 py-1 flex items-center space-x-1 text-sm ${currentPage === 1 ? //   119]
                            'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`} //   120]
                            disabled={currentPage === 1} //   120]
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} //   120]
                        >
       
                            <FaChevronLeft /> <span>Previous</span> {/*   121] */}
                        </button>
                        
                        {/* Page Numbers */}
  
                        <div className="flex items-center space-x-1"> {/*   122] */}
                            {[...Array(totalPages)].map((_, i) => { //   122]
                                const pageNum = i + 1; //   122]
       
                                return ( //   123]
                                    <button 
                                     
                                         key={pageNum} //   124]
                                         onClick={() => setCurrentPage(pageNum)} //   124]
                                        className={`px-3 py-1 text-sm font-bold rounded-full ${ //   124]
          
                                        pageNum === currentPage ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-100' //   125]
                                        }`}
                  
                                    > {/*   126] */}
                                        {pageNum}
                                    </button>
      
                                ); 
                            })} 
                        </div>

                        <button 
                            className={`px-3 py-1 flex items-center space-x-1 text-sm ${currentPage === totalPages ?
                             'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`}
                             disabled={currentPage === totalPages}
                             onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                        >
       
                            <span>Next</span> <FaChevronRight /> 
                        </button>
                    </div>
                </div>
            </div>
     
        </div>
    );
};

export default VATCollectionBreakDown;