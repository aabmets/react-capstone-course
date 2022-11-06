/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import React from 'react';
import { Fragment, ChangeEvent } from 'react';
import { TextInput, Text, Loader } from '@mantine/core';
import { IconCheck, IconX, IconAt } from '@tabler/icons';
import { IconInputSearch } from '@tabler/icons';
import { useTranslation } from 'next-i18next';
import { theme } from '@utils';
import * as ctx from '@auth/context';
import * as hooks from '@auth/hooks';
import siteConfig from 'site.config';
import useStyles from './EmailField.styles';


function EmailField(): JSX.Element {
	const { email } = ctx.useFormDataContext();
	const { classes } = useStyles({ email });
	const { t } = useTranslation('auth');

	const { status, refresh } = hooks.useEmailValidator();
	
	const Enum = hooks.EmailStatus;
	const statusIndicator = {
		[Enum.TAKEN]: <IconX size={20} color='red' stroke={3}/>,
		[Enum.AVAILABLE]: <IconCheck size={20} color='green' stroke={3}/>,
		[Enum.WAITING]: <IconInputSearch size={20} color='gray' opacity={0.5}/>,
		[Enum.PENDING]: <Loader size={20}/>,
		[Enum.NONE]: <Fragment/>,
	}[status];

	function eventHandler(event: ChangeEvent<HTMLInputElement>) {
		const maxLen = siteConfig.auth.maxEmailLength;
		const value = event.target.value;

		if (value.length > maxLen) {
			const msg = t('auth.email-input.error.too-long');
			email.setError(msg.replace('$', String(maxLen)));
		} else if (email.isError()) {
			email.clearError();
		}
		email.setValue(value);
		refresh(value);
	}

	return (
		<Fragment>
			<TextInput
				onChange={eventHandler}
				error={email.isError()}
				label={t('auth.email-input.label')}
				placeholder={t('auth.email-input.placeholder')}
				icon={<IconAt size={16} />}
				rightSection={statusIndicator}
				radius={theme.getDefaultRadius()}
				withAsterisk
				name='email'
				autoComplete='off'
			/>
			<Text color="red" className={classes.error}>
				{t(email.error)}
			</Text>
		</Fragment>
	);
}

export default EmailField;