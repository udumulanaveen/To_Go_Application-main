import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from './Button';
import { modalStyle, request, setItemHelper } from '../util';

export default function Complaint({ isOpen, close }) {
	const [state, setState] = useState({});
	const setItem = setItemHelper(state, setState);
	const [loading, setloading] = useState(false);
	ReactModal.setAppElement('body');

	const handleSubmit = async () => {
		await request('complaint', {
			method: 'POST',
			parameters: state,
			before: () => setloading(true),
			success: (data) => {
				toast.success('Your complaint has been recorded!');
			},
			failure: (data) => {
				toast.error(data.message || 'Something went wrong!');
			},
			after: () => {
				setState({});
				setloading(false);
				close();
			},
		});
	};

	return (
		<ReactModal style={modalStyle} isOpen={isOpen} onCloseModal={close}>
			<span role={'button'} onClick={close} className='close-button'>
				x
			</span>
			<div className='p-3 login mos-modal position-relative'>
				<h4>Raise a complaint</h4>
				<div class='mb-3'>
					<label className='form-label mb-0'>
						<span className='red'>*</span> Name
					</label>
					<input
						type='name'
						onChange={(e) => setItem('name')(e.target.value)}
						value={state?.name}
						className='form-control'
					/>
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
				<div class='mb-3'>
					<label className='form-label mb-0'>
						<span className='red'>*</span> OrderId
					</label>
					<input
						type='text'
						value={state?.orderId}
						onChange={(e) => setItem('orderId')(e.target.value)}
						className='form-control'
					/>
				</div>
				<div class='mb-3'>
					<label className='form-label mb-0'>
						<span className='red'>*</span> Description
					</label>
					<textarea
						type='text'
						value={state?.description}
						onChange={(e) => setItem('description')(e.target.value)}
						className='form-control'
					/>
				</div>
				<div className='my-5'></div>
				<Button disabled={loading} onClick={handleSubmit} theme={'w-100'}>
					Submit
				</Button>
			</div>
		</ReactModal>
	);
}
