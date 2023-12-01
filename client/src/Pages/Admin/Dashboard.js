import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import PageWrapper from '../../Components/PageWrapper';

export default function Dashboard() {
	return (
		<PageWrapper>
			<div className='row no-gutters col-8 dashboard-container justify-content-around'>
				<Link to='/customer-management' className='col-6 mx-auto'>
					<div className='nav-holder'>
						<img src={require('../../assets/customer-management.svg').default} alt='' />
					</div>
					<p className='text-themed'>Customer Management</p>
				</Link>
				<Link to='/de-management' className='col-6 mx-auto'>
					<div className=' nav-holder'>
						<img src={require('../../assets/delivery-executive.svg').default} alt='' />
					</div>
					<p className='text-themed'>Delivery Executive Management</p>
				</Link>
				<Link to='/order-management' className='col-6 mx-auto'>
					<div className=' nav-holder mt-5'>
						<img src={require('../../assets/order-management.svg').default} alt='' />
					</div>
					<p className='text-themed'>Order Management</p>
				</Link>
				<Link to='/complaints' className='col-6 mx-auto'>
					<div className=' nav-holder mt-5'>
						<img src={require('../../assets/complaints.svg').default} alt='' />
					</div>
					<p className='text-themed'>Complaint and Feedback Management</p>
				</Link>
			</div>
			{/* <Button theme='carry-btn'>Manage Rewards</Button> */}
		</PageWrapper>
	);
}
