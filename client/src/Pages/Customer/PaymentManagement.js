import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../Components/Button';
import CardModal from '../../Components/CardModal';
import PageWrapper from '../../Components/PageWrapper';
import { request } from '../../util';

export default function PaymentManagement() {
	const { user } = useSelector((st) => st.userDetails);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [paymentInfo, setPaymentInfo] = useState(null);
	const [state, setState] = useState([]);
	const [mode, setMode] =useState("CREATE");
	const [loading, setloading] = useState(false);

	const editPayment = (payment) => {
		setPaymentInfo(payment);
		setMode("EDIT");
		setIsModalOpen(!isModalOpen);
	}
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		setPaymentInfo(null);
	};

	useEffect(() => {
		handleFetch();
	}, []);

	const handleAddCard = async (st) => {
		await request('card/' + user._id, {
			method: 'POST',
			parameters: { ...st },
			before: () => setloading(true),
			success: (d) => {
				window.location.reload();
			},
			failure: (d) => {
				toast.error(d.message);
			},

			after: () => {
				setloading(false);
			},
		});
	};

	const handleDeleteCard = async (st) => {
		await request('card/' + st._id, {
			method: 'DELETE',
			before: () => setloading(true),
			success: (d) => {
				window.location.reload();
			},
			failure: (d) => {
				toast.error(d.message);
			},

			after: () => {
				setloading(false);
			},
		});
	};

	const handleFetch = async () => {
		await request('cards/' + user._id, {
			method: 'GET',

			before: () => setloading(true),
			success: (d) => {
				setState(d.cards);
			},
			after: () => {
				setloading(false);
			},
		});
	};
	return (
		<PageWrapper>
			<div className='customer-management make-order'>
				<div className='breadscrumb'>
					<Link to='/'>Home</Link> &nbsp; &gt; &nbsp;
					<Link to={'/payment-management'}>Payment Management</Link>
				</div>
				<CardModal isOpen={isModalOpen} close={toggleModal} onSubmit={handleAddCard} mode={mode} paymentInfo={paymentInfo} />
				<h5 className='head text-themed f600 mt-2 themed-border'>Payment Management</h5>
				<div className=''>
					{state?.map((st) => (
						<div key={st._id} className='card-detail d-flex ' style={{margin:40}}>
							<img src={require('../../assets/card.svg').default} alt='' /> &nbsp; &nbsp;
							<p className='my-3'>{st?.cardNo}</p> &nbsp;
							<div style={{maxwidth:"5px", marginRight:"10px", marginLeft:"10px"}}>
							<Button
							onClick={() => editPayment(st)}
							>Edit</Button> &nbsp;
							</div>
							<Button
							onClick={() => handleDeleteCard(st)}
							>Delete</Button>
						</div>
					))}
					<div role={'button'} onClick={toggleModal} className='card-detail d-flex '>
						<span>+</span> <p className='my-3 mx-3'>Add Payment Method</p>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
}
