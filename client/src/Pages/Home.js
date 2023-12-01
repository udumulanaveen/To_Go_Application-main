import React, { useState } from 'react';
import Button from '../Components/Button';
import PageWrapper from '../Components/PageWrapper';
import Login from '../Components/Login';
import LoadingIndicator from '../Components/LoadingIndicator';

export default function Home() {
	const [open, setOpen] = useState(false);

	const handleToggleModal = () => setOpen(!open);

	return (
		<PageWrapper>
			<LoadingIndicator active={true}> </LoadingIndicator>

			<div className='col-6 home-content'>
				<h3>ToGo Today!</h3>
				<p>
					It’s never easy to pick up or drop off packages while you can get stuck in traffic, busy with work, or might
					just forget about it. ToGo connects you to the nearest delivery executive who can take care of the
					task-in-hand. All that you have to do is to tell where to go, what to get and when. It helps to knock tasks
					off the to-do list, meet with the instant needs, and live track the task getting accomplished easily, all from
					the comfort of home.{' '}
				</p>
				<div className='mt-5'>
					<p>We got you!</p>
					<div className=''>
						<Button onClick={handleToggleModal}>Order Now</Button>
					</div>
				</div>
			</div>
			<Login isOpen={open} close={handleToggleModal} />
		</PageWrapper>
	);
}
