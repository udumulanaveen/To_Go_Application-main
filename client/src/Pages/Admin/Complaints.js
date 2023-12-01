import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import Complaint from '../../Components/Complaint';
import PageWrapper from '../../Components/PageWrapper';
import { request } from '../../util';

export default function Dashboard() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [data, setData] = useState([]);
	const [liveSupportsData, setLiveSupportsData] = useState([]);
	const [loading, setloading] = useState(false);
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		if (!isModalOpen) fetchData();
	};

	useEffect(() => {
		fetchData();
		fetchLiveSupportData();
	}, []);

	const fetchData = async () => {
		await request('complaints', {
			method: 'GET',
			before: () => setloading(true),
			success: (d) => {
				setData(d.complaints);
			},

			after: () => {
				setloading(false);
			},
		});
	};

	const fetchLiveSupportData = async () => {
		await request('livesupports', {
			method: 'GET',
			before: () => setloading(true),
			success: (d) => {
				setLiveSupportsData(d.livesupports);
			},

			after: () => {
				setloading(false);
			},
		});
	};

	const markAsResolved = async (ID) => {
		await request('complaint/' + ID, {
			method: 'PUT',
			before: () => setloading(true),
			success: (d) => {
				setData(d.complaints);
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
					<Link>Complaint and Feedback Management</Link>
				</div>
				<div className='my-3'>
					<h5 className='head text-themed f600'>Complaint and Feedback Management</h5>
				</div>
				{data?.map((cp) => (
					<div className='row no-gutters profile'>
						<div className='col'>
							<div className=''>
								<p>
									<span className='text-themed'>Complaint ID:</span>
									{cp._id}
								</p>
								<p>
									<span className='text-themed'>Email ID:</span>
									{cp.email}
								</p>
								<p>
									<span className='text-themed'>Order ID:</span> {cp.orderId}
								</p>
								<p>
									<span className='text-themed'>Description:</span> {cp.description}
								</p>
							</div>
						</div>
						<div className='col-3'>
							<div className='d-flex-justify-content-center'>
								<Button onClick={() => markAsResolved(cp._id)} disabled={cp.status === 'RESOLVED'} theme='secondary'>
									{cp.status !== 'RESOLVED' ? 'Mark As Resolved' : 'RESOLVED'}
								</Button>
							</div>
						</div>
					</div>
				))}
					<p>Live Support Queries</p>
				{liveSupportsData?.map((cp) => (
					<div className='row no-gutters profile' key={cp._id}>
						<div className='col'>
							<div className=''>
								<p>
									<span className='text-themed'>Live Support ID:</span>
									{cp._id}
								</p>
								<p>
									<span className='text-themed'>User Email:</span>
									{cp.userEmail}
								</p>
	
								<p>
									<span className='text-themed'>Description:</span> {cp.issue}
								</p>
							</div>
						</div>
						<div className='col-3'>
							<div className='d-flex-justify-content-center'>
								<Button theme='secondary' onClick={() => window.location = 'mailto:togo.app22@gmail.com'}>
									Reply
								</Button>
							</div>
						</div>
						
					</div>
				))}
			</div>
			<Button onClick={toggleModal} theme='carry-btn' position='fixed'>
				Raise complaint
			</Button>
			<Complaint isOpen={isModalOpen} close={toggleModal} />
		</PageWrapper>
	);
}
