/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import React from 'react';
import { Fragment, ChangeEvent } from 'react';
import { useTranslation } from 'next-i18next';
import * as EmailValidator from 'email-validator';
import { TextInput, Text, Loader } from '@mantine/core';
import { IconCheck, IconX, IconAt } from '@tabler/icons';
import { IconInputSearch } from '@tabler/icons';
import { theme } from '@utils';
import * as ctx from '@auth/context';
import * as hooks from '@auth/hooks';
import siteConfig from 'site.config';
import useStyles from './EmailField.styles';


function EmailField(): JSX.Element {
	const { email } = ctx.useFormDataContext();
	const { classes } = useStyles({ email });
	const { t } = useTranslation('auth');
	
	const { status, setPending } = hooks.useCheckEmailEffect();
	
	const statusIndicator = {
		PENDING: <Loader size={20} />,
		INVALID: <IconX size={20} color='red' stroke={3}/>,
		VALID: <IconCheck size={20} color='green' stroke={3}/>,
		NONE: <IconInputSearch size={20} color='gray' opacity={0.5}/>,
	}[status]

	function eventHandler(event: ChangeEvent<HTMLInputElement>) {
		const max_len = siteConfig.auth.max_email_length;
		const value = event.target.value;

		if (value.length > max_len) {
			const msg = t('auth.email-input.error.too-long');
			email.setError(msg.replace('$', String(max_len)));
			return;
		} else if (EmailValidator.validate(value)) {
			setPending();
		}
		email.clearError();
		email.setValue(value);
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