import React from 'react';
import { Fragment } from 'react';
import { keyboard } from '@utils';
import { useTranslation } from 'next-i18next';
import { Checkbox, Center, Text } from '@mantine/core';
import { UnstyledButton } from '@mantine/core';
import useStyles from './TermsField.styles';
import * as ctx from '@auth/context';


function TermsCheckbox(): JSX.Element {
	const { terms } = ctx.useDatastoreContext();
	const { classes } = useStyles({ terms });
	const { t } = useTranslation('auth');
	
	function eventHandler(event: React.ChangeEvent<HTMLInputElement>) {
		terms.setValue(event.target.checked);
		terms.clearError();
	}

	const keyDownHandler = keyboard.callWhenKeypress('Enter', () => {
		terms.setValue(!terms.value);
		terms.clearError();
	});

	return (
		<Fragment>
			<Center>
				<Text className={classes.text}>
					{t('auth.terms-checkbox.label') + ' '}
					<UnstyledButton className={classes.button}>
						{t('auth.terms-checkbox.button')}
					</UnstyledButton>
				</Text>
				<Checkbox
					checked={terms.value}
					onKeyDown={keyDownHandler}
					onChange={eventHandler}
					error={terms.isError()}
					className={classes.checkbox}
					radius='sm'
				/>
			</Center>
			<Text color='red' className={classes.error}>
				{t(terms.error)}
			</Text>
		</Fragment>
	);
}

export default TermsCheckbox;