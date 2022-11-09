import React from 'react';
import { IconAt } from '@tabler/icons';
import { TextInput } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useAuthDatastoreContext } from '@auth/context';
import { theme } from '@utils';


type Event = React.ChangeEvent<HTMLInputElement>;

function EmailField() {
	const { email, password } = useAuthDatastoreContext();
	const { t } = useTranslation('auth');

	function onChangeHandler(event: Event) {
		email.setValue(event.target.value);
		email.clearError();
		password.clearError();
	}

	return (
		<TextInput
			onChange={onChangeHandler}
			error={email.isError()}
			label={t('auth.email-input.label')}
			placeholder={t('auth.email-input.placeholder')}
			icon={<IconAt size={16} />}
			radius={theme.getDefaultRadius()}
			name='email'
			autoComplete='off'
			sx={{
				width: '100%',
			}}
		/>
	);
}

export default EmailField;