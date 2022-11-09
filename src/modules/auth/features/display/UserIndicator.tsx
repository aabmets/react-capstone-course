import React from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { useLocalStorage } from 'usehooks-ts';
import { Text, Flex, Avatar, Space } from '@mantine/core';
import siteConfig from 'site.config';


const lsKey = siteConfig.auth.localStorage.currentUser;

export function UserIndicator(): JSX.Element {
	const [user, _] = useLocalStorage(lsKey, '');
	const { t } = useTranslation('auth');

	return (
		<Fragment>
			<Flex justify="flex-start" align="center">
				<Avatar />
				<Space w={5}/>
				<Text sx={{fontWeight: 700}}>
					{user || t('auth.display.guest-username')}
				</Text>
			</Flex>
		</Fragment>
	);
}