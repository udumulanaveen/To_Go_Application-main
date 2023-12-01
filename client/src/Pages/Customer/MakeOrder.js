import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../Components/Button';
import PageWrapper from '../../Components/PageWrapper';
import { request, setItemHelper } from '../../util';

export default function MakeOrder() {
	const { user } = useSelector((st) => st.userDetails);
	const [state, setState] = useState({});
	const setItem = setItemHelper(state, setState);
	const [loading, setloading] = useState(false);
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const myApiKey = 'AIzaSyAA8SAuxDq9cMC-OkwZvNUadjS_9Fw7jEs';


	let navigate = useNavigate();

	const handleConfirm = async () => {
		await request('order', {
			method: 'POST',
			parameters: { ...state, customerId: user._id },
			before: () => setloading(true),
			success: (d) => {
				navigate(`/order-payment/${d.orderId}`);
			},

			after: () => {
				setloading(false);
			},
		});
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(function(position) {
			  console.log("Latitude is :", position.coords.latitude);
			  setLatitude(position.coords.latitude);
			  setLongitude(position.coords.longitude);
			  console.log("Longitude is :", position.coords.longitude);
			});
		  }
		//   useCurrentLocation();
	},[]);

	const useCurrentLocation = () => {
		fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
			setItem('pickupLocation')(responseJson.results[0].formatted_address);
			console.log(responseJson.results[0].formatted_address);
		});
		
	}

	return (
		<PageWrapper>
			<div className='col-6 customer-management make-order'>
				<div className='breadscrumb'>
					<Link to='/'>Home</Link> &nbsp; &gt; &nbsp;
					<Link>Make an order</Link>
				</div>
				<div className='my-3'>
					<h5 className='head text-themed f600'>Start Sending Packages!</h5>
				</div>
				<div class='mb-3'>
					<label className='form-label mb-0'>
						PICK UP LOCATION <span className='red'>*</span>
					</label>
					<input
						type='text'
						value={state?.pickupLocation}
						onChange={(e) => setItem('pickupLocation')(e.target.value)}
						className='form-control'
					/><br/>
					<Link onClick={useCurrentLocation} className='plain-btn mx-4 my-3'>
							<img src={require('../../assets/location-icon.svg').default} alt='' /> Use Current Location
					</Link>
				</div>
				<div class='mb-3'>
					<label className='form-label mb-0'>
						DROP LOCATION <span className='red'>*</span>
					</label>
					<input
						type='text'
						value={state?.dropLocation}
						onChange={(e) => setItem('dropLocation')(e.target.value)}
						className='form-control'
					/>
				</div>
				<div class='mb-3'>
					<label className='form-label mb-0'>Any Instructions to Delivery Executive <span className='red'>*</span></label>
					<textarea
						value={state?.instructions}
						onChange={(e) => setItem('instructions')(e.target.value)}
						className='form-control'
					/>
				</div>
				<div className='disclaimer'>
					<p> DISCLAIMER: </p>
					1. Delivery Executive would not be able to make any purchases. <br />
					2. We cannot deliver items that can’t be easily carried. <br />
					3. Please don’t hand over any restricted item, you will be reported. <br />
					4. After the order has been picked up, there will not be any cancellation. <br />
					5. After the delivery of the order, there will not be any refund.
					<div className='my-3'>By confirming I accept the disclaimer.</div>
				</div>
			</div>
			<Button onClick={handleConfirm} theme='carry-btn'>
				Confirm Order
			</Button>
		</PageWrapper>
	);
}
