import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Auth/Login';
import ResetPassword from '../components/Auth/ResetPassword';
import NotificationsCenter from '../components/NotificationsCenter';
import ProfileSettings from '../components/ProfileSettings';
import { OrderManagement, AccessoriesViewDetails, OrderDetails, AccessoriesDetails, AccessoryManagement } from '../components/order-management';
import { DeliveryManagement } from '../components/delivery-management';
import { AccessoriesManagement, AccessoriesAddEdit } from '../components/accessories-management';
import { ServiceManagement, ServiceManagementDetails } from '../components/service-management';
import { PendingServiceManagement, PendingServiceManagementDetails } from '../components/service-management-pending';
import { VerificationAndCompliance, VerificationAndComplianceDetails } from "../components/verification-and-compliance";
import { UserManagement, ViewUser, UserManagementComplaint, UserManagementComplaintDetails, UserManagementBanUserDetails, UserManagementBanUsers } from "../components/user-management";
import { VendorManagement, PendingVendorManagement, VendorManagementDetails, PendingVendorManagementDetails } from "../components/vendor-management";
import { DeliveryRepManagement, PendingDeliveryRepManagement, DeliveryRepDetails, InfractionHistoryDetailPage, PendingDeliveryRepDetails } from "../components/delivery-rep-management";
import { RevenueManagement, RevenueBreakDown, PayoutManagement, PayoutManagementDetails, RevenueAnalytics } from '../components/revenue-management';
import { AccountDeletion, AccountDeletionDetails } from '../components/account-deletion';
import { WithdrawalManagement, WithdrawalManagementDetails, AccountNumberSubmission, AccountNumberSubmissionDetails } from '../components/withdrawal-management';
import { OperatingLocations, AddOperatingLocation, OperatingLocationSettings } from '../components/operating-locations';
import { Feedback, FeedbackTicketDetailCard } from '../components/feedback';
import { FraudWatch, SuspiciousTransactions, SuspiciousVendorWithdrawals, SuspiciousVendorWithdrawalDetails } from '../components/fraud-watch';
import { ProfiltTransferRequest, ReportsAndAnalytics, ProfiltTransferRequestDetails } from '../components/reports-and-analytics';
import { CrashAnalytics, CrashAnalyticsAllVitals, CrashAnalyticsDetails } from '../components/crash-analytics';
import { AdminLogs, AdminlogsDetails } from '../components/audit-admin-logs';
import { TransactionLogs, TransactionLogsDetails } from '../components/audit-transaction-logs';
import { PushNotifications, PushNotificationsDetails } from '../components/system-push-notification-settings';
import { CouponManagement, CouponManagementDetails } from '../components/system-coupon-settings';
import { MessageSettings } from '../components/system-message-settings';
import { StaffManagement,StaffManagementAdd, StaffManagementAddRole, StaffManagementDetails, } from '../components/staff-management';
import { StaffManagementRoleDetails } from '../components/staff-management/StaffManagementRoleDetails';



interface LogoutProps {
  handleLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ handleLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
    navigate('/login', { replace: true });
  }, [handleLogout, navigate]);

  return null;
};

interface AppRoutesProps {
  isLoggedIn: boolean;
  currentUserId: string | null;
  handleLogin: (userId: string) => void;
  handleLogout: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

// Define routes dynamically
const dynamicRoutes = [
  {
    path: '/dashboard',
    protected: true,
    Component: Dashboard,
  },
  {
    path: '/notifications-center',
    protected: true,
    Component: NotificationsCenter,
  },
  {
    path: '/reset-password',
    protected: false,
    Component: ResetPassword,
  },
  {
    path: '/logout',
    protected: false,
    Component: Logout,
    useLogout: true,
  },
  {
    path: '/profiles-settings',
    protected: true,
    Component: ProfileSettings,
  }, {
    path: '/order-management',
    protected: true,
    Component: OrderManagement,
  }, {
    path: '/order-management-details/:id',
    protected: true,
    Component: OrderDetails,
  }, {
    path: '/order-management-accesories-details/:id',
    protected: true,
    Component: AccessoriesDetails,
  }, {
    path: '/order-management-manage-accessories',
    protected: true,
    Component: AccessoryManagement,
  },
  {
    path: '/order-management-view-accessories/:id',
    protected: true,
    Component: AccessoriesViewDetails,
  },
  {
    path: '/delivery-management',
    protected: true,
    Component: DeliveryManagement,
  },
  {
    path: '/accessories-management',
    protected: true,
    Component: AccessoriesManagement,
  }, {
    path: '/accessories-management-manage',
    protected: true,
    Component: AccessoriesAddEdit,
  },
  {
    path: '/accessories-management-manage/:id',
    protected: true,
    Component: AccessoriesAddEdit,
  },
  {
    path: '/service-management',
    protected: true,
    Component: ServiceManagement,
  },
  {
    path: '/service-management-details/:id',
    protected: true,
    Component: ServiceManagementDetails,
  },
  {
    path: '/service-management-pending',
    protected: true,
    Component: PendingServiceManagement,
  },
  {
    path: '/service-management-pending-details/:id',
    protected: true,
    Component: PendingServiceManagementDetails,
  },
  {
    path: '/verification-and-compliance',
    protected: true,
    Component: VerificationAndCompliance,
  },
  {
    path: '/verification-and-compliance-details/:id',
    protected: true,
    Component: VerificationAndComplianceDetails,
  },
  {
    path: '/user-management',
    protected: true,
    Component: UserManagement,
  },

  {
    path: '/user-management-view-user/:id',
    protected: true,
    Component: ViewUser,
  },
  {
    path: '/user-management-complaint',
    protected: true,
    Component: UserManagementComplaint,
  },
  {
    path: '/user-management-complaint-details/:id',
    protected: true,
    Component: UserManagementComplaintDetails,
  },
  {
    path: '/user-management-ban-users',
    protected: true,
    Component: UserManagementBanUsers,
  },
  {
    path: '/user-management-ban-user-details/:id',
    protected: true,
    Component: UserManagementBanUserDetails,
  },
  {
    path: '/vendor-management',
    protected: true,
    Component: VendorManagement,
  },
  {
    path: '/vendor-management-pending',
    protected: true,
    Component: PendingVendorManagement,
  },
  {
    path: '/vendor-management-view-vendor/:id',
    protected: true,
    Component: VendorManagementDetails,
  },
  {
    path: '/vendor-management-pending-vendor-details/:id',
    protected: true,
    Component: PendingVendorManagementDetails,
  },
  {
    path: '/delivery-rep-management',
    protected: true,
    Component: DeliveryRepManagement,
  },
  {
    path: '/delivery-rep-management-view/:id',
    protected: true,
    Component: DeliveryRepDetails,
  },
  {
    path: '/delivery-rep-management-pending',
    protected: true,
    Component: PendingDeliveryRepManagement,
  },
  {
    path: '/delivery-rep-management-infraction-history-detail/:id',
    protected: true,
    Component: InfractionHistoryDetailPage,
  },
  {
    path: '/delivery-rep-management-pending-delivery-rep-details/:id',
    protected: true,
    Component: PendingDeliveryRepDetails,
  },
  {
    path: '/revenue-management',
    protected: true,
    Component: RevenueManagement,
  },
  {
    path: '/revenue-breakdown',
    protected: true,
    Component: RevenueBreakDown,
  },
  {
    path: '/payout-management',
    protected: true,
    Component: PayoutManagement,
  },
  {
    path: '/payout-management-details/:id',
    protected: true,
    Component: PayoutManagementDetails,
  },
  {
    path: '/revenue-analytics',
    protected: true,
    Component: RevenueAnalytics,
  },
  {
    path: '/account-deletion',
    protected: true,
    Component: AccountDeletion
  },
  {
    path: '/account-deletion-view-details/:id',
    protected: true,
    Component: AccountDeletionDetails
  },
  {
    path: '/withdrawal-management',
    protected: true,
    Component: WithdrawalManagement
  },
  {
    path: '/withdrawal-management-details/:id',
    protected: true,
    Component: WithdrawalManagementDetails
  },
  {
    path: '/withdrawal-management-account-no-submission',
    protected: true,
    Component: AccountNumberSubmission
  },
  {
    path: '/withdrawal-management-account-no-submission-detail/:id',
    protected: true,
    Component: AccountNumberSubmissionDetails
  },
  {
    path: '/operating-locations',
    protected: true,
    Component: OperatingLocations
  },
  {
    path: 'operating-location-add',
    protected: true,
    Component: AddOperatingLocation
  },
  {
    path: 'operating-location-add/:id',
    protected: true,
    Component: AddOperatingLocation
  }, {

    path: 'operating-location-view/:id',
    protected: true,
    Component: OperatingLocationSettings
  }
  , {
    path: '/feedback',
    protected: true,
    Component: Feedback
  }, {
    path: '/feedback-view/:id',
    protected: true,
    Component: FeedbackTicketDetailCard
  }, {
    path: '/fraud-watch',
    protected: true,
    Component: FraudWatch
  }, {
    path: '/fraud-watch-suspicious-order-detail/:id',
    protected: true,
    Component: SuspiciousTransactions
  }, {
    path: '/fraud-watch-suspicious-vendor-withdrawals',
    protected: true,
    Component: SuspiciousVendorWithdrawals
  }, {
    path: '/fraud-watch-suspicious-vendor-withdrawal-details/:id',
    protected: true,
    Component: SuspiciousVendorWithdrawalDetails
  }
  , {
    path: '/reports-and-analytics',
    protected: true,
    Component: ReportsAndAnalytics
  }, {
    path: '/reports-and-analytics-profit-transafer-request',
    protected: true,
    Component: ProfiltTransferRequest
  }, {
    path: '/reports-and-analytics-profit-transafer-request-view-detail/:id',
    protected: true,
    Component: ProfiltTransferRequestDetails
  }
  , {
    path: '/crash-analytics',
    protected: true,
    Component: CrashAnalytics
  }
  , {
    path: '/crash-analytics-all-vitals',
    protected: true,
    Component: CrashAnalyticsAllVitals
  }
  , {
    path: '/crash-analytics-details/:id',
    protected: true,
    Component: CrashAnalyticsDetails
  },
  {
    path: '/audit-admin-logs',
    protected: true,
    Component: AdminLogs
  }
  ,
  {
    path: '/audit-admin-logs-details/:id',
    protected: true,
    Component: AdminlogsDetails
  },
  {
    path: '/audit-transaction-logs',
    protected: true,
    Component: TransactionLogs
  }
  ,
  {
    path: '/audit-transaction-logs-details/:id',
    protected: true,
    Component: TransactionLogsDetails
  }
  ,
  {
    path: '/system-push-notification-settings',
    protected: true,
    Component: PushNotifications
  }
  ,
  {
    path: '/system-push-notification-settings-details/:id',
    protected: true,
    Component: PushNotificationsDetails
  },

  {
    path: '/system-coupon-settings',
    protected: true,
    Component: CouponManagement
  },
  {
    path: '/system-coupon-settings-details/:id',
    protected: true,
    Component: CouponManagementDetails
  },{
    path: '/system-message-settings',
    protected: true,
    Component: MessageSettings
  },{
    path: '/staff-management',
    protected: true,
    Component: StaffManagement
  },
  ,{
    path: '/staff-management-add',
    protected: true,
    Component: StaffManagementAdd
  },{
    path: '/staff-management-add-role',
    protected: true,
    Component: StaffManagementAddRole
  },{
    path: '/staff-management-details/:id',
    protected: true,
    Component: StaffManagementDetails
  },{
    path: '/staff-management-role-details/:id',
    protected: true,
    Component: StaffManagementRoleDetails
  },
  
  


];

const AppRoutes: React.FC<AppRoutesProps> = ({
  isLoggedIn,
  currentUserId,
  handleLogin,
  handleLogout,
  sidebarCollapsed,
  toggleSidebar
}) => {
  const sharedProps = {
    userId: currentUserId,
    onLogout: handleLogout,
    sidebarCollapsed,
    toggleSidebar,
  };

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={
          isLoggedIn && currentUserId ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* Dynamic Routes */}
      {dynamicRoutes.map(({ path, protected: isProtected, Component, useLogout }, i) => {
        const shouldRender = !isProtected || (isLoggedIn && currentUserId);
        const element = useLogout
          ? <Component handleLogout={handleLogout} />
          : <Component handleLogout={handleLogout} {...(isProtected ? sharedProps : {})} />;

        return (
          <Route
            key={i}
            path={path}
            element={shouldRender ? element : <Navigate to="/login" replace />}
          />
        );
      })}

      {/* Default redirect */}
      <Route
        path="/"
        element={
          isLoggedIn && currentUserId ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
