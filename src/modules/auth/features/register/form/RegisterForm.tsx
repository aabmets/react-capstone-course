import React from 'react';
import { keyboard } from '@utils';
import { LoadingOverlay, Modal } from '@mantine/core';
import { useAuthDatastoreContext } from '@auth/context';
import SuccessStage from '../stages/SuccessStage';
import FailedStage from '../stages/FailedStage';
import InputStage from '../stages/InputStage';
import useHeader from './RegisterForm.header';
import * as props from './RegisterForm.props';
import { useModalStyles } from './RegisterForm.styles';


export function RegisterForm(): JSX.Element {
	const { form } = useAuthDatastoreContext();
	const { classes } = useModalStyles();
	const title = useHeader();
	
	const keyDownHandler = keyboard.noTabFocusWhen(form.isBusy());
	
	const overlayProps = props.useLoadingOverlayProps();
	const modalProps = {
		...props.useModalProps(),
		...(form.isInput() ? { title } : {}),
		withCloseButton: form.isInput(),
		opened: form.isOpened(),
		onClose: form.setClosed,
		onKeyDown: keyDownHandler,
	};

	return (
		<Modal {...modalProps} className={classes.modal}>
			<LoadingOverlay {...overlayProps} visible={form.isBusy()}/>
			{form.isInput() && <InputStage />} 
			{form.isSuccess() && <SuccessStage />}
			{form.isFailed() && <FailedStage />}
		</Modal>
	);
}