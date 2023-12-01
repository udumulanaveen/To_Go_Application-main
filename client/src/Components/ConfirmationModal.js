import React from 'react';
import ReactModal from 'react-modal';
import { modalStyle } from '../util';
import Button from './Button';

export default function ConfirmationModal({ isOpen, body, onCancel, onProceed }) {
	return (
		<ReactModal style={modalStyle} isOpen={isOpen} onCloseModal={onCancel}>
			<span role={'button'} onClick={onCancel} className='close-button'>
				x
			</span>
			<div className='p-3 login mos-modal position-relative'>
				<p className='mb-3'>{body}</p>

				<div className='my-5'></div>
				<Button theme={'secondary'} onClick={onProceed}>
					Yes
				</Button>
				<Button onClick={onCancel}>No</Button>
			</div>
		</ReactModal>
	);
}
