import React from 'react';
import ReactModal from 'react-modal';
import { modalStyle } from '../util';

export default function OrderDetails({ state, isOpen, close }) {
	return (
		<ReactModal style={modalStyle} isOpen={isOpen} onCloseModal={close}>
			<div className='order-detail-modal'>
				<span role={'button'} onClick={close} className='close-button'>
					x
				</span>
				<div className='head text-themed f600 mt-2'>
					Order ID: <span className='text-dark'>{state?._id}</span>
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
				{state?.customerId?.name && (
					<div className='my-3 text-muted'>
						<div className='mb-3'>CUSTOMER DETAILS</div>
						<span className='f600'>Name:</span>&nbsp; {state?.customerId?.name} <br />
						<span className='f600'>Contact Number:</span> &nbsp;{state?.customerId?.number}
					</div>
				)}
				<div class='mb-3'>
					<label className='form-label mb-0'>
						PICK UP LOCATION <span className='red'>*</span>
					</label>
					<input type='text' disabled value={state?.pickupLocation} className='form-control' />
				</div>
				<div class='mb-3'>
					<label className='form-label mb-0'>
						DROP LOCATION <span className='red'>*</span>
					</label>
					<input type='text' disabled value={state?.dropLocation} className='form-control' />
				</div>
				<div class='mb-3'>
					<label className='form-label mb-0'>Any Instructions to Delivery Executive</label>
					<textarea value={state?.instructions} disabled className='form-control' />
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
		</ReactModal>
	);
}
