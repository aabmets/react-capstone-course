import React from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { PasswordInput, Text } from '@mantine/core';
import { Button, UnstyledButton } from '@mantine/core';
import { IconKey } from '@tabler/icons';
import * as ctx from '@auth/context';
import * as hooks from '@auth/hooks';
import useStyles from './PasswordField.styles';


export function PasswordField(): JSX.Element {
	const { password } = ctx.useDatastoreContext();
	const { classes } = useStyles({ password });
	const { t } = useTranslation('auth');
	
	const { token, validate } = hooks.usePasswordValidator();

	return (
		<Fragment>
			<PasswordInput 
				onChange={(event) => validate(event.target.value)}
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
			<Text color='red' className={classes.error}>
				{t(password.error)}
			</Text>
		</Fragment>
	);
}

export default PasswordField;