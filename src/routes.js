import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AccountView from 'src/views/account/AccountView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import StudentListView from 'src/views/ListView/StudentListView'
import DriverListView from 'src/views/ListView/DriverListView'
import ConductorListView from 'src/views/ListView/ConductorListView'
import BusListView from 'src/views/ListView/BusListView';
import RouteListView from 'src/views/ListView/RouteListView';
import StopListView from 'src/views/ListView/StopListView';
import AdminListView from 'src/views/ListView/AdminListView';
import SubAdminListView from 'src/views/ListView/SubAdminListView';
import TripListView from 'src/views/ListView/TripListView'
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';
import NotFoundView from 'src/views/errors/NotFoundView';
import FeedBackListView from 'src/views/ListView/FeedBackListView';
import NotificationListView from './views/ListView/NotificationListView';
import ProtectedRoute from 'src/components/ProtectedRoute'

export default function Routes() {
  
  const state = useSelector(s => s)
  // console.log(state)
  const routes = [
    {
      path: '/',
      children: [
        { path: 'login', element: <LoginView /> },
        { path: '404', element: <NotFoundView /> },
        { path: '/', element: <Navigate to="login" /> },
        { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    {
      path: 'app',
      element: <ProtectedRoute component={DashboardLayout} login={state.isLoggedIn}/>,
      children: [
        { path: 'account', element: <AccountView /> },
        { path: 'students', element: <StudentListView /> },
        { path: 'drivers', element: <DriverListView /> },
        { path: 'conductors', element: <ConductorListView /> },
        { path: 'buses', element: <BusListView /> },
        { path: 'routes', element: <RouteListView /> },
        { path: 'stops', element: <StopListView /> },
        { path: 'subadmins', element: <SubAdminListView /> },
        { path: 'admins', element: <AdminListView /> },
        { path: 'dashboard', element: <DashboardView />},
        { path: 'trips', element: <TripListView /> },
        { path: 'notifications', element: <NotificationListView /> },
        { path: 'feedbacks', element: <FeedBackListView /> },
        { path: 'products', element: <ProductListView /> },
        { path: 'settings', element: <SettingsView /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ];
  return routes
}