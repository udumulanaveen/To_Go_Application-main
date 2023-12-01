import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import ConfirmationModal from '../../Components/ConfirmationModal';
import PageWrapper from '../../Components/PageWrapper';
import { updateUser } from '../../redux/actions/user';
import { request, setItemHelper } from '../../util';

export default function PaymentInformation() {
	const [data, setData] = useState([]);
	const [loading, setloading] = useState(false);
	const [mode, setMode] = useState('VIEW');
	const { user } = useSelector((st) => st.userDetails);
	const loggedInUser = user;
	const [state, setState] = useState(user);
	const setItem = setItemHelper(state, setState);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		await request('payments/' + state?._id, {
			method: 'GET',
			before: () => setloading(true),
			success: (d) => {
				setData(d.payments);
			},

			after: () => {
				setloading(false);
			},
		});
	};

	const handleUpdateBankDetails = async () => {
		await request(`bankDetails/${state?._id}`, {
			method: 'PUT',
			parameters: state,
			before: () => setloading(true),
			success: (d) => {
				dispatch(updateUser({ user: d.user }));
				setState(d.user);
				setMode('VIEW');
			},
			after: () => {
				setloading(false);
			},
		});
	};

	return (
		<PageWrapper>
			<div className='col-8 customer-management'>
				<div className='breadscrumb'>
					<Link to='/'>Home</Link> &nbsp; &gt; &nbsp;
					<Link>Payment Information</Link>
				</div>
				<div className='my-3'>
					<h5 className='head text-themed f600'>Payment Information</h5>
				</div>
				{mode === 'VIEW' && (
					<>
						<div className='position-relative view-bd'>
							<div className='themed-border'></div>
							<span role={'button'} onClick={() => setMode('EDIT')} className='d-flex edit-toggle'>
								<img src={require('../../assets/pencil.svg').default} alt='' />
								&nbsp; Edit Information
							</span>
							<p>
								<span>Bank Name:</span> &nbsp; {state?.bankName}
							</p>
							<p>
								<span>Account Number:</span> &nbsp; {state?.accNo}
							</p>
							<p>
								<span>Routing Number:</span> &nbsp; {state?.routingNo}
							</p>
						</div>
					</>
				)}
				{mode === 'EDIT' && (
					<>
						<div className='position-relative'>
							<div className='themed-border'></div>
						</div>
						<div className='row no-gutters'>
							<div className='col'>
								<div class='mb-3'>
									<label className='form-label mb-0'>
										<span className='red'>*</span>Bank Name
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
								{' '}
								<div class='mb-3'>
									<label className='form-label mb-0'>
										<span className='red'>*</span> Account Number
									</label>
									<input
										type='text'
										onChange={(e) => setItem('accNo')(e.target.value)}
										value={state?.accNo}
										className='form-control'
									/>
								</div>
							</div>
						</div>

						<div class='mb-3'>
							<label className='form-label mb-0'>
								<span className='red'>*</span> Routing Number
							</label>
							<input
								type='text'
								onChange={(e) => setItem('routingNo')(e.target.value)}
								value={state?.routingNo}
								className='form-control'
							/>
						</div>
						<div className='d-flex justify-content-end'>
							<Button onClick={() => setMode('VIEW')} theme={'secondary'}>
								Cancel
							</Button>
							<Button onClick={handleUpdateBankDetails}>Save</Button>
						</div>
					</>
				)}
				<table className='table table-borderless table-responsive text-center'>
					<thead>
						<tr>
							<th>Payment ID</th>
							<th>Date</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((pmt) => (
							<tr role={'button'} key={pmt._id}>
								<th>{pmt._id}</th>
								<td>{moment(pmt.createdAt).format('DD/MM/YYYY')}</td>
								<td>${pmt?.amount}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</PageWrapper>
	);
}
