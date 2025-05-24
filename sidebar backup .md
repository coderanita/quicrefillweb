  <aside
                    :class="sidebarCollapsed ? 'w-16' : 'w-64'"
                    class="relative bg-white min-h-screen shadow-sm z-20 border-r border-gray-300 transition-all duration-300 ease-in-out" >
         <nav class="p-4">
                    <ul>
                        <li class="mb-4">
                            <a href="quicrefill-dashboard.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-th-large mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Summary</span>
                            </a>
                        </li>
                    
                        <li class="mb-4">
                            <a href="order-management.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-clipboard-list mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Order Management</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="delivery-management.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-cube mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Delivery Management</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="service-management.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-briefcase mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Service Management</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="accessories-management.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-bag-shopping mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Accessories Management</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="user-management.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-user mr-3"></i>
                                 <span x-show="!sidebarCollapsed">User Management</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="vendor-management.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-store mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Vendor Management</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="delivery-rep-management.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-truck-droplet mr-2"></i>
                                 <span x-show="!sidebarCollapsed">Delivery Rep Management</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="verification-and-compliance.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-check-square mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Verification & Compliance</span>
                            </a>
                        </li>
                        <li x-data="{ open: false }" class="mb-4">
                            <a href="#" @click.prevent="open = !open"
                            class="flex items-center text-gray-600 hover:text-amber-500">
                            <i class="fas fa-sack-dollar mr-3"></i>
                             <span x-show="!sidebarCollapsed">Revenue Management</span>
                            <i :class="open ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas ml-auto text-xs"></i>
                            </a>
                        
                            <!-- Dropdown Menu -->
                            <ul x-show="open"  :class="!sidebarCollapsed ? 'ml-6' : ' border p-1 rounded-lg border-amber-300'" x-cloak class="mt-2 space-y-2 text-gray-800">
                            
                            <!-- Revenue Breakdown -->
                                  <li class="flex items-center  hover:text-amber-500">
                                
                                <a href="revenue-management.html">
                                    <i class="fas fa-sack-dollar text-gray-500"></i>
                                    <span x-show="!sidebarCollapsed">Revenue Management</span>
                                </a>
                            </li>
                            <li class="flex items-center  hover:text-amber-500">
                                
                                <a href="revenue-breakdown.html">
                                    <i class="fas fa-chart-pie  text-gray-500"></i>
                                    <span x-show="!sidebarCollapsed">Revenue Breakdown</span>
                                </a>
                            </li>

                        
                            <!-- Payout Management -->
                            <li class="flex items-center hover:text-amber-500">
                                <a href="payout-management.html"></a>
                                    <i class="fas fa-hand-holding-usd mr-3 text-gray-500"></i>
                                 <span x-show="!sidebarCollapsed">   Payout Management</span> 
                                </a>
                            </li>
                        
                            <!-- Revenue Analytics -->
                            <li class="flex items-center hover:text-amber-500">
                                <a href="revenue-analytics.html"></a>
                                    <i class="fas fa-chart-line mr-3 text-gray-500"></i>
                                    <span x-show="!sidebarCollapsed">Revenue Analytics & Insights</span> 
                                </a>
                                
                            </li>
                        
                            </ul>
                        </li>
                        
                        <li class="mb-4">
                            <a href="withdrawal-management.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-money-bill-transfer mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Withdrawal Management</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="account-deletion.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-user-xmark mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Account Deletion</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="operating-locations.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fa fa-map-marker mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Operating Locations</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="feedback.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-comments mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Feedback</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="fraud-watch.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fa fa-binoculars mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Fraud Watch</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="reports-and-analytics.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-chart-bar mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Reports and Analytics</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="crash-analytics.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fa fa-line-chart mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Crash Analytics</span>
                            </a>
                        </li>
                        <li x-data="{ open: false }" class="mb-4">
                            <a href="#" @click.prevent="open = !open" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-shield-alt mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Audit Logs & Security</span>
                                <i :class="open ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas ml-auto text-xs"></i>
                            </a>
                        
                            <!-- Dropdown Menu -->
                            <ul x-show="open" x-cloak :class="!sidebarCollapsed ? 'ml-6' : ' border p-1 rounded-lg border-amber-300'" class="mt-2 space-y-2 text-gray-500">
                                <li class="flex items-center hover:text-amber-500">
                                    <a href="audit-admin-logs.html"></a>
                                    <i class="fas fa-file-alt mr-3"></i>
                                    <span x-show="!sidebarCollapsed">Admin Logs activities</span>    
                                </a>
                                </li>
                                <li class="flex items-center hover:text-amber-500">
                                    <a href="audit-transaction-logs.html">
                                        <i class="fas fa-user-lock mr-3"></i>
                                        <span x-show="!sidebarCollapsed">Transaction Logs</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        
                        <li class="mb-4">
                            <a href="staff-management.html" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-user-shield mr-3"></i>
                                 <span x-show="!sidebarCollapsed">Staff Management</span>
                            </a>
                        </li>
                        
                        <li x-data="{ open: false }" class="mb-4">
                            <a href="#" @click.prevent="open = !open" class="flex items-center text-gray-600 hover:text-amber-500">
                                <i class="fas fa-cog mr-3"></i>
                                 <span x-show="!sidebarCollapsed">System Settings</span>
                                <i :class="open ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas ml-auto text-xs"></i>
                            </a>
                        
                            <!-- Dropdown Menu -->
                            <ul x-show="open" x-cloak :class="!sidebarCollapsed ? 'ml-6' : ' border p-1 rounded-lg border-amber-300'" class="mt-2 space-y-2 text-gray-500">
                                <li class="flex items-center hover:text-amber-500">
                                    <a href="system-message-settings.html"></a>
                                        <i class="fas fa-envelope-open-text mr-3"></i>
                                        <span x-show="!sidebarCollapsed">Message Settings</span>
                                    </a>
                                </li>
                                
                                <li class="flex items-center hover:text-amber-500">
                                    <a href="system-push-notification-settings.html">
                                        <i class="fas fa-bell mr-3"></i>
                                        <span x-show="!sidebarCollapsed">Push Notification Settings</span>
                                    </a>
                                </li>
                                
                                <li class="flex items-center hover:text-amber-500">
                                    
                                    <a href="system-coupon-settings.html">
                                        <i class="fas fa-ticket-alt mr-3"></i>
                                        <span x-show="!sidebarCollapsed">Coupon Settings</span>
                                    </a>
                                </li>
                                
                            </ul>
                        </li>
                    </ul>
                </nav>
        </aside>
            // Mobile sidebar toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            const sidebarToggle = document.querySelector('#sidebar-toggle');
            const sidebar = document.getElementById('sidebar');
            const sidebarOverlay = document.getElementById('sidebar-overlay');
            
            const hideSidebarButton = document.getElementById('hide-sidebar-button');
            
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('open');
                sidebar.classList.remove('hidden');
                sidebarOverlay.classList.toggle('hidden');
            });
            
            sidebarOverlay.addEventListener('click', function() {
                sidebar.classList.remove('open');
                sidebar.classList.add('hidden');
                sidebarOverlay.classList.add('hidden');
            });
            
            hideSidebarButton.addEventListener('click', function() {
                sidebar.classList.toggle("hidden");
            });
    
             // Initialize Pie Chart
             const pieCtx = document.getElementById('pieChart').getContext('2d');
            const pieChart = new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['Petroleum', 'Cooking gas', 'Diesel', 'Electricity'],
                    datasets: [{
                        data: [40, 20, 25, 15],
                        backgroundColor: [
                            '#4FD1C5', // teal
                            '#F6E05E', // yellow
                            '#F56565', // red
                            '#4299E1'  // blue
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });