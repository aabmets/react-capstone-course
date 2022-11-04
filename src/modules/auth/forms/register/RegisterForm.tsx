import React from 'react';
import { useTranslation } from 'next-i18next';
import { Modal } from '@mantine/core';
import { keyboard } from '@utils';
import { ModalState } from '@auth/state';
import { useModalProps } from '@auth/props';
import { useFormDataContext } from '@auth/context';
import { useModalStyles } from './RegisterForm.styles';
import { InputStage } from './stages/InputStage';


interface Props {
	modal: ModalState;
}

function RegisterForm({ modal }: Props): JSX.Element {
	const { form } = useFormDataContext();
	const { classes } = useModalStyles({ form });
	const { isModalOpen, closeModal } = modal;
	const { t } = useTranslation('auth');

	const ntfw = keyboard.noTabFocusWhen(modal.busy);
	const title = form.isInput() ? 
		t('auth.modal.register.title') : '';

	const modalProps = {
		...useModalProps(),
		opened: isModalOpen(),
		onClose: closeModal,
		onKeyDown: ntfw,
		title,
	};

	return (
		<Modal {...modalProps} className={classes.modal}>
			{form.isInput() && <InputStage modal={modal}/>} 
			{form.isSuccess() && <div>SUCCESS</div>}
			{form.isFailed() && <div>FAILED</div>}
		</Modal>
	);
}

export default RegisterForm;


// {isSuccess() && 
// 	<Fragment>
// 		<Box>
// 			<div>Account created!</div>
// 		</Box>
// 		<Center>
// 			<RedButton>
// 				<Text>Log in</Text>
// 			</RedButton>
// 		</Center>
// 	</Fragment>
// }
// {isFailed() && 
// 	<Fragment>
// 		<Box>
// 			<div>Server error!</div>
// 		</Box>
// 		<Center>
// 			<BorderedButton>
// 				<Text>Back</Text>
// 			</BorderedButton>
// 		</Center>
// 	</Fragment>
// }