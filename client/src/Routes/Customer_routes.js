/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Navigate } from 'react-router-dom';
import Aboutus from '../Pages/Aboutus';
import Contactus from '../Pages/Contactus';
import Dashboard from '../Pages/Customer/Dashboard';
import PaymentManagement from '../Pages/Customer/PaymentManagement';
import OrderManagement from '../Pages/Customer/OrderManagement';
import Livesupport from '../Pages/Livesupport';
import AccountManagement from '../Pages/DelExe/AccountManagement';
import RewardsManagement from '../Pages/DelExe/RewardsManagement';
import MakeOrder from '../Pages/Customer/MakeOrder';
import OrderPayment from '../Pages/Customer/OrderPayment';
import TrackOrder from '../Pages/Customer/TrackOrder';
import UpdateProfile from '../Pages/UpdateProfile';

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
		path: '/make-order',

		element: <MakeOrder />,
	},
	{
		path: '/order-payment/:orderId',

		element: <OrderPayment />,
	},
	{
		path: '/track-order/:orderId',

		element: <TrackOrder />,
	},
	{
		path: '/personal-information/:userId',
		element: <UpdateProfile />,
	},
	{
		path: '*',
		element: <Navigate to='/home' replace />,
	},
];
