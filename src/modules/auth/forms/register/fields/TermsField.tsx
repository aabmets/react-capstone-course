import React from 'react';
import { Fragment, ChangeEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { UnstyledButton } from '@mantine/core';
import { Checkbox, Center, Text } from '@mantine/core';
import { useFormDataContext } from '@auth/context';
import useStyles from './TermsField.styles';


function TermsCheckbox(): JSX.Element {
	const { terms } = useFormDataContext();
	const { classes } = useStyles({ terms });
	const { t } = useTranslation('auth');
	
	function eventHandler(event: ChangeEvent<HTMLInputElement>) {
		terms.setValue(event.target.checked);
		terms.clearError();
	}

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
					onChange={eventHandler}
					error={terms.isError()}
					className={classes.checkbox}
					radius='sm'
				/>
			</Center>
			<Text color='red' align='center' className={classes.error}>
				{t(terms.error)}
			</Text>
		</Fragment>
	);
}

export default TermsCheckbox;