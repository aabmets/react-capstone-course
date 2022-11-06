import React from 'react';
import { keyboard } from '@utils';
import { Modal } from '@mantine/core';
import { ModalState } from '@auth/state';
import * as props from '@auth/props';
import * as ctx from '@auth/context';
import SuccessStage from './stages/SuccessStage';
import InputStage from './stages/InputStage';
import useHeader from './RegisterForm.header';
import { useModalStyles } from './RegisterForm.styles';


interface Props {
	modal: ModalState;
}

function RegisterForm({ modal }: Props): JSX.Element {
	const { form } = ctx.useFormDataContext();
	const { classes } = useModalStyles({ form });
	
	const ntfw = keyboard.noTabFocusWhen(modal.busy);
	const title = useHeader();
	
	const modalProps = {
		...props.useModalProps(),
		opened: modal.isOpen(),
		onClose: modal.close,
		onKeyDown: ntfw,
		title,
	};

	return (
		<Modal {...modalProps} className={classes.modal}>
			{form.isInput() && <InputStage modal={modal}/>} 
			{form.isSuccess() && <SuccessStage modal={modal}/>}
			{form.isFailed() && <div>FAILED</div>}
		</Modal>
	);
}

export default RegisterForm;