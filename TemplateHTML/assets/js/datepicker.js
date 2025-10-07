 
        let datePicker = document.getElementById("datePicker");
        let dropdownBtn = document.getElementById("dropdownBtn");
        let dropdownMenu = document.getElementById("dropdownMenu");

        let mode = "monthly"; // Default mode

        function setDateMode(selectedMode) {
            mode = selectedMode;
            dropdownBtn.innerHTML = selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1) + ' <i class="fa-solid fa-chevron-down ml-1"></i>';
            dropdownMenu.classList.add("hidden");

            if (mode === "today") {
                let today = new Date();
                let formattedDate = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
                datePicker.value = formattedDate;
            }
            else if (mode === "Specific Date") {
                flatpickr(datePicker, {
                    dateFormat: "d M, Y",
                    onChange: function (selectedDates, dateStr) {
                        datePicker.value = dateStr;
                    }
                }).open();
            }
            else if (mode === "monthly") {
                flatpickr(datePicker, {
                    mode: "range",
                    dateFormat: "d M",
                    onChange: function (selectedDates, dateStr) {
                        if (selectedDates.length === 2) {
                            let start = selectedDates[0].toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
                            let end = selectedDates[1].toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
                            datePicker.value = `${start} - ${end}`;
                        }
                    }
                }).open();
            }

        }

        // Toggle dropdown
        dropdownBtn.addEventListener("click", () => {
            dropdownMenu.classList.toggle("hidden");
        });

        // Close dropdown on outside click
        document.addEventListener("click", (event) => {
            if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.add("hidden");
            }
        });

        // Set default
        setDateMode("today");
    