
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';

import {banUserViewDetail} from '../../MockData/UserManagmentData';
import BannedUserDetailsCard from './BannedUserDetailsCard';
import { useParams,useNavigate } from 'react-router-dom';

export const UserManagementBanUserDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const Comlaint = banUserViewDetail.find((record) => record.accountId === id);

  


    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header
                onToggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
                userId={userId}
            />
            <div className="flex flex-1">
                <Sidebar sidebarCollapsed={sidebarCollapsed} />
                <main className="flex-1 p-4 md:p-6 overflow-hidden">
                    <PageHeaderWithFilters
                        title=""
                        breadcrumbs={[]}
                        showExportButton={false}
                        filterCategories={[
                            
                        ]}
                        onDateChange={() => { }}
                        onFilterChange={() => { }}
                        onExportClick={() => { }}
                        showSearchBox={false}
                        showBackButton={true}
                        showDateSelector={false}
                        onBackClick={()=>{navigate('/user-management-complaint')}}


                    />  
                     
                        <BannedUserDetailsCard user={Comlaint} />
                    
                </main>
            </div>
        </div>
    );
};

