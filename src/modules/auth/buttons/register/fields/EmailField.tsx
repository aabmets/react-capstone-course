import React from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { TextInput, Text, Loader } from '@mantine/core';
import { IconCheck, IconX, IconAt } from '@tabler/icons';
import { IconInputSearch } from '@tabler/icons';
import { theme } from '@utils';
import * as ctx from '@auth/context';
import * as hooks from '@auth/hooks';
import useStyles from './EmailField.styles';


function EmailField(): JSX.Element {
	const { email } = ctx.useDatastoreContext();
	const { classes } = useStyles({ email });
	const { t } = useTranslation('auth');

	const { status, validate } = hooks.useEmailValidator();
	
	const Enum = hooks.EmailStatus;
	const statusIndicator = {
		[Enum.TAKEN]: <IconX size={20} color='red' stroke={3}/>,
		[Enum.AVAILABLE]: <IconCheck size={20} color='green' stroke={3}/>,
		[Enum.WAITING]: <IconInputSearch size={20} color='gray' opacity={0.5}/>,
		[Enum.PENDING]: <Loader size={20}/>,
		[Enum.NONE]: <Fragment/>,
	}[status];

	return (
		<Fragment>
			<TextInput
				onChange={(event) => validate(event.target.value)}
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
			<Text color='red' className={classes.error}>
				{email.error}
			</Text>
		</Fragment>
	);
}

export default EmailField;