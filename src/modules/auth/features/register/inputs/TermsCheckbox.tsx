import React from 'react';
import { keyboard } from '@utils';
import { Fragment, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Checkbox, Center } from '@mantine/core';
import { Modal, Space, Text } from '@mantine/core';
import { UnstyledButton, ScrollArea } from '@mantine/core';
import { useAuthDatastoreContext } from '@auth/context';
import { BorderedButton } from '@components';
import tos from 'public/tos.json';
import useStyles from './TermsCheckbox.styles';


function TermsCheckbox(): JSX.Element {
	const [opened, setOpened] = useState(false);
	const { terms } = useAuthDatastoreContext();
	const { classes } = useStyles({ terms });
	const { t } = useTranslation('auth');

	function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		terms.setValue(event.target.checked);
		terms.clearError();
	}
	const onKeyDownHandler = keyboard.callWhenKeypress('Enter', () => {
		terms.setValue(!terms.value);
		terms.clearError();
	});

	return (
		<Fragment>
			<Center>
				<Modal opened={opened} onClose={() => setOpened(false)} title={<h3>{t('auth.tos.content.title')}</h3>}>
					<ScrollArea type="always" offsetScrollbars scrollbarSize={16} sx={{ height: '60vh' }}>
						{Object.values(tos).map((p) => 
							<div key={p.title} style={{paddingBottom: '5px'}}>
								<h4>{p.title}</h4>
								<p>{p.content}</p>
							</div>
						)}
					</ScrollArea>
					<Space h={15}/>
					<Center>
						<BorderedButton onClick={() => setOpened(false)}>
							{t('auth.button.close')}
						</BorderedButton>
					</Center>
				</Modal>
				<Text className={classes.text}>
					{t('auth.terms-checkbox.label') + ' '}
					<UnstyledButton className={classes.button} onClick={() => setOpened(true)}>
						{t('auth.terms-checkbox.button')}
					</UnstyledButton>
				</Text>
				<Checkbox
					checked={terms.value}
					onKeyDown={onKeyDownHandler}
					onChange={onChangeHandler}
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