import React from 'react';
import { keyboard } from '@utils';
import { Modal } from '@mantine/core';
import * as ctx from '@auth/context';
import * as props from '@auth/props';
import SuccessStage from './stages/SuccessStage';
import InputStage from './stages/InputStage';
import useHeader from './RegisterForm.header';
import { useModalStyles } from './RegisterForm.styles';


export function RegisterForm(): JSX.Element {
	const { form, modal } = ctx.useDatastoreContext();
	const { classes } = useModalStyles();
	
	const ntfw = keyboard.noTabFocusWhen(modal.isBusy());
	const title = useHeader();
	
	const modalProps = {
		...props.useModalProps(),
		withCloseButton: form.isInput(),
		opened: modal.isOpened(),
		onClose: modal.close,
		onKeyDown: ntfw,
		title,
	};

	return (
		<Modal {...modalProps} className={classes.modal}>
			{form.isInput() && <InputStage />} 
			{form.isSuccess() && <SuccessStage />}
			{form.isFailed() && <div>FAILED</div>}
		</Modal>
	);
}