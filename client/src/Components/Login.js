import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from './Button';
import { Link } from 'react-router-dom';
import Signup from '../Components/Signup';
import LoadingIndicator from './LoadingIndicator';
import { addUser } from '../redux/actions/user';
import { modalStyle, request, setItemHelper } from '../util';

export default function Login({ isOpen, close }) {
	const [state, setState] = useState({});
	const setItem = setItemHelper(state, setState);
	const [loading, setloading] = useState(false);
	const dispatch = useDispatch();
	const [modal, setModal] = useState('');
	ReactModal.setAppElement('body');

	const handleSubmit = async () => {
		await request('auth/login', {
			method: 'POST',
			parameters: state,
			before: () => setloading(true),
			success: (data) => {
				toast.success('Login Successfull');
				dispatch(addUser(data));
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
				<h4>Sign In</h4>
				<p className='mb-3'>Get started with ToGo</p>
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
				<div className='my-3 d-flex'>
					<p className='mb-0'>Don’t have an account?</p> &nbsp; 
					{
						<Link
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								
								setModal('signup');
							}}
							to={'/'}
							role={'button'}
						>
							Signup
						</Link>
					}
				<Signup isOpen={modal === 'signup'} close={() => setModal('')} />
				</div>
				<div className='my-5'></div>
				<LoadingIndicator active={loading}> </LoadingIndicator>
				<Button onClick={handleSubmit} theme={'w-100'}>
					Login
				</Button>
			</div>
		</ReactModal>
	);
}
