import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from '../Components/Signup';
import { removeUser } from '../redux/actions/user';
import Button from './Button';

export default function Header({ userType }) {
	const [modal, setModal] = useState('');
	const { user } = useSelector((st) => st.userDetails);
	const isLoggedIn = !!user?.role;
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const myApiKey = 'AIzaSyAA8SAuxDq9cMC-OkwZvNUadjS_9Fw7jEs';
	const [cityName, setCityName] = useState('');

	const disp = useDispatch();
	const handleSignout = () => {
		disp(removeUser());
		localStorage.removeItem('CityName');
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
            // console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
			let cityName = responseJson.results[0].address_components;
			// console.log(cityName[1].short_name);
			localStorage.setItem('CityName', cityName[1].short_name);
			setCityName(localStorage.getItem('CityName'));
			console.log(cityName);
		});
		
	}
	return (
		<div className='header row no-gutters w-100' style={{ backgroundColor:"white"}}>
			<div className='col-8'>
				<img src={require('../assets/logo.svg').default} alt='' />
				<ul className='text-themed nav-list'>
					<li>
						<Link to={'/home'}>Home</Link>
					</li>
					<li>
						<Link to={'/aboutus'}>About Us</Link>
					</li>
					<li>
						<Link to={'/contactus'}>Contact Us</Link>
					</li>
					{isLoggedIn && (
					<li>
						<Link to={'/livesupport'}>Live Support</Link>
					</li>
					)}
					{!isLoggedIn && (
						<li>
							<Link
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setModal('signupdelex');
								}}
								to={'/'}
								role={'button'}
							>
								Become a Delivery Executive
							</Link>
						</li>
					)}
				</ul>
			</div>
			<Login isOpen={modal === 'signin'} close={() => setModal('')} />
			<Signup isOpen={modal === 'signup'} close={() => setModal('')} />
			<Signup isOpen={modal === 'signupdelex'} close={() => setModal('')} role='DELIVERY_EXECUTIVE' />
			<div className='col' style={{ backgroundColor:"white"}}>
				{isLoggedIn ? (
					<div className='actions' style={{ backgroundColor:"white"}}>
						{userType === 'ADMIN' && (
							<Link to={`/personal-information/${user._id}`} className='plain-btn mx-4 my-3'>
								Account Settings
							</Link>
						)}
						{userType === 'DELIVERY_EXECUTIVE' && (
							<>

							<Link className='plain-btn mx-4 my-3'>
								{localStorage.getItem('CityName') ? localStorage.getItem('CityName') : ''}
							</Link>
						
							<Link onClick={useCurrentLocation} className='plain-btn mx-4 my-3'>
							<img src={require('../assets/location-icon.svg').default} alt='' /> Set Location
							</Link>
							</>
						)}
						<Button onClick={handleSignout} theme='primary'>
							Sign out
						</Button>
					</div>
				) : (
					<div className='actions'>
						<Button onClick={() => setModal('signin')} theme='secondary mx-4'>
							Sign In
						</Button>
						<Button onClick={() => setModal('signup')} theme='primary'>
							Get Started
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
