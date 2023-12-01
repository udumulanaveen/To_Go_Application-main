import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import ConfirmationModal from '../../Components/ConfirmationModal';
import PageWrapper from '../../Components/PageWrapper';
import { request } from '../../util';

export default function TakeOrder() {
	const [data, setData] = useState([]);
	const [loading, setloading] = useState(false);
	const { user } = useSelector((st) => st.userDetails);

	const navigate = useNavigate();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		await request('unassigned-orders', {
			method: 'GET',
			before: () => setloading(true),
			success: (d) => {
				setData(d.orders);
			},

			after: () => {
				setloading(false);
			},
		});
	};

	const handleUpdateStatus = async (orderId) => {
		await request(`order-assign/${orderId}/${user?._id}`, {
			method: 'PUT',
			before: () => setloading(true),
			success: (d) => {
				navigate('/order-management');
			},
			after: () => {
				setloading(false);
			},
		});
	};

	return (
		<PageWrapper>
			<div className='col-8 customer-management'>
				<div className='breadscrumb'>
					<Link to='/'>Home</Link> &nbsp; &gt; &nbsp;
					<Link>Take an Order</Link>
				</div>
				<div className='my-3'>
					<h5 className='head text-themed f600'>ToGo Orders</h5>
				</div>
				{data.map((d) => (
					<div key={d._id} className='row no-gutters profile'>
						<div className='col'>
							<div className=''>
								<p>
									<span className='text-themed'>Order ID:</span> &nbsp;
									{d?._id}
								</p>
								<p>
									<span className='text-themed'>Name:</span> &nbsp;
									{d?.customerId?.name}
								</p>
								<p>
									<span className='text-themed'>Contact:</span> &nbsp;
									{d?.customerId?.number}
								</p>
								<p>
									<span className='text-themed'>Pick Up Location:</span> &nbsp;
									{d?.pickupLocation}
								</p>
								<p>
									<span className='text-themed'>Drop Location:</span> &nbsp;
									{d?.dropLocation}
								</p>
							</div>
						</div>
						<div className='col-3'>
							<div className='d-flex-justify-content-center'>
								<Button onClick={() => handleUpdateStatus(d._id)}>Assign to Self</Button>
							</div>
						</div>
					</div>
					
				))}
				
			</div>
		</PageWrapper>
	);
}
