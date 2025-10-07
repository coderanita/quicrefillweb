export const GEOGRAPHY_DATA = [
    // --- West Africa ---
    {
        country: "Nigeria",
        states: [
            {
                state: "Lagos",
                lgas: ["Agege", "Ikeja", "Lekki", "Surulere", "Apapa", "Eti-Osa", "Alimosho"],
            },
            {
                state: "Abuja (FCT)",
                lgas: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Abuja Municipal"],
            },
            {
                state: "Kano",
                lgas: ["Dala", "Fagge", "Tarauni", "Kano Municipal", "Nassarawa"],
            },
            {
                state: "Rivers",
                lgas: ["Port Harcourt", "Obio/Akpor", "Eleme", "Ikwerre"],
            },
        ],
    },
    {
        country: "Ghana",
        states: [
            {
                state: "Greater Accra Region",
                // Generally called Metropolitan/Municipal Assemblies (MMAs) in Ghana
                lgas: ["Accra Metropolis", "Tema Metropolitan", "Adenta Municipal", "Ga East Municipal"],
            },
            {
                state: "Ashanti Region",
                lgas: ["Kumasi Metropolitan", "Obuasi Municipal", "Asokwa Municipal", "Ejisu Municipal"],
            },
            {
                state: "Western Region",
                lgas: ["Sekondi-Takoradi Metropolitan", "Effia-Kwesimintsim Municipal"],
            },
        ],
    },
    // --- Southern Africa ---
    {
        country: "South Africa",
        // Provinces are the main divisions, and 'lgas' are typically Metropolitan/Local Municipalities
        states: [
            {
                state: "Gauteng",
                lgas: ["City of Johannesburg", "City of Tshwane (Pretoria)", "Ekurhuleni", "Sedibeng"],
            },
            {
                state: "Western Cape",
                lgas: ["City of Cape Town", "Cape Winelands", "Garden Route"],
            },
            {
                state: "KwaZulu-Natal",
                lgas: ["eThekwini (Durban)", "Pietermaritzburg", "King Cetshwayo"],
            },
        ],
    },
    // --- East Africa ---
    {
        country: "Kenya",
        // Kenya uses Counties as its primary sub-national division
        states: [
            {
                state: "Nairobi County",
                lgas: ["Westlands", "Kasarani", "Embakasi"],
            },
            {
                state: "Mombasa County",
                lgas: ["Mombasa Island", "Kisauni", "Likoni"],
            },
            {
                state: "Kiambu County",
                lgas: ["Thika", "Kiambu Town", "Ruiru"],
            },
        ],
    },
    {
        country: "Egypt",
        // Egypt uses Governorates (Muhafazah)
        states: [
            {
                state: "Cairo Governorate",
                // 'lgas' are major districts/cities within the governorate
                lgas: ["New Cairo", "Heliopolis", "Maadi", "Zamalek"],
            },
            {
                state: "Giza Governorate",
                lgas: ["Giza City", "6th of October City", "Sheikh Zayed City"],
            },
            {
                state: "Alexandria Governorate",
                lgas: ["Montaza", "Al Gomrok", "Borg El Arab"],
            },
        ],
    },
];

