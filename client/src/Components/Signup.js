import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import Login from './Login';
import LoadingIndicator from '../Components/LoadingIndicator';
import { modalStyle, modalStyle2, request, setItemHelper } from '../util';

export default function Signup({ isOpen, close, role = 'CUSTOMER' }) {
	const [state, setState] = useState({
		role,
	});
	const setItem = setItemHelper(state, setState);
	const [modal, setModal] = useState('');
	const [loading, setloading] = useState(false);
	ReactModal.setAppElement('body');

	const handleSubmit = async () => {
		await request('auth/signup', {
			method: 'POST',
			parameters: state,
			before: () => setloading(true),
			success: () => {
				toast.success('Signup Successfull');
			},
			failure: (data) => {
				toast.error(data.message || 'Something went wrong!');
			},
			after: () => {
				setState({
					role,
				});
				setloading(false);
				close();
			},
		});
	};

	if (role === 'CUSTOMER') {
		return (
			<ReactModal style={modalStyle} isOpen={isOpen} onCloseModal={close}>
				<span role={'button'} onClick={close} className='close-button'>
					x
				</span>
				<div className='p-3 login mos-modal position-relative'>
					<h4>Sign Up</h4>
					<p className='mb-3'>Get started with ToGo</p>
					<div class='mb-3'>
						<label className='form-label mb-0'>
							<span className='red'>*</span>Name
						</label>
						<input
							type='text'
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
							<span className='red'>*</span> Password
						</label>
						<input
							type='password'
							value={state?.password}
							onChange={(e) => setItem('password')(e.target.value)}
							className='form-control'
						/>
					</div>
					<div class='mb-3'>
						<label className='form-label mb-0'>
							<span className='red'>*</span> Contact Number
						</label>
						<input
							type='text'
							value={state?.number}
							onChange={(e) => setItem('number')(e.target.value)}
							className='form-control'
						/>
					</div>
					<div className='my-3 d-flex'>
						<p className='mb-0'>Already have an account?</p> &nbsp; 
						{
						<Link
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setModal('signin');
							}}
							to={'/'}
							role={'button'}
						>
							Signin
						</Link>
						}
					</div>
					<Login isOpen={modal === 'signin'} close={() => setModal('')} />
					<div className='my-5'></div>
					<LoadingIndicator active={loading}> </LoadingIndicator>
					<Button onClick={handleSubmit} theme={'w-100'}>
						Sign Up
					</Button>
				</div>
			</ReactModal>
		);
	}
	return (
		<ReactModal style={modalStyle2} isOpen={isOpen} onCloseModal={close}>
			<span role={'button'} onClick={close} className='close-button'>
				x
			</span>
			<div className='p-3 login mos-modal position-relative'>
				<h4>Sign Up</h4>
				<p className='mb-3'>Get started with ToGo</p>
				<div class='mb-3'>
					<label className='form-label mb-0'>
						<span className='red'>*</span>Name
					</label>
					<input
						type='text'
						onChange={(e) => setItem('name')(e.target.value)}
						value={state?.name}
						className='form-control'
					/>
				</div>
				<div className='row no-gutters'>
					<div className='col'>
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
					<div className='col'>
						<div class='mb-3'>
							<label className='form-label mb-0'>
								<span className='red'>*</span> Password
							</label>
							<input
								type='password'
								value={state?.password}
								onChange={(e) => setItem('password')(e.target.value)}
								className='form-control'
							/>
						</div>
					</div>
				</div>

				<div className='row no-gutters'>
					<div className='col'>
						<div class='mb-3'>
							<label className='form-label mb-0'>
								<span className='red'>*</span> Contact Number
							</label>
							<input
								type='text'
								value={state?.number}
								onChange={(e) => setItem('number')(e.target.value)}
								className='form-control'
							/>
						</div>
					</div>
					<div className='col'>
						<div class='mb-3'>
							<label className='form-label mb-0'>
								<span className='red'>*</span>Address
							</label>
							<input
								type='text'
								onChange={(e) => setItem('address')(e.target.value)}
								value={state?.address}
								className='form-control'
							/>
						</div>
					</div>
				</div>

				<div className='row no-gutters'>
					<div className='col'>
						<div class='mb-3'>
							<label className='form-label mb-0'>
								<span className='red'>*</span>Name Of Bank
							</label>
							<input
								type='text'
								onChange={(e) => setItem('bankName')(e.target.value)}
								value={state?.bankName}
								className='form-control'
							/>
						</div>
					</div>
					<div className='col'>
						<div className='row no-gutters'>
							<div className='col'>
								<div class='mb-3'>
									<label className='form-label mb-0'>
										<span className='red'>*</span> Account Number
									</label>
									<input
										type='text'
										value={state?.accNo}
										onChange={(e) => setItem('accNo')(e.target.value)}
										className='form-control'
									/>
								</div>
							</div>
							<div className='col'>
								<div class='mb-3'>
									<label className='form-label mb-0'>
										<span className='red'>*</span> Routing Number
									</label>
									<input
										type='text'
										value={state?.routingNo}
										onChange={(e) => setItem('routingNo')(e.target.value)}
										className='form-control'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='my-3 d-flex'>
					<p className='mb-0'>Already have an account ? </p> 

					{
						<Link
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setModal('signin');
							}}
							to={'/'}
							role={'button'}
						>
							Signin
						</Link>
						}
				</div>
				<Login isOpen={modal === 'signin'} close={() => setModal('')} />
				<div className='my-5'></div>
				<LoadingIndicator active={loading}></LoadingIndicator>
				<Button onClick={handleSubmit} theme={'w-100'}>
					Sign Up
				</Button>
			</div>
		</ReactModal>
	);
}
