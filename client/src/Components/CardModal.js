import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import Button from './Button';
import LoadingIndicator from './LoadingIndicator';
import { modalStyle, setItemHelper } from '../util';

export default function CardModal({ isOpen, close, onSubmit, paymentInfo }) {
	const [state, setState] = useState({});
	console.log(paymentInfo);
	const setItem = setItemHelper(state, setState);
	const [loading, setloading] = useState(false);
	ReactModal.setAppElement('body');


	const handleSubmit = async () => {
		onSubmit(state);
	};

	const populate = () => {
		setState(paymentInfo);
	}

	useEffect(() => {
		setState({});
	},[]);


	return (
		<ReactModal style={modalStyle} isOpen={isOpen} onCloseModal={close}>
			<span role={'button'} onClick={close} className='close-button'>
				x
			</span>
			{paymentInfo && <Button
			onClick={populate}
			>
				Populate
			</Button>}
			<div className='p-3 login mos-modal payment-modal position-relative'>
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
				</div>
				<div className='my-5'></div>
				<LoadingIndicator active={loading}> </LoadingIndicator>
				<div className='d-flex justify-content-around'></div>
				<Button theme={'secondary'} onClick={close}>
					Cancel
				</Button>
				<Button onClick={handleSubmit}>Save</Button>
			</div>
		</ReactModal>
	);
}
