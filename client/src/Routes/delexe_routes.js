/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Navigate } from 'react-router-dom';
import Aboutus from '../Pages/Aboutus';
import Contactus from '../Pages/Contactus';
import Dashboard from '../Pages/DelExe/Dashboard';
import PaymentManagement from '../Pages/DelExe/PaymentManagement';
import OrderManagement from '../Pages/DelExe/OrderManagement';
import Livesupport from '../Pages/Livesupport';
import AccountManagement from '../Pages/DelExe/AccountManagement';
import RewardsManagement from '../Pages/DelExe/RewardsManagement';
import UpdateProfile from '../Pages/UpdateProfile';
import TakeOrder from '../Pages/DelExe/Orders';

export default [
	{
		path: '/',
		exact: true,
		element: <Navigate to='/home' replace />,
	},
	{
		path: '/home',
		element: <Dashboard />,
	},
	{
		path: '/aboutus',
		element: <Aboutus />,
	},
	{
		path: '/contactus',
		element: <Contactus />,
	},
	{
		path: '/livesupport',
		element: <Livesupport />,
	},
	{
		path: '/order-management',
		element: <OrderManagement />,
	},
	{
		path: '/payment-management',

		element: <PaymentManagement />,
	},
	{
		path: '/account-management',

		element: <AccountManagement />,
	},
	{
		path: '/rewards-management',

		element: <RewardsManagement />,
	},
	{
		path: '/personal-information/:userId',
		element: <UpdateProfile />,
	},
	{
		path: '/take-order',
		element: <TakeOrder />,
	},
	{
		path: '*',
		element: <Navigate to='/home' replace />,
	},
];
