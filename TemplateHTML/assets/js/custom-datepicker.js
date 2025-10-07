
        document.addEventListener('DOMContentLoaded', function () {

            // Helper function to get day suffix (st, nd, rd, th)
            function getDaySuffix(day) {
                if (day > 3 && day < 21) return 'th'; // covers 4th to 20th
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            }

            // Custom formatting function that returns the desired string
            function customRangeFormatter(selectedDates, dateStr, instance) {
                if (selectedDates.length === 2) {
                    const startDay = selectedDates[0].getDate();
                    const startMonth = selectedDates[0].toLocaleString('en-US', { month: 'short' });
                    const endDay = selectedDates[1].getDate();
                    const endMonth = selectedDates[1].toLocaleString('en-US', { month: 'short' });

                    // Check if months and years are the same for concise display
                    const isSameMonthAndYear = selectedDates[0].getMonth() === selectedDates[1].getMonth() &&
                        selectedDates[0].getFullYear() === selectedDates[1].getFullYear();

                    let formattedStart = `${startDay}${getDaySuffix(startDay)} ${startMonth}`;
                    let formattedEnd = `${endDay}${getDaySuffix(endDay)} ${endMonth}`;

                    // If years are different, include year for both parts
                    if (selectedDates[0].getFullYear() !== selectedDates[1].getFullYear()) {
                        formattedStart += ` ${selectedDates[0].getFullYear()}`;
                        formattedEnd += ` ${selectedDates[1].getFullYear()}`;
                    } else if (!isSameMonthAndYear) {
                        // If only months are different but year is same, still include month in both parts
                        // No additional year needed as it's the same
                    }

                    return `${formattedStart} - ${formattedEnd}`;

                } else if (selectedDates.length === 1) {
                    const day = selectedDates[0].getDate();
                    const month = selectedDates[0].toLocaleString('en-US', { month: 'short' });
                    const year = selectedDates[0].getFullYear();
                    return `${day}${getDaySuffix(day)} ${month} ${year}`;
                }
                return ""; // Default for no selection
            }


            const fp = flatpickr("#validity", {
                mode: "range",
                
                dateFormat: "Y-m-d",
                altInput: true, 
                

                defaultDate: ["2025-02-19", "2025-02-24"], // Use standard parseable format for defaultDate

                // onReady is perfect for setting the initial display when the calendar loads
                onReady: function (selectedDates, dateStr, instance) {
                    if (selectedDates.length > 0) {
                        // Apply custom formatter immediately after defaultDate is set
                        instance.altInput.value = customRangeFormatter(selectedDates, dateStr, instance);
                    }
                },

                // onChange updates the display whenever dates are changed by the user
                onChange: function (selectedDates, dateStr, instance) {
                    instance.altInput.value = customRangeFormatter(selectedDates, dateStr, instance);
                }
            });
        });
    