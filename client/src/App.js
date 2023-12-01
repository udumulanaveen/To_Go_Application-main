import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import auth_routes from './Routes/auth_routes';
import admin_routes from './Routes/admin_routes';
import customer_routes from './Routes/Customer_routes';
import delexe_routes from './Routes/delexe_routes';

function App() {
	const { user } = useSelector((st) => st.userDetails);

	const withWrap = (rts) => (
		<Router>
			<Header userType={user?.role} />
			<Routes>
				{rts.map((route, index) => {
					return <Route key={index} path={route.path} element={route.element} />;
				})}
			</Routes>
			<p className='cp-right'>© 2022 ToGo Application. All Rights Reserved.</p>
		</Router>
	);

	switch (user?.role) {
		case 'ADMIN':
			return withWrap(admin_routes);
		case 'CUSTOMER':
			return withWrap(customer_routes);
		case 'DELIVERY_EXECUTIVE':
			return withWrap(delexe_routes);
		default:
			return withWrap(auth_routes);
	}
}

export default App;
