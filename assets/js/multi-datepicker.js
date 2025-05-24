   
        document.addEventListener("DOMContentLoaded", () => {
            // Select all date picker wrappers
            const wrappers = document.querySelectorAll('.date-picker-wrapper');

            wrappers.forEach((wrapper) => {
                const datePicker = wrapper.querySelector('.datePicker');
                const dropdownBtn = wrapper.querySelector('.dropdownBtn');
                const dropdownMenu = wrapper.querySelector('.dropdownMenu');
                const modeLabel = wrapper.querySelector('.mode-label');

                let mode = "today"; // Default mode is 'today'

                function setDateMode(selectedMode) {
                    mode = selectedMode;
                    modeLabel.textContent = selectedMode;
                    dropdownMenu.classList.add("hidden");

                    if (mode === "today") {
                        const today = new Date();
                        const formatted = today.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        });
                        datePicker.value = formatted;
                    } else if (mode === "Specific Date") {
                        flatpickr(datePicker, {
                            dateFormat: "d M, Y",
                            defaultDate: new Date(),
                            onChange: function (selectedDates, dateStr) {
                                datePicker.value = dateStr;
                            }
                        }).open();
                    } else if (mode === "monthly") {
                        flatpickr(datePicker, {
                            mode: "range",
                            dateFormat: "d M",
                            onChange: function (selectedDates) {
                                if (selectedDates.length === 2) {
                                    const start = selectedDates[0].toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short"
                                    });
                                    const end = selectedDates[1].toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short"
                                    });
                                    datePicker.value = `${start} - ${end}`;
                                }
                            }
                        }).open();
                    }
                }

                // Init default mode on page load for each picker
                setDateMode("today");

                // Toggle dropdown for each picker
                dropdownBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    dropdownMenu.classList.toggle("hidden");
                });

                // Handle dropdown option click for each picker
                dropdownMenu.querySelectorAll('button[data-mode]').forEach(btn => {
                    btn.addEventListener("click", () => {
                        setDateMode(btn.dataset.mode);
                    });
                });

                // Close dropdown if clicked outside
                document.addEventListener("click", (e) => {
                    if (!wrapper.contains(e.target)) {
                        dropdownMenu.classList.add("hidden");
                    }
                });
            });
        });
    