import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingIndicator from '../Components/LoadingIndicator';
import PageWrapper from '../Components/PageWrapper';
import { request } from '../util';

export default function Livesupport() {
	const [issue, setissue] = useState('');
	const { user } = useSelector((st) => st.userDetails);
	const [loading, setloading] = useState(false);

	const handleSubmit = async () => {
		await request('livesupport', {
			method: 'POST',
			parameters: { issue: issue, userEmail: user.email },
			before: () => setloading(true),
			success: () => {
				toast.success('Your issue has been recorded!');
				setissue('');
			},
			failure: (data) => {
				toast.error(data.message || 'Something went wrong!');
				setissue('');
			},
			after: () => setloading(false),
		});
	};

	return (
		<>
			<LoadingIndicator active={loading}></LoadingIndicator>
			<PageWrapper>
				<div className='col-10 contact-content'>
					<h3>Live Support</h3>
					<div className='d-flex align-items-center'>
						<img src={require('../assets/user.svg').default} alt='' />
						&nbsp;  Hello User! Welcome to the Live Support. Please describe your issue.
					</div>

					<div className='col-12 d-flex justify-content-center'>
						<div className='form-group col-5 mt-5 position-relative'>
							<textarea
								placeholder='Describe your Issue.'
								value={issue}
								onChange={(e) => setissue(e.target.value)}
								className='form-control'
								rows='5'
							></textarea>
							<button onClick={handleSubmit} className='position-absolute send'>
								<img src={require('../assets/send.svg').default} alt='' />
							</button>
						</div>
					</div>
				</div>
			</PageWrapper>
		</>
	);
}
