import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Button from '../Components/Button';
import PageWrapper from '../Components/PageWrapper';
import { updateUser } from '../redux/actions/user';
import { request, setItemHelper } from '../util';

export default function UpdateProfile() {
	const [user, setUser] = useState({});
	const { user: loggedInUser } = useSelector((st) => st.userDetails);

	const [mode, setMode] = useState('VIEW');
	const setItem = setItemHelper(user, setUser);
	const dispatch = useDispatch();
	const params = useParams();
	const [cash, setCash] = useState(0);
	const [promos, setPromos] = useState([]);

	useEffect(() => {
		handleFetchUser();
		handleFetchRewards();
		handleUserPromocodes();
	}, []);

	const handleFetchUser = async () => {
		await request('user/' + params.userId, {
			method: 'GET',
			success: (d) => {
				setUser(d.user);
			},
		});
	};

	const handleUserPromocodes = async () => {
		await request('promoCodes/' + params.userId, {
			method: 'GET',
			success: (d) => {
				setPromos(d.promos);
				console.log(d.promos);
			},
		});
	};

	const handleFetchRewards = async () => {
		await request('rewards/' + params.userId, {
			method: 'GET',
			success: (d) => {
				if(d.reward){
				setCash(d.reward.rewards);
				}
			},
		});
	};



	const handleUpdateUser = async () => {
		await request('user/' + params.userId, {
			method: 'PUT',
			parameters: user,
			success: (d) => {
				setUser(d.user);
				if (d.user?._id === loggedInUser?._id) dispatch(updateUser({ user: d.user }));
				setMode('VIEW');
			},
		});
	};

	return (
		<PageWrapper>
			<div className='col-8 customer-management update-profile'>
				<div className='breadscrumb'>
					<Link to='/'>Home</Link> &nbsp; &gt; &nbsp;
					<Link>Personal Information</Link>
				</div>
				<div className='my-3'>
					<h5 className='head text-themed f600'>Personal Information</h5>
				</div>
				{mode === 'VIEW' && (
					<>
						<div className='position-relative'>
							<div className='themed-border'></div>
							<span role={'button'} onClick={() => setMode('EDIT')} className='d-flex edit-toggle'>
								<img src={require('../assets/pencil.svg').default} alt='' />
								&nbsp; Edit Information
							</span>
							<p>
								<span>#ID:</span> &nbsp; {user?._id}
							</p>
							<p>
								<span>Name</span> &nbsp; {user?.name}
							</p>
							<p>
								<span>Email Address:</span> &nbsp; {user?.email}
							</p>
							<p>
								<span>Contact Number:</span> &nbsp; {user?.number}
							</p>
						</div>
						<div className='position-relative'>
							<div className='themed-border'></div>
							<p>
								<span>Address 1:</span> &nbsp; {user?.address}
							</p>
							<p>
								<span>Address 2:</span> &nbsp; {user?.address2}
							</p>
						</div>
						{user?.role === 'DELIVERY_EXECUTIVE' ? 
						<div className='position-relative'>
							<div className='themed-border'></div>
							<p>
								<span>Your Total Cash from Redeem Points:</span> &nbsp; {user?cash: ''}
							</p>
						</div> : ''
						}
						
						{user?.role === 'CUSTOMER' ? 

						<div className='position-relative'>
						
							<div className='themed-border'></div>
							<p>
								Your PromoCodes
							</p>
							<ol>
							{
								promos.map((p) => <li><b>{promos[0].code}</b></li>)
							
							}
							</ol>

						</div> : ''
						}

					</>
				)}
				{mode === 'EDIT' && (
					<>
						<div className='position-relative'>
							<div className='themed-border'></div>
							<p>
								<span>#ID:</span> &nbsp; {user?._id}
							</p>
						</div>
						<div className='row no-gutters'>
							<div className='col'>
								{' '}
								<div class='mb-3'>
									<label className='form-label mb-0'>
										Name
									</label>
									<input
										type='text'
										onChange={(e) => setItem('name')(e.target.value)}
										value={user?.name}
										className='form-control'
									/>
								</div>
							</div>
							<div className='col'>
								{' '}
								<div class='mb-3'>
									<label className='form-label mb-0'>
										Email address
									</label>
									<input
										type='email'
										onChange={(e) => setItem('email')(e.target.value)}
										value={user?.email}
										className='form-control'
									/>
								</div>
							</div>
						</div>

						<div class='mb-3'>
							<label className='form-label mb-0'>
								Contact Number
							</label>
							<input
								type='text'
								onChange={(e) => setItem('number')(e.target.value)}
								value={user?.number}
								className='form-control'
							/>
						</div>
						<div class='mb-3'>
							<label className='form-label mb-0'>
								Address1
							</label>
							<input
								type='text'
								onChange={(e) => setItem('address')(e.target.value)}
								value={user?.address}
								className='form-control'
							/>
						</div>
						<div class='mb-3'>
							<label className='form-label mb-0'>
								Address2
							</label>
							<input
								type='text'
								onChange={(e) => setItem('address2')(e.target.value)}
								value={user?.address2}
								className='form-control'
							/>
						</div>
						<div className='d-flex justify-content-end'>
							<Button onClick={() => setMode('VIEW')} theme={'secondary'}>
								Cancel
							</Button>
							<Button onClick={handleUpdateUser}>Save</Button>
						</div>

						
					</>
				)}
			</div>
		</PageWrapper>
	);
}
