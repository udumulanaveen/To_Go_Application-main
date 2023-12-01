/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Dashboard from '../Pages/Admin/Dashboard';
import Customermanagement from '../Pages/Admin/Customermanagement';
import DEManagement from '../Pages/Admin/DEManagement';
import Ordermanagement from '../Pages/Admin/Ordermanagement';
import Complaints from '../Pages/Admin/Complaints';
import { Navigate } from 'react-router-dom';
import Aboutus from '../Pages/Aboutus';
import Contactus from '../Pages/Contactus';
import Livesupport from '../Pages/Livesupport';
import UpdateProfile from '../Pages/UpdateProfile';

export default [
	{
		path: '/',
		element: <Navigate to='/home' replace />,
	},
	{
		path: '/home',
		element: <Dashboard />,
	},
	{
		path: '/customer-management',
		element: <Customermanagement />,
	},
	{
		path: '/de-management',
		element: <DEManagement />,
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
		element: <Ordermanagement />,
	},
	{
		path: '/complaints',
		element: <Complaints />,
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
