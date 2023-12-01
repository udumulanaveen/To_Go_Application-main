import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Button from './Button';
import LoadingIndicator from './LoadingIndicator';
import { modalStyle, setItemHelper } from '../util';

export default function PaymentModal({ isOpen, close, onSubmit }) {
	const [state, setState] = useState({});
	const setItem = setItemHelper(state, setState);
	const [loading, setloading] = useState(false);
	ReactModal.setAppElement('body');

	const handleSubmit = async () => {
		onSubmit(state);
	};

	return (
		<ReactModal style={modalStyle} isOpen={isOpen} onCloseModal={close}>
			<span role={'button'} onClick={close} className='close-button'>
				x
			</span>
			<div className='p-3 login mos-modal payment-modal position-relative'>
				<h4>Make Payment</h4>
				<div className='my-3'>
					<h6>Personal Details</h6>
					<div className='row no-gutters'>
						<div className='col'>
							<div class='mb-3'>
								<label className='form-label mb-0'>
									<span className='red'>*</span> First Name
								</label>
								<input
									type='text'
									onChange={(e) => setItem('firstName')(e.target.value)}
									value={state?.firstName}
									className='form-control'
								/>
							</div>
						</div>
						<div className='col'>
							<div class='mb-3'>
								<label className='form-label mb-0'>
									<span className='red'>*</span> Last Name
								</label>
								<input
									type='text'
									onChange={(e) => setItem('lastName')(e.target.value)}
									value={state?.lastName}
									className='form-control'
								/>
							</div>
						</div>
					</div>
					<div class='mb-3'>
						<label className='form-label mb-0'>
							<span className='red'>*</span> Email address
						</label>
						<input
							type='email'
							onChange={(e) => setItem('email')(e.target.value)}
							value={state?.email}
							className='form-control'
						/>
					</div>
				</div>
				<div className='my-3'>
					<h6>Card Details</h6>
					<div class='mb-3'>
						<label className='form-label mb-0'>
							<span className='red'>*</span> Name On Card
						</label>
						<input
							type='text'
							onChange={(e) => setItem('nameOnCard')(e.target.value)}
							value={state?.nameOnCard}
							className='form-control'
						/>
					</div>
					<div class='mb-3'>
						<label className='form-label mb-0'>
							<span className='red'>*</span> Card Number
						</label>
						<input
							type='text'
							onChange={(e) => setItem('cardNo')(e.target.value)}
							value={state?.cardNo}
							className='form-control'
						/>
					</div>
					<div className='row no-gutters'>
						<div className='col'>
							<div class='mb-3'>
								<label className='form-label mb-0'>
									<span className='red'>*</span> Valid through (MM/YY)
								</label>
								<input
									type='text'
									onChange={(e) => setItem('validThru')(e.target.value)}
									value={state?.validThru}
									className='form-control'
								/>
							</div>
						</div>
						<div className='col'>
							<div class='mb-3'>
								<label className='form-label mb-0'>
									<span className='red'>*</span> CVV(3 Digits)
								</label>
								<input
									type='text'
									onChange={(e) => setItem('cvv')(e.target.value)}
									value={state?.cvv}
									className='form-control'
								/>
							</div>
						</div>
					</div>
					<div class='mb-3 promo-input'>
						<input
							type='text'
							onChange={(e) => setItem('promocode')(e.target.value)}
							value={state?.promocode}
							className='form-control'
							placeholder='Do you have a promo code?'
						/>
						<p className='f10 text-muted'>Terms & conditions may apply*</p>
					</div>
				</div>
				<div className='my-5'></div>
				<LoadingIndicator active={loading}> </LoadingIndicator>
				<div className='d-flex justify-content-around'></div>
				<Button theme={'secondary'} onClick={close}>
					Cancel
				</Button>
				<Button onClick={handleSubmit}>Pay now</Button>
			</div>
		</ReactModal>
	);
}
