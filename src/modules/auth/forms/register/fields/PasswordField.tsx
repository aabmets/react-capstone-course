import React from 'react';
import { Fragment, ChangeEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { PasswordInput, Text } from '@mantine/core';
import { Button, UnstyledButton } from '@mantine/core';
import { IconKey } from '@tabler/icons';
import * as ctx from '@auth/context';
import * as hooks from '@auth/hooks';
import siteConfig from 'site.config';
import useStyles from './PasswordField.styles';


export function PasswordField(): JSX.Element {
	const { password } = ctx.useDatastoreContext();
	const { classes } = useStyles({ password });
	const { t } = useTranslation('auth');
	
	const token = hooks.usePasswordValidator();

	function eventHandler(event: ChangeEvent<HTMLInputElement>) {
		const maxLen = siteConfig.auth.maxPasswordLength;
		const value = event.target.value;

		if (value.length > maxLen) {
			const msg = t('auth.password-input.error.too-long');
			password.setError(msg.replace('$', String(maxLen)));
		} else if (password.isError()) {
			password.clearError();
		} 
		password.setValue(value);
	}
	
	return (
		<Fragment>
			<PasswordInput 
				onChange={eventHandler}
				error={password.isError()}
				className={classes.input}
				label={t('auth.password-input.label')}
				placeholder={t('auth.password-input.placeholder')}
				icon={<IconKey size={16}/>}
				withAsterisk
			/>
			<Button.Group sx={{marginTop: '-1px'}}>
				<UnstyledButton key={token + 1} tabIndex={-1} className={classes.first}/>
				<UnstyledButton key={token + 2} tabIndex={-1} className={classes.second}/>
				<UnstyledButton key={token + 3} tabIndex={-1} className={classes.third}/>
				<UnstyledButton key={token + 4} tabIndex={-1} className={classes.fourth}/>
	  		</Button.Group>
			<Text color="red" className={classes.error}>
				{t(password.error)}
			</Text>
		</Fragment>
	);
}

export default PasswordField;