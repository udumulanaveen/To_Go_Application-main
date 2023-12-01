import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Button from './Button';
import LoadingIndicator from './LoadingIndicator';
import { modalStyle, setItemHelper } from '../util';
import ReactStars from 'react-rating-stars-component';

export default function RatingModal({ isOpen, close, onSubmit, state }) {
	const [st, setSt] = useState({});
	const setItem = setItemHelper(st, setSt);
	const [loading, setloading] = useState(false);
	console.log(state);
	ReactModal.setAppElement('body');

	const handleSubmit = async () => {
		onSubmit(st);
	};

	return (
		<ReactModal style={modalStyle} isOpen={isOpen} onCloseModal={close}>
			<span role={'button'} onClick={close} className='close-button'>
				x
			</span>
			<div className='p-3 login mos-modal position-relative'>
				<h4 className='head text-themed f600 mt-3'>Rate your Delivery</h4>
				<div className='my-3 text-muted'>
					<div className='mb-3'>DELIVERY EXECUTIVE DETAILS</div>
					<span className='f600'>Name:</span>&nbsp; {state?.deliveryExecutiveId?.name} <br />
					<span className='f600'>Contact Number:</span> &nbsp;{state?.deliveryExecutiveId?.number}
				</div>
				<div className='my-3 text-muted'>
					<div className='mb-0'>DELIVERY EXECUTIVE DETAILS</div>
					<ReactStars count={5} onChange={setItem('rating')} size={32} activeColor='#ffd700' />
				</div>
				<div className='my-3 text-muted'>
					<div className='mb-0'><span className='red'>*</span>FEEDBACK</div>
					<textarea
						value={state?.feedback}
						onChange={(e) => setItem('feedback')(e.target.value)}
						className='form-control'
					/>
				</div>
				<div className='my-5'></div>
				<LoadingIndicator active={loading}> </LoadingIndicator>
				<Button theme={'w-100'} onClick={handleSubmit}>
					Submit
				</Button>
			</div>
		</ReactModal>
	);
}
