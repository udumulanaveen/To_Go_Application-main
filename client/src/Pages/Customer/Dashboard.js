import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import PageWrapper from '../../Components/PageWrapper';

export default function Dashboard() {
	let navigate = useNavigate();
	const { user: loggedInUser } = useSelector((st) => st.userDetails);
	return (
		<PageWrapper>
			<div className='row no-gutters col-8 dashboard-container justify-content-around'>
				<Link to={`/personal-information/${loggedInUser?._id}`} className='col-6 mx-auto'>
					<div className='nav-holder'>
						<img src={require('../../assets/customer-management.svg').default} alt='' />
					</div>
					<p className='text-themed'>Account Management</p>
				</Link>
				<Link to='/payment-management' className='col-6 mx-auto'>
					<div className=' nav-holder'>
						<img src={require('../../assets/payment.svg').default} alt='' />
					</div>
					<p className='text-themed'>Payment Management</p>
				</Link>
				<Link to='/order-management' className='col-6 mx-auto'>
					<div className=' nav-holder mt-5'>
						<img src={require('../../assets/order-management.svg').default} alt='' />
					</div>
					<p className='text-themed'>Order Management</p>
				</Link>
				<Link to='/rewards-management' className='col-6 mx-auto'>
					<div className=' nav-holder mt-5'>
						<img src={require('../../assets/reward.svg').default} alt='' />
					</div>
					<p className='text-themed'>Rewards Management</p>
				</Link>
			</div>
			<Button onClick={() => navigate('/make-order')} theme='carry-btn'>
				Make an Order
			</Button>
		</PageWrapper>
	);
}
