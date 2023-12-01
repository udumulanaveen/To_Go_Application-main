import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import PageWrapper from '../../Components/PageWrapper';
import { request } from '../../util';
import { toast } from 'react-toastify';
import CustomerRatingModal from '../../Components/CustomerRatingModal';

export default function OrderManagement() {
	const { user } = useSelector((st) => st.userDetails);
	const [state, setState] = useState([]);
	const [loading, setloading] = useState(false);
	const [order, setOrder] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	let navigate = useNavigate();
	const toggleModal = (d) => {
		setIsModalOpen(!isModalOpen);
		setOrder(d)
	};

	useEffect(() => {
		handleFetch();
	}, []);

	const handleRating = async (st) => {
		console.log(st,order);
		await request('customer-rating/' + order._id, {
			method: 'POST',
			parameters: { ...st, orderId: order._id, customerId: order.customerId._id },
			before: () => setloading(true),
			success: (d) => {
				toast.success('Thanks for the rating!');
				setTimeout(() => window.location.reload(), 3000);
			},
			failure: (d) => {
				toast.error(d.message);
			},

			after: () => {
				setloading(false);
			},
		});
	};

	const handleFetch = async () => {
		await request('orders/' + user._id, {
			method: 'GET',

			before: () => setloading(true),
			success: (d) => {
				setState(d.orders);
			},
			after: () => {
				setloading(false);
			},
		});
	};

	const handleSetAsDelivered = async (orderId) => {
		await request(`mark-as-delivered/${orderId}/${user?._id}`, {
			method: 'PUT',

			before: () => setloading(true),
			success: (d) => {
				window.location.reload();
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
					<Link to={'/order-management'}>Order Management</Link>
				</div>
				<div className='my-3'>
					<h5 className='head text-themed f600 mt-2'>Order Management</h5>
				</div>
				{state.map((d) => (
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
						{d?.status !== 'DELIVERED' && (
							<div className='col-3'>
								<div className='d-flex-justify-content-center'>
									<Button onClick={() => handleSetAsDelivered(d._id)}>Mark As Delivered</Button>
								</div>
							</div>
						)}
							<CustomerRatingModal isOpen={isModalOpen} close={toggleModal} onSubmit={handleRating} state={order} />
						{d?.status === 'DELIVERED' && (
							<>

							<div className='col-3'>
								<div className='d-flex-justify-content-center'>
									<Button disabled>{d?.status}</Button>
									
								</div>
								<div style={{marginTop:"10px"}} className='d-flex-justify-content-center'>
									{ d?.rated_customer ? '' :

									<Button onClick={() => toggleModal(d)}>
										Rate Customer
									</Button> 
									}
								</div>
							</div>
							
							</>
			
						)}
					</div>
				))}
			</div>
		</PageWrapper>
	);
}
