import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../Components/Button';
import PageWrapper from '../../Components/PageWrapper';
import PaymentModal from '../../Components/PaymentModal';
import RatingModal from '../../Components/RatingModal';
import { request, setItemHelper } from '../../util';

export default function TrackOrder() {
	const { user } = useSelector((st) => st.userDetails);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [state, setState] = useState({});
	const setItem = setItemHelper(state, setState);
	const [loading, setloading] = useState(false);
	let navigate = useNavigate();
	let params = useParams();
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	useEffect(() => {
		handleFetch();
	}, []);

	const handleFetch = async () => {
		await request('order/' + params.orderId, {
			method: 'GET',

			before: () => setloading(true),
			success: (d) => {
				setState(d.order);
			},
			after: () => {
				setloading(false);
			},
		});
	};
	const handleRating = async (st) => {
		await request('order-rating/' + state._id, {
			method: 'POST',
			parameters: { ...st, orderId: state._id, deliveryExecutiveId: state.deliveryExecutiveId._id },
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

	return (
		<PageWrapper>
			<div className='col-6 customer-management make-order'>
				<div className='breadscrumb'>
					<Link to='/'>Home</Link> &nbsp; &gt; &nbsp;
					<Link to={'/order-management'}>Order Management</Link> &nbsp; &gt; &nbsp;
					<Link to='/view-order'>View Order</Link>
				</div>
				<div className='head text-themed f600 mt-2'>
					Order ID: <span className='text-dark'>{state._id}</span>
				</div>

				<div className='my-3'>
					{state?.status === 'DELIVERED' ? (
						<h5 className='head text-themed f600'>Order Delivered!</h5>
					) : (
						<h5 className='head text-themed f600'>Order in Progress!</h5>
					)}
				</div>
				{!state?.deliveryExecutiveId?.name && (
					<div className='my-3 text-muted'>Soon a Delivery Executive will be assigned!</div>
				)}
				{state?.deliveryExecutiveId?.name && (
					<div className='my-3 text-muted'>
						<div className='mb-3'>DELIVERY EXECUTIVE DETAILS</div>
						<span className='f600'>Name:</span>&nbsp; {state?.deliveryExecutiveId?.name} <br />
						<span className='f600'>Contact Number:</span> &nbsp;{state?.deliveryExecutiveId?.number}
					</div>
				)}
				<div class='mb-3'>
					<label className='form-label mb-0'>
						PICK UP LOCATION <span className='red'>*</span>
					</label>
					<input
						type='text'
						disabled
						value={state?.pickupLocation}
						onChange={(e) => setItem('pickupLocation')(e.target.value)}
						className='form-control'
					/>
				</div>
				<div class='mb-3'>
					<label className='form-label mb-0'>
						DROP LOCATION <span className='red'>*</span>
					</label>
					<input
						type='text'
						disabled
						value={state?.dropLocation}
						onChange={(e) => setItem('dropLocation')(e.target.value)}
						className='form-control'
					/>
				</div>
				<div class='mb-3'>
					<label className='form-label mb-0'>Any Instructions to Delivery Executive</label>
					<textarea
						value={state?.instructions}
						disabled
						onChange={(e) => setItem('instructions')(e.target.value)}
						className='form-control'
					/>
				</div>
				<div className='invoice'>
					<div className='my-3'>
						<h5 className='head text-themed f600'>Invoice</h5>
						<div className='row no-gutters invoice-row mt-3'>
							<div className='col'>Base Delivery Fee</div>
							<div className='col text-end'>$5</div>
						</div>
						<div className='row no-gutters invoice-row mt-3'>
							<div className='col'>Total Distance Fee</div>
							<div className='col text-end'>
								{(parseInt(state?.amount) - 5) / 1.5}mi&nbsp;x $1.5 = &nbsp;${+state?.amount - 5}
							</div>
						</div>
						<div className='row no-gutters invoice-row mt-3 f600 border-none'>
							<div className='col'>To Pay</div>
							<div className='col text-end'>${+state?.amount}</div>
						</div>
					</div>
				</div>
			</div>
			<RatingModal isOpen={isModalOpen} close={toggleModal} onSubmit={handleRating} state={state} />
			{state.status === 'DELIVERED' ? (
				<Button disabled={state.rated} onClick={toggleModal} theme='carry-btn'>
					Rate your Delivery
				</Button>
			) : (
				<Button onClick={() => window.location.reload()} theme='carry-btn'>
					Track Order
				</Button>
			)}
		</PageWrapper>
	);
}
