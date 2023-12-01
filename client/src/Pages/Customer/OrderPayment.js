import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../Components/Button';
import PageWrapper from '../../Components/PageWrapper';
import PaymentModal from '../../Components/PaymentModal';
import { request, setItemHelper } from '../../util';

export default function OrderPayment() {
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
	const handlePayment = async (st) => {
		await request('order-payment/' + state._id, {
			method: 'POST',
			parameters: { ...st,userId: user._id, orderId: state._id, amount: state.amount, rewards: (state.amount)/10 },
			before: () => setloading(true),
			success: (d) => {
				window.location.reload();
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
				{state?.paid ? (
					<div className='head text-themed f600'>
						Order ID: <span className='text-dark'>{state._id}</span>
					</div>
				) : (
					<div className='breadscrumb'>
						<Link to='/'>Home</Link> &nbsp; &gt; &nbsp;
						<Link to={'/make-order'}>Make an order</Link> &nbsp; &gt; &nbsp;
						<Link>Confirm Order</Link>
					</div>
				)}
				<div className='my-3'>
					{state?.paid ? (
						<h5 className='head text-themed f600'>Order Submitted Succesfully!</h5>
					) : (
						<h5 className='head text-themed f600'>Review Your Order!</h5>
					)}
				</div>
				{state?.paid && <div className='my-3 text-muted'>Soon a Delivery Executive will be assigned!</div>}
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
								{(parseFloat(state?.amount).toFixed(2) - 5) / 1.5}mi&nbsp;x $1.5 = &nbsp;${+state?.amount - 5}
							</div>
						</div>
						<div className='row no-gutters invoice-row mt-3 f600 border-none'>
							<div className='col'>To Pay</div>
							<div className='col text-end'>${+state?.amount}</div>
						</div>
					</div>
				</div>
			</div>
			<PaymentModal isOpen={isModalOpen} close={toggleModal} onSubmit={handlePayment} />
			{!state.paid ? (
				<Button onClick={toggleModal} theme='carry-btn'>
					Pay Now
				</Button>
			) : (
				<Button onClick={() => navigate(`/track-order/${state._id}`)} theme='carry-btn'>
					Track Order
				</Button>
			)}
		</PageWrapper>
	);
}