export const MOCK_LOCATIONS = [
    {
        id: "LOC-001",
        country: "Nigeria",
        state: "Lagos",
        lga: "Ikeja",
        city: "Ikeja GRA",
        status: "Enabled",
        restrictions: ["None"],
    },
    {
        id: "LOC-002",
        country: "Ghana",
        state: "Greater Accra Region",
        lga: "Accra Metropolis",
        city: "Osu",
        status: "Restricted",
        restrictions: ["Limit service to specific days or hours", "Limit service to verified users"],
    },
    {
        id: "LOC-003",
        country: "Nigeria",
        state: "Abuja (FCT)",
        lga: "Bwari",
        city: "Kubwa",
        status: "Enabled",
        restrictions: ["None"],
    },
    {
        id: "LOC-004",
        country: "South Africa",
        state: "Gauteng",
        lga: "City of Johannesburg",
        city: "Sandton",
        status: "Enabled",
        restrictions: ["Require premium subscription"],
    },
    {
        id: "LOC-005",
        country: "Ghana",
        state: "Ashanti Region",
        lga: "Kumasi Metropolitan",
        city: "Adum",
        status: "Disabled",
        restrictions: ["Service permanently suspended"],
    },
    {
        id: "LOC-006",
        country: "Nigeria",
        state: "Rivers",
        lga: "Port Harcourt",
        city: "Diobu",
        status: "Restricted",
        restrictions: ["Limit service to verified users", "Require premium subscription"],
    },
    {
        id: "LOC-007",
        country: "Kenya",
        state: "Nairobi County",
        lga: "Westlands",
        city: "Kilimani",
        status: "Enabled",
        restrictions: ["None"],
    },
    {
        id: "LOC-008",
        country: "South Africa",
        state: "Western Cape",
        lga: "City of Cape Town",
        city: "Camps Bay",
        status: "Enabled",
        restrictions: ["Limit service to specific days or hours"],
    },
    {
        id: "LOC-009",
        country: "Nigeria",
        state: "Kano",
        lga: "Nassarawa",
        city: "Kano City Center",
        status: "Enabled",
        restrictions: ["None"],
    },
    {
        id: "LOC-010",
        country: "Ghana",
        state: "Greater Accra Region",
        lga: "Tema Metropolitan",
        city: "Community 1",
        status: "Restricted",
        restrictions: ["Limit service to specific days or hours"],
    },
    {
        id: "LOC-011",
        country: "Kenya",
        state: "Mombasa County",
        lga: "Kisauni",
        city: "Nyali",
        status: "Disabled",
        restrictions: ["Service permanently suspended due to low demand"],
    },
    {
        id: "LOC-012",
        country: "South Africa",
        state: "KwaZulu-Natal",
        lga: "eThekwini (Durban)",
        city: "Umhlanga",
        status: "Enabled",
        restrictions: ["None"],
    },
    {
        id: "LOC-013",
        country: "Nigeria",
        state: "Lagos",
        lga: "Eti-Osa",
        city: "Lekki Phase 1",
        status: "Enabled",
        restrictions: ["Require premium subscription"],
    },
    {
        id: "LOC-014",
        country: "Ghana",
        state: "Western Region",
        lga: "Sekondi-Takoradi Metropolitan",
        city: "Takoradi",
        status: "Enabled",
        restrictions: ["None"],
    },
    {
        id: "LOC-015",
        country: "Kenya",
        state: "Kiambu County",
        lga: "Ruiru",
        city: "Ruiru Town",
        status: "Restricted",
        restrictions: ["Limit service to verified users"],
    },
];
// Default state for the form
export const initialFormData = {
    country: '',
    state: '',
    lga: '',
    city: '',
    status: 'Enabled', // Default to Enabled
    restrictions: [],
};
export const MOCK_LOCATIONS2 = [
    // --- LOCATION 001: LAGOS (IKEJA) ---
    {
        id: "LOC-001",
        country: "Nigeria",
        state: "Lagos",
        lga: "Ikeja",
        city: "Ikeja GRA",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "System Admin",
        date: "2024-09-27",
        activeUsers: 8087,
        activeRiders: 1348,
        activeVendors: 1348,
        monthlyOrders: [320, 540, 530, 440, 620, 560, 700, 280, 500, 540, 510, 650],
        serviceData: [
            { id: 1, name: 'Gas Refill', stats: '200 orders', revenue: '₦6,300,000', status: 'Active', dateCreated: '25/01/27 10:15 AM', isActive: true },
            { id: 2, name: 'Diesel', stats: '50 orders', revenue: '₦12,250,000', status: 'Active', dateCreated: '25/01/27 02:45 PM', isActive: true },
            { id: 3, name: 'Petroleum', stats: '120 orders', revenue: '₦9,240,000', status: 'Inactive', dateCreated: '25/01/26 11:20 AM', isActive: false },
            { id: 4, name: 'Electricity', stats: '10 orders', revenue: '₦15,000,000', status: 'Active', dateCreated: '25/01/25 12:50 PM', isActive: true },
            { id: 5, name: 'Accessories', stats: '36 orders', revenue: '₦2,400,000', status: 'Inactive', dateCreated: '25/01/26 12:50 PM', isActive: false },
        ],
        vendorsRiders: [
            { id: 1, name: "John Doe", role: "Rider", registrationDate: "25/01/27 02:45 PM", status: "Active", isActive: true },
            { id: 2, name: "PowerPlus Ltd.", role: "Vendor", registrationDate: "25/01/27 02:45 PM", status: "Enabled", isActive: true },
            { id: 3, name: "Sharon Miller", role: "Rider", registrationDate: "25/01/27 02:45 PM", status: "Suspended", isActive: false },
            { id: 4, name: "FixIt Plumbers", role: "Vendor", registrationDate: "25/01/27 02:45 PM", status: "Enabled", isActive: true },
        ],
        verificationCompliance: [
            { id: 1, submissionId: "VER78601001", customerName: "John Doe", type: "Rider Registration", submissionDate: "25/01/27 02:45 PM", status: "Pending" },
            { id: 2, submissionId: "VER78601002", customerName: "PowerPlus Ltd.", type: "Vendor Registration", submissionDate: "25/01/27 02:45 PM", status: "Approved" },
            { id: 3, submissionId: "VER78601003", customerName: "TechGears Ltd.", type: "Vehicle License", submissionDate: "25/01/27 02:45 PM", status: "Rejected" },
            { id: 4, submissionId: "VER78601004", customerName: "Sarah Cole", type: "Rider License", submissionDate: "25/01/27 03:00 PM", status: "Approved" },
            { id: 5, submissionId: "VER78601005", customerName: "Benson Foods", type: "Vendor Renewal", submissionDate: "25/01/27 03:15 PM", status: "Pending" },
            { id: 6, submissionId: "VER78601006", customerName: "James Tolu", type: "Rider Insurance", submissionDate: "25/01/27 03:30 PM", status: "Approved" },
        ],
    },
    
    // --- LOCATION 002: ABUJA (FCT) ---
    {
        id: "LOC-002",
        country: "Nigeria",
        state: "Abuja (FCT)",
        lga: "Gwagwalada",
        city: "Gwagwalada Central",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "System Admin",
        date: "2024-09-27",
        activeUsers: 7200,
        activeRiders: 980,
        activeVendors: 1200,
        monthlyOrders: [280, 400, 450, 500, 520, 480, 600, 300, 420, 460, 430, 580],
        serviceData: [
            { id: 6, name: 'Food Delivery', stats: '500 orders', revenue: '₦5,500,000', status: 'Active', dateCreated: '25/02/01 09:00 AM', isActive: true },
            { id: 7, name: 'Grocery Shop', stats: '150 orders', revenue: '₦3,100,000', status: 'Active', dateCreated: '25/02/05 01:20 PM', isActive: true },
            { id: 8, name: 'Pharmacy', stats: '20 orders', revenue: '₦950,000', status: 'Inactive', dateCreated: '25/01/10 03:00 PM', isActive: false },
        ],
        vendorsRiders: [
            { id: 5, name: "Grace Umoh", role: "Rider", registrationDate: "25/02/01 10:00 AM", status: "Active", isActive: true },
            { id: 6, name: "Abuja Eats", role: "Vendor", registrationDate: "25/02/01 10:00 AM", status: "Enabled", isActive: true },
        ],
        verificationCompliance: [
            { id: 7, submissionId: "VER78601001", customerName: "Abuja Eats", type: "Vendor Registration", submissionDate: "25/02/01 11:00 AM", status: "Pending" },
            { id: 8, submissionId: "VER78601002", customerName: "Grace Umoh", type: "Rider License", submissionDate: "25/02/01 12:00 PM", status: "Approved" },
            { id: 9, submissionId: "VER78601003", customerName: "FreshMart", type: "Vendor Renewal", submissionDate: "25/02/01 01:00 PM", status: "Approved" },
        ],
    },
    
    // --- LOCATION 003: RIVERS (PORT HARCOURT) ---
    {
        id: "LOC-003",
        country: "Nigeria",
        state: "Rivers",
        lga: "Port Harcourt",
        city: "Port Harcourt City",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "System Admin",
        date: "2024-09-27",
        activeUsers: 5400,
        activeRiders: 600,
        activeVendors: 900,
        monthlyOrders: [200, 360, 400, 420, 500, 450, 550, 250, 380, 400, 390, 500],
        serviceData: [
            { id: 9, name: 'Taxi Service', stats: '1200 trips', revenue: '₦8,000,000', status: 'Active', dateCreated: '25/03/15 08:30 AM', isActive: true },
            { id: 10, name: 'Car Wash', stats: '80 bookings', revenue: '₦1,200,000', status: 'Active', dateCreated: '25/03/20 11:00 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 7, name: "Ayo Rides", role: "Vendor", registrationDate: "25/03/15 08:30 AM", status: "Enabled", isActive: true },
            { id: 8, name: "Paul Chike", role: "Rider", registrationDate: "25/03/15 08:30 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 10, submissionId: "VER78601001", customerName: "Ayo Rides", type: "Vehicle Inspection", submissionDate: "25/03/15 09:00 AM", status: "Approved" },
            { id: 11, submissionId: "VER78601002", customerName: "Paul Chike", type: "Rider Insurance", submissionDate: "25/03/15 10:00 AM", status: "Rejected" },
        ],
    },

    // --- LOCATION 004: KANO (TARAUNI) ---
    {
        id: "LOC-004",
        country: "Nigeria",
        state: "Kano",
        lga: "Tarauni",
        city: "Tarauni Central",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "System Admin",
        date: "2024-09-28",
        activeUsers: 6100,
        activeRiders: 850,
        activeVendors: 1100,
        monthlyOrders: [150, 300, 350, 400, 450, 400, 500, 200, 320, 380, 350, 480],
        serviceData: [
            { id: 11, name: 'Plumbing', stats: '50 jobs', revenue: '₦900,000', status: 'Active', dateCreated: '25/04/01 10:00 AM', isActive: true },
            { id: 12, name: 'AC Repair', stats: '30 jobs', revenue: '₦1,100,000', status: 'Active', dateCreated: '25/04/05 11:30 AM', isActive: true },
            { id: 13, name: 'Generator Fix', stats: '10 jobs', revenue: '₦500,000', status: 'Inactive', dateCreated: '25/04/10 02:00 PM', isActive: false },
        ],
        vendorsRiders: [
            { id: 9, name: "Kano Fixes", role: "Vendor", registrationDate: "25/04/01 10:00 AM", status: "Enabled", isActive: true },
            { id: 10, name: "Aminu Bala", role: "Rider", registrationDate: "25/04/01 10:00 AM", status: "Suspended", isActive: false },
        ],
        verificationCompliance: [
            { id: 12, submissionId: "VER78601001", customerName: "Kano Fixes", type: "Vendor Insurance", submissionDate: "25/04/01 11:00 AM", status: "Pending" },
            { id: 13, submissionId: "VER78601002", customerName: "Aminu Bala", type: "Rider Registration", submissionDate: "25/04/01 12:00 PM", status: "Approved" },
        ],
    },

    // --- LOCATION 005: DELTA (WARRI) ---
    {
        id: "LOC-005",
        country: "Nigeria",
        state: "Delta",
        lga: "Warri South",
        city: "Warri Central",
        status: "Enabled",
        restrictions: ["Alcohol Sales"],
        lastModifiedBy: "Admin B",
        date: "2024-09-28",
        activeUsers: 4500,
        activeRiders: 550,
        activeVendors: 800,
        monthlyOrders: [180, 320, 380, 400, 460, 410, 520, 220, 340, 400, 370, 490],
        serviceData: [
            { id: 14, name: 'Seafood Delivery', stats: '90 orders', revenue: '₦3,500,000', status: 'Active', dateCreated: '25/05/10 09:30 AM', isActive: true },
            { id: 15, name: 'Water Supply', stats: '200 orders', revenue: '₦1,500,000', status: 'Active', dateCreated: '25/05/15 10:30 AM', isActive: true },
            { id: 16, name: 'Dry Cleaning', stats: '40 orders', revenue: '₦700,000', status: 'Inactive', dateCreated: '25/05/20 01:00 PM', isActive: false },
        ],
        vendorsRiders: [
            { id: 11, name: "Warri Seafood", role: "Vendor", registrationDate: "25/05/10 09:30 AM", status: "Enabled", isActive: true },
            { id: 12, name: "Precious Efe", role: "Rider", registrationDate: "25/05/10 09:30 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 14, submissionId: "VER78601001", customerName: "Warri Seafood", type: "Health Permit", submissionDate: "25/05/10 10:30 AM", status: "Approved" },
            { id: 15, submissionId: "VER78601002", customerName: "Precious Efe", type: "Rider Background Check", submissionDate: "25/05/10 11:30 AM", status: "Pending" },
        ],
    },
    
    // --- LOCATION 006: ENUGU (ENUGU NORTH) ---
    {
        id: "LOC-006",
        country: "Nigeria",
        state: "Enugu",
        lga: "Enugu North",
        city: "New Haven",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "System Admin",
        date: "2024-09-29",
        activeUsers: 5000,
        activeRiders: 700,
        activeVendors: 1000,
        monthlyOrders: [210, 350, 400, 450, 500, 480, 580, 260, 400, 440, 410, 550],
        serviceData: [
            { id: 17, name: 'Laundromat', stats: '60 orders', revenue: '₦1,500,000', status: 'Active', dateCreated: '25/06/01 08:00 AM', isActive: true },
            { id: 18, name: 'Beauty Services', stats: '25 bookings', revenue: '₦2,000,000', status: 'Active', dateCreated: '25/06/05 09:30 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 13, name: "Enugu Wash", role: "Vendor", registrationDate: "25/06/01 08:00 AM", status: "Enabled", isActive: true },
            { id: 14, name: "Chinedu Okafor", role: "Rider", registrationDate: "25/06/01 08:00 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 16, submissionId: "VER78601001", customerName: "Enugu Wash", type: "Business License", submissionDate: "25/06/01 09:00 AM", status: "Approved" },
            { id: 17, submissionId: "VER78601002", customerName: "Chinedu Okafor", type: "Rider Vehicle Docs", submissionDate: "25/06/01 10:00 AM", status: "Pending" },
        ],
    },

    // --- LOCATION 007: OYO (IBADAN) ---
    {
        id: "LOC-007",
        country: "Nigeria",
        state: "Oyo",
        lga: "Ibadan North",
        city: "Bodija",
        status: "Enabled",
        restrictions: ["Curfew"],
        lastModifiedBy: "Admin C",
        date: "2024-09-29",
        activeUsers: 6500,
        activeRiders: 1100,
        activeVendors: 1400,
        monthlyOrders: [300, 500, 550, 600, 650, 600, 750, 350, 550, 600, 570, 700],
        serviceData: [
            { id: 19, name: 'Motorbike Repair', stats: '70 jobs', revenue: '₦1,800,000', status: 'Active', dateCreated: '25/07/15 07:00 AM', isActive: true },
            { id: 20, name: 'House Cleaning', stats: '30 bookings', revenue: '₦900,000', status: 'Active', dateCreated: '25/07/20 10:00 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 15, name: "Ibadan Repairs", role: "Vendor", registrationDate: "25/07/15 07:00 AM", status: "Enabled", isActive: true },
            { id: 16, name: "Kunle Ade", role: "Rider", registrationDate: "25/07/15 07:00 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 18, submissionId: "VER78601001", customerName: "Ibadan Repairs", type: "Vendor Registration", submissionDate: "25/07/15 08:00 AM", status: "Approved" },
            { id: 19, submissionId: "VER78601002", customerName: "Kunle Ade", type: "Rider Background Check", submissionDate: "25/07/15 09:00 AM", status: "Approved" },
        ],
    },

    // --- LOCATION 008: KADUNA (CHIKUN) ---
    {
        id: "LOC-008",
        country: "Nigeria",
        state: "Kaduna",
        lga: "Chikun",
        city: "Barnawa",
        status: "Disabled",
        restrictions: ["Security Alert"],
        lastModifiedBy: "System Admin",
        date: "2024-09-30",
        activeUsers: 3000,
        activeRiders: 400,
        activeVendors: 600,
        monthlyOrders: [100, 150, 200, 250, 300, 280, 350, 150, 250, 280, 260, 320],
        serviceData: [
            { id: 21, name: 'Security Services', stats: '10 contracts', revenue: '₦5,000,000', status: 'Active', dateCreated: '25/08/01 10:00 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 17, name: "Kaduna Security", role: "Vendor", registrationDate: "25/08/01 10:00 AM", status: "Suspended", isActive: false },
            { id: 18, name: "Musa Audu", role: "Rider", registrationDate: "25/08/01 10:00 AM", status: "Suspended", isActive: false },
        ],
        verificationCompliance: [
            { id: 20, submissionId: "VER78601001", customerName: "Kaduna Security", type: "Permit Renewal", submissionDate: "25/08/01 11:00 AM", status: "Rejected" },
        ],
    },
    
    // --- LOCATION 009: OGUN (ABEOKUTA) ---
    {
        id: "LOC-009",
        country: "Nigeria",
        state: "Ogun",
        lga: "Abeokuta South",
        city: "Panseke",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "Admin D",
        date: "2024-10-01",
        activeUsers: 4800,
        activeRiders: 650,
        activeVendors: 850,
        monthlyOrders: [220, 380, 420, 480, 530, 500, 600, 280, 400, 450, 420, 550],
        serviceData: [
            { id: 22, name: 'Car Rental', stats: '40 bookings', revenue: '₦3,200,000', status: 'Active', dateCreated: '25/09/01 09:00 AM', isActive: true },
            { id: 23, name: 'Tyre Services', stats: '50 services', revenue: '₦900,000', status: 'Active', dateCreated: '25/09/05 11:00 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 19, name: "Ogun Motors", role: "Vendor", registrationDate: "25/09/01 09:00 AM", status: "Enabled", isActive: true },
            { id: 20, name: "Bayo Sanni", role: "Rider", registrationDate: "25/09/01 09:00 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 21, submissionId: "VER78601001", customerName: "Ogun Motors", type: "Vehicle Inspection", submissionDate: "25/09/01 10:00 AM", status: "Approved" },
            { id: 22, submissionId: "VER78601002", customerName: "Bayo Sanni", type: "Rider License", submissionDate: "25/09/01 11:00 AM", status: "Pending" },
        ],
    },

    // --- LOCATION 010: EDO (BENIN CITY) ---
    {
        id: "LOC-010",
        country: "Nigeria",
        state: "Edo",
        lga: "Oredo",
        city: "GRA, Benin",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "System Admin",
        date: "2024-10-02",
        activeUsers: 5800,
        activeRiders: 750,
        activeVendors: 950,
        monthlyOrders: [250, 420, 480, 550, 600, 580, 680, 320, 450, 500, 470, 620],
        serviceData: [
            { id: 24, name: 'Home Tutoring', stats: '15 bookings', revenue: '₦1,500,000', status: 'Active', dateCreated: '25/10/01 09:00 AM', isActive: true },
            { id: 25, name: 'Office Supplies', stats: '100 orders', revenue: '₦4,500,000', status: 'Active', dateCreated: '25/10/05 10:00 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 21, name: "Edo Education", role: "Vendor", registrationDate: "25/10/01 09:00 AM", status: "Enabled", isActive: true },
            { id: 22, name: "Ifeanyi Obi", role: "Rider", registrationDate: "25/10/01 09:00 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 23, submissionId: "VER78601001", customerName: "Edo Education", type: "Vendor Registration", submissionDate: "25/10/01 10:00 AM", status: "Pending" },
            { id: 24, submissionId: "VER78601002", customerName: "Ifeanyi Obi", type: "Rider Insurance", submissionDate: "25/10/01 11:00 AM", status: "Approved" },
        ],
    },
    
    // --- LOCATION 011: ANAMBRA (AWKA) ---
    {
        id: "LOC-011",
        country: "Nigeria",
        state: "Anambra",
        lga: "Awka South",
        city: "Amawbia",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "Admin E",
        date: "2024-10-03",
        activeUsers: 4000,
        activeRiders: 500,
        activeVendors: 700,
        monthlyOrders: [150, 280, 320, 380, 450, 400, 500, 200, 300, 350, 320, 450],
        serviceData: [
            { id: 26, name: 'Electronics Repair', stats: '20 jobs', revenue: '₦1,800,000', status: 'Active', dateCreated: '25/11/01 08:30 AM', isActive: true },
            { id: 27, name: 'Book Delivery', stats: '60 orders', revenue: '₦900,000', status: 'Active', dateCreated: '25/11/05 10:30 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 23, name: "Awka Tech", role: "Vendor", registrationDate: "25/11/01 08:30 AM", status: "Enabled", isActive: true },
            { id: 24, name: "Obinna Eze", role: "Rider", registrationDate: "25/11/01 08:30 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 25, submissionId: "VER78601001", customerName: "Awka Tech", type: "Business License", submissionDate: "25/11/01 09:30 AM", status: "Approved" },
            { id: 26, submissionId: "VER78601002", customerName: "Obinna Eze", type: "Rider Registration", submissionDate: "25/11/01 10:30 AM", status: "Pending" },
            { id: 27, submissionId: "VER78601003", customerName: "Ifeoma Books", type: "Vendor Renewal", submissionDate: "25/11/01 11:30 AM", status: "Rejected" },
        ],
    },
    
    // --- LOCATION 012: PLATEAU (JOS) ---
    {
        id: "LOC-012",
        country: "Nigeria",
        state: "Plateau",
        lga: "Jos North",
        city: "Farin Gada",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "System Admin",
        date: "2024-10-04",
        activeUsers: 3500,
        activeRiders: 450,
        activeVendors: 650,
        monthlyOrders: [120, 250, 280, 320, 380, 350, 450, 180, 250, 300, 280, 400],
        serviceData: [
            { id: 28, name: 'Cold Storage', stats: '5 bookings', revenue: '₦2,500,000', status: 'Active', dateCreated: '25/12/01 09:00 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 25, name: "Jos Storage", role: "Vendor", registrationDate: "25/12/01 09:00 AM", status: "Enabled", isActive: true },
            { id: 26, name: "Ladi Musa", role: "Rider", registrationDate: "25/12/01 09:00 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 28, submissionId: "VER78601001", customerName: "Jos Storage", type: "Health Permit", submissionDate: "25/12/01 10:00 AM", status: "Approved" },
            { id: 29, submissionId: "VER78601002", customerName: "Ladi Musa", type: "Rider License", submissionDate: "25/12/01 11:00 AM", status: "Approved" },
            { id: 30, submissionId: "VER78601003", customerName: "Farm Foods", type: "Vendor Insurance", submissionDate: "25/12/01 12:00 PM", status: "Approved" },
            { id: 31, submissionId: "VER78601004", customerName: "Ali Tanko", type: "Rider Insurance", submissionDate: "25/12/01 01:00 PM", status: "Pending" },
        ],
    },
    
    // --- LOCATION 013: CROSS RIVER (CALABAR) ---
    {
        id: "LOC-013",
        country: "Nigeria",
        state: "Cross River",
        lga: "Calabar Municipal",
        city: "State Housing Estate",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "Admin F",
        date: "2024-10-05",
        activeUsers: 4200,
        activeRiders: 580,
        activeVendors: 820,
        monthlyOrders: [180, 300, 350, 400, 480, 450, 550, 220, 350, 400, 380, 500],
        serviceData: [
            { id: 29, name: 'Tour Guide', stats: '10 tours', revenue: '₦1,500,000', status: 'Active', dateCreated: '26/01/01 08:00 AM', isActive: true },
            { id: 30, name: 'Photography', stats: '15 bookings', revenue: '₦900,000', status: 'Active', dateCreated: '26/01/05 10:00 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 27, name: "Calabar Tours", role: "Vendor", registrationDate: "26/01/01 08:00 AM", status: "Enabled", isActive: true },
            { id: 28, name: "Ekaette Bassey", role: "Rider", registrationDate: "26/01/01 08:00 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 32, submissionId: "VER78601001", customerName: "Calabar Tours", type: "Business Permit", submissionDate: "26/01/01 09:00 AM", status: "Approved" },
            { id: 33, submissionId: "VER78601002", customerName: "Ekaette Bassey", type: "Rider Background Check", submissionDate: "26/01/01 10:00 AM", status: "Pending" },
        ],
    },
    
    // --- LOCATION 014: BAUCHI (BAUCHI) ---
    {
        id: "LOC-014",
        country: "Nigeria",
        state: "Bauchi",
        lga: "Bauchi LGA",
        city: "Wunti",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "System Admin",
        date: "2024-10-06",
        activeUsers: 3000,
        activeRiders: 400,
        activeVendors: 600,
        monthlyOrders: [100, 150, 200, 250, 300, 280, 350, 150, 250, 280, 260, 320],
        serviceData: [
            { id: 31, name: 'Farming Services', stats: '5 jobs', revenue: '₦4,000,000', status: 'Active', dateCreated: '26/02/01 07:00 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 29, name: "Bauchi Farms", role: "Vendor", registrationDate: "26/02/01 07:00 AM", status: "Enabled", isActive: true },
            { id: 30, name: "Haruna Garba", role: "Rider", registrationDate: "26/02/01 07:00 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 34, submissionId: "VER78601001", customerName: "Bauchi Farms", type: "Vendor Registration", submissionDate: "26/02/01 08:00 AM", status: "Approved" },
            { id: 35, submissionId: "VER78601002", customerName: "Haruna Garba", type: "Rider License", submissionDate: "26/02/01 09:00 AM", status: "Pending" },
        ],
    },
    
    // --- LOCATION 015: IMO (OWERRI) ---
    {
        id: "LOC-015",
        country: "Nigeria",
        state: "Imo",
        lga: "Owerri Municipal",
        city: "Ikenegbu",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "Admin G",
        date: "2024-10-07",
        activeUsers: 4600,
        activeRiders: 600,
        activeVendors: 900,
        monthlyOrders: [200, 350, 400, 450, 520, 500, 600, 280, 400, 450, 420, 550],
        serviceData: [
            { id: 32, name: 'Event Planning', stats: '8 events', revenue: '₦3,000,000', status: 'Active', dateCreated: '26/03/01 10:00 AM', isActive: true },
            { id: 33, name: 'Catering', stats: '12 orders', revenue: '₦1,800,000', status: 'Active', dateCreated: '26/03/05 11:30 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 31, name: "Owerri Events", role: "Vendor", registrationDate: "26/03/01 10:00 AM", status: "Enabled", isActive: true },
            { id: 32, name: "Nneka Okoro", role: "Rider", registrationDate: "26/03/01 10:00 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 36, submissionId: "VER78601001", customerName: "Owerri Events", type: "Vendor Registration", submissionDate: "26/03/01 11:00 AM", status: "Approved" },
            { id: 37, submissionId: "VER78601002", customerName: "Nneka Okoro", type: "Rider Insurance", submissionDate: "26/03/01 12:00 PM", status: "Pending" },
            { id: 38, submissionId: "VER78601003", customerName: "Taste Makers", type: "Health Permit", submissionDate: "26/03/01 01:00 PM", status: "Approved" },
            { id: 39, submissionId: "VER78601004", customerName: "Chris Nnadi", type: "Rider Registration", submissionDate: "26/03/01 02:00 PM", status: "Approved" },
            { id: 40, submissionId: "VER78601005", customerName: "Divine Catering", type: "Vendor Renewal", submissionDate: "26/03/01 03:00 PM", status: "Pending" },
            { id: 41, submissionId: "VER78601006", customerName: "Mike John", type: "Rider License", submissionDate: "26/03/01 04:00 PM", status: "Approved" },
        ],
    },
    
    // --- LOCATION 016: KOGI (LOKOJA) ---
    {
        id: "LOC-016",
        country: "Nigeria",
        state: "Kogi",
        lga: "Lokoja",
        city: "Ganaja",
        status: "Enabled",
        restrictions: ["None"],
        lastModifiedBy: "System Admin",
        date: "2024-10-08",
        activeUsers: 3800,
        activeRiders: 480,
        activeVendors: 720,
        monthlyOrders: [150, 280, 320, 380, 450, 400, 500, 200, 300, 350, 320, 450],
        serviceData: [
            { id: 34, name: 'Ferry Service', stats: '30 trips', revenue: '₦2,200,000', status: 'Active', dateCreated: '26/04/01 08:00 AM', isActive: true },
        ],
        vendorsRiders: [
            { id: 33, name: "Kogi Boats", role: "Vendor", registrationDate: "26/04/01 08:00 AM", status: "Enabled", isActive: true },
            { id: 34, name: "Umar Sani", role: "Rider", registrationDate: "26/04/01 08:00 AM", status: "Active", isActive: true },
        ],
        verificationCompliance: [
            { id: 42, submissionId: "VER78601001", customerName: "Kogi Boats", type: "Marine Permit", submissionDate: "26/04/01 09:00 AM", status: "Approved" },
            { id: 43, submissionId: "VER78601002", customerName: "Umar Sani", type: "Rider Background Check", submissionDate: "26/04/01 10:00 AM", status: "Rejected" },
            { id: 44, submissionId: "VER78601003", customerName: "Aisha Tanko", type: "Rider Registration", submissionDate: "26/04/01 11:00 AM", status: "Pending" },
        ],
    },
];