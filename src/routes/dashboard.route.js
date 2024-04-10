import { lazy } from 'react';

const OrderMedicalForm = lazy(() => import('../pages/OrderMedicalForm'));
const Profile = lazy(() => import('../pages/Profile'));
const HistoryOrder = lazy(() => import('../pages/HistoryOrder'));
const ApproveMedicalForm = lazy(() => import('../pages/ApproveMedicalForm'));
const ManageUsers = lazy(() => import('../pages/ManageUsers'));
const ManageRoles = lazy(() => import('../pages/ManageRoles'));
const ManageDepartments = lazy(() => import('../pages/ManageDepartments'));
const ManageDoctors = lazy(() => import('../pages/ManageDoctors'));
const ManageWorkingPlans = lazy(() => import('../pages/ManageWorkingPlans'));
const ManageWorkingTimes = lazy(() => import('../pages/ManageWorkingTimes'));
const ChartOrder = lazy(() => import('../pages/ChartOrder'));

const dashboardRoutes = [
  {
    path: '/dashboard/order-medical-form',
    title: 'Đặt lịch khám bệnh',
    component: OrderMedicalForm,
  },
  {
    path: '/dashboard/profile',
    title: 'Thông tin cá nhân',
    component: Profile,
  },
  {
    path: '/dashboard/history-order',
    title: 'Lịch sử khám bệnh',
    component: HistoryOrder,
  },
  {
    path: '/dashboard/approve-medical-form',
    title: 'Phê duyệt đơn khám bệnh',
    component: ApproveMedicalForm,
  },
  {
    path: '/dashboard/chart-order',
    title: 'Thống kê đơn khám bệnh',
    component: ChartOrder,
  },
  {
    path: '/dashboard/manage-users',
    title: 'Quản lý tài khoản',
    component: ManageUsers,
  },
  {
    path: '/dashboard/manage-roles',
    title: 'Quản lý quyền',
    component: ManageRoles,
  },
  {
    path: '/dashboard/manage-departments',
    title: 'Quản lý chuyên khoa',
    component: ManageDepartments,
  },
  {
    path: '/dashboard/manage-doctors',
    title: 'Quản lý bác sĩ',
    component: ManageDoctors,
  },
  {
    path: '/dashboard/manage-working-plans',
    title: 'Quản lý lịch làm việc',
    component: ManageWorkingPlans,
  },
  {
    path: '/dashboard/manage-working-times',
    title: 'Quản lý ca làm việc',
    component: ManageWorkingTimes,
  },
];

export default dashboardRoutes;
