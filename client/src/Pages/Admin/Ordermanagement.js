import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OrderDetails from '../../Components/OrderDetails';
import PageWrapper from '../../Components/PageWrapper';
import { request } from '../../util';

export default function OrderManagement() {
	const { user } = useSelector((st) => st.userDetails);
	const [state, setState] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setloading] = useState(false);
	let navigate = useNavigate();
	const [selectedOrder, setSelectedOrder] = useState(null);

	useEffect(() => {
		handleFetch();
	}, []);

	const handleSelectOrder = (order) => {
		setSelectedOrder(order);
		setIsModalOpen(true);
	};

	const handleFetch = async () => {
		await request('orders/all', {
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

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<PageWrapper>
			<div className='customer-management make-order'>
				<div className='breadscrumb'>
					<Link to='/'>Home</Link> &nbsp; &gt; &nbsp;
					<Link to={'/order-management'}>Order Management</Link>
				</div>
				<h5 className='head text-themed f600 mt-2'>Order Management</h5>
			</div>
			<OrderDetails isOpen={isModalOpen} close={toggleModal} state={selectedOrder} />
			<table className='table table-borderless table-responsive text-center'>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Date</th>
						<th>Customer ID</th>
						<th>Delivery Executive ID</th>
						<th>Amount</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{state?.map((order) => (
						<tr onClick={() => handleSelectOrder(order)} role={'button'} key={order._id}>
							<th>{order._id}</th>
							<td>{moment(order.createdAt).format('DD/MM/YYYY')}</td>
							<td>{order?.customerId?._id}</td>
							<td>{order?.deliveryExecutiveId?._id}</td>
							<td>${order.amount}</td>
							<td>{order.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</PageWrapper>
	);
}
