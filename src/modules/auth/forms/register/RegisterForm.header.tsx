import React from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { IconAlertTriangle } from '@tabler/icons';
import { Text, Box, Space } from '@mantine/core';
import { HoverCard, HoverCardProps } from '@mantine/core';
import { useHeaderStyles } from './RegisterForm.styles';
import * as ctx from '@auth/context';


function useHeader(): JSX.Element {
	const { form, network } = ctx.useFormDataContext();
	const { classes } = useHeaderStyles();
	const { t } = useTranslation('auth');

	const headerTitle = form.isInput() ? t('auth.modal.register.title') : '';

	const hoverCardProps = {
		width: '250px', 
		shadow: "xl", 
		position: 'top-end', 
		withArrow: true,
		arrowSize: 15, 
		arrowOffset: 18.5,
		offset: 10,
	} as HoverCardProps;
	
	return (
		<Fragment>
			<Text className={classes.headerTitle}>
				{headerTitle}
			</Text>
			
			{network.isLatencyBad() && 
				<HoverCard {...hoverCardProps}>
					<HoverCard.Target>
						<Box>
							<IconAlertTriangle className={classes.hoverCard_icon}/>
						</Box>
					</HoverCard.Target>

					<HoverCard.Dropdown className={classes.hoverCard_dropdown}>
						<Text className={classes.hoverCard_title}>
							{t('auth.hovercard.bad-network.title')}
						</Text>

						<Space h={5}/>

						<Text className={classes.hoverCard_message}>
							{t('auth.hovercard.bad-network.message')}
						</Text>
					</HoverCard.Dropdown>
				</HoverCard>
			}
		</Fragment>
	);
}

export default useHeader;