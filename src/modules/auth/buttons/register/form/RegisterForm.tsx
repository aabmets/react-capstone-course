import React from 'react';
import { keyboard } from '@utils';
import { LoadingOverlay } from '@mantine/core';
import { Modal } from '@mantine/core';
import * as ctx from '@auth/context';
import * as props from '@auth/props';
import SuccessStage from '../stages/SuccessStage';
import FailedStage from '../stages/FailedStage';
import InputStage from '../stages/InputStage';
import useHeader from './RegisterForm.header';
import { useModalStyles } from './RegisterForm.styles';


export function RegisterForm(): JSX.Element {
	const { form, modal } = ctx.useDatastoreContext();
	const { classes } = useModalStyles();
	const title = useHeader();
	
	const keyDownHandler = keyboard.noTabFocusWhen(modal.isBusy());
	
	const overlayProps = props.useLoadingOverlayProps();
	const modalProps = {
		...props.useModalProps(),
		...(form.isInput() ? { title } : {}),
		withCloseButton: form.isInput(),
		opened: modal.isOpened(),
		onClose: modal.close,
		onKeyDown: keyDownHandler,
	};

	return (
		<Modal {...modalProps} className={classes.modal}>
			<LoadingOverlay {...overlayProps} visible={modal.isBusy()}/>
			{form.isInput() && <InputStage />} 
			{form.isSuccess() && <SuccessStage />}
			{form.isFailed() && <FailedStage />}
		</Modal>
	);
}