import React from 'react';
import { IconKey } from '@tabler/icons';
import { PasswordInput } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useAuthDatastoreContext } from '@auth/context';
import { theme } from '@utils';


type Event = React.ChangeEvent<HTMLInputElement>;

function PasswordField(): JSX.Element {
	const { email, password } = useAuthDatastoreContext();
	const { t } = useTranslation('auth');

	function onChangeHandler(event: Event) {
		password.setValue(event.target.value);
		password.clearError();
		email.clearError();
	}

	return (
		<PasswordInput 
			onChange={onChangeHandler}
			error={password.isError()}
			label={t('auth.password-input.label')}
			placeholder={t('auth.password-input.placeholder')}
			icon={<IconKey size={16}/>}
			radius={theme.getDefaultRadius()}
			sx={{
				width: '100%',
			}}
		/>
	);
}

export default PasswordField;