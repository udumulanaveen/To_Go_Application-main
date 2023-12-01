import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import PageWrapper from '../../Components/PageWrapper';
import { request } from '../../util';

export default function RewardsManagement() {

	const { user } = useSelector((st) => st.userDetails);	
	const [data, setData] = useState([]);
	const [avgRating, setAvgRating] = useState(0);
	const [loading, setloading] = useState(false);
	const [rewards, setRewards] = useState(0);
	const navigate = useNavigate();

	const fetchData = async () => {
		await request('getDelExeRewards/' +  user._id, {
			method: 'GET',
			before: () => setloading(true),
			success: (d) => {
				if(d.avgRating){
				setAvgRating(d.avgRating);
				}
				setRewards(d.rewards);
				
			},
			after: () => {
				setloading(false);
			},
		});
	};

	const fetchCustomerData = async () => {
		await request('getCustomerRewards/' +  user._id, {
			method: 'GET',
			before: () => setloading(true),
			success: (d) => {
				console.log(d.rewards);
				if(d.rewards){
				
					setRewards(d.rewards);
				}
				if(d.rating){
				setAvgRating(d.rating);
				}
				
			},
			after: () => {
				setloading(false);
			},
		});
	};

	const redeemRewards = async () => {
		await request('redeemPoints', {
			method: 'POST',
			before: () => setloading(true),
			parameters : {user, rewards},
			success: (d) => {
				console.log(d);
				setRewards(0);
				
			},
			after: () => {
				setloading(false);
			},
		});
	};


	const generatePromoCode = async () => {
		await request('generatePromoCode', {
			method: 'POST',
			before: () => setloading(true),
			parameters : {user, rewards},
			success: (d) => {
				console.log(d);
				setRewards(0);
				
			},
			after: () => {
				setloading(false);
			},
		});
	};

	useEffect(() => {
		
		user.role === 'CUSTOMER' ?	fetchCustomerData() : fetchData();
		
	},[]);

	return (
		<PageWrapper>
			<div className='col-8 customer-management'>
				<div className='breadscrumb'>
					<Link to='/'>Home</Link> &nbsp; &gt; &nbsp;
					<Link>Reward Management</Link>
				</div>
				<div className='my-3'>
					<h5 className='head text-themed f600'>Rewards</h5>
				</div>

				{user.role === 'DELIVERY_EXECUTIVE' ?
					<div>
						<p>Total Average Rating is {avgRating}</p>
					</div> : ''
				}
				
				<br/>

				<div>
					<p>Total Reward Points are {rewards}</p>
				</div>
				<br/>
				 { rewards > 3 && user.role === 'DELIVERY_EXECUTIVE'?
				<Button
				onClick={redeemRewards}
				>
					Redeem Now
				</Button> : ''
				} 

				{ rewards > 3 && user.role === 'CUSTOMER'?
				<Button
				onClick={generatePromoCode}
				>
					Redeem Now
				</Button> : ''
				}
			</div>
		</PageWrapper>
	);
}
