/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Home from '../Pages/Home';
import Aboutus from '../Pages/Aboutus';
import Contactus from '../Pages/Contactus';
import { Navigate } from 'react-router-dom';
import Livesupport from '../Pages/Livesupport';

export default [
	{
		path: '/',
		element: <Navigate to='/home' replace />,
	},
	{
		path: '/home',
		element: <Home />,
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
		path: '*',
		element: <Navigate to='/' replace />,
	},
];
