import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import ConfirmationModal from '../../Components/ConfirmationModal';
import PageWrapper from '../../Components/PageWrapper';
import { request } from '../../util';

export default function Customermanagement() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [data, setData] = useState([]);
	const [loading, setloading] = useState(false);

	const [selectedUser, setSelectedUser] = useState({});

	const navigate = useNavigate();
	const toggleModal = (u = null) => {
		setSelectedUser(u);
		setIsModalOpen(!isModalOpen);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		await request('customers', {
			method: 'GET',
			before: () => setloading(true),
			success: (d) => {
				setData(d.customers);
			},

			after: () => {
				setloading(false);
			},
		});
	};

	const handleDelete = async (id) => {
		await request('user/' + selectedUser._id, {
			method: 'DELETE',
			before: () => setloading(true),
			success: (d) => {
				window.location.reload();
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
					<Link>Customer Management</Link>
				</div>
				<div className='my-3'>
					<h5 className='head text-themed f600'>Customer Management</h5>
				</div>
				<ConfirmationModal
					isOpen={isModalOpen}
					onCancel={toggleModal}
					body={'Are you sure you want to delete the profile?'}
					onProceed={handleDelete}
				/>
				{data.map((d) => (
					<div key={d._id} className='row no-gutters profile'>
						<div className='col-3'>
							<img height={150} src={require('../../assets/customer-management.svg').default} alt='' />
						</div>
						<div className='col'>
							<div className=''>
								<p>
									<span className='text-themed'>Name:</span> &nbsp;
									{d.name}
								</p>
								<p>
									<span className='text-themed'>Email ID:</span> &nbsp;
									{d.email}
								</p>
								<p>
									<span className='text-themed'>Contact:</span> &nbsp;{d.number}
								</p>
							</div>
						</div>
						<div className='col-3'>
							<div className='d-flex-justify-content-center'>
								<Button onClick={() => navigate(`/personal-information/${d?._id}`)}>Edit Profile</Button>
							</div>
							<div className='d-flex-justify-content-center mt-2'>
								<Button onClick={() => toggleModal(d)} theme='secondary'>
									Delete Profile
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</PageWrapper>
	);
}
