import React from 'react';
import { useRouter } from 'next/router'
import { Flex, Group, Center } from '@mantine/core';
import { Header, Button } from '@mantine/core';
import { useLocalStorage } from 'usehooks-ts';
import { useTranslation } from 'next-i18next';
import { UserIndicator } from '@auth/features';
import { RegisterButton } from '@auth/features';
import { LogoutButton } from '@auth/features';
import { LoginButton } from '@auth/features';
import siteConfig from 'site.config';


const lsKey = siteConfig.auth.localStorage.currentUser;

function AppHeader(): JSX.Element {
	const [user, _] = useLocalStorage(lsKey, '');
	const { t } = useTranslation('common');
	const router = useRouter();

	const linkButtonStyle = {
		fontSize: '0.9rem', 
		letterSpacing: '0.05rem',
		fontFamily: 'Verdana',
	}

	return (
		<Header p="xs" height={70} sx={{position: 'relative', height: '100%', width: '100%'}}>
			<Flex justify='space-between' sx={{position: 'relative', height: '100%', padding: '0 3vw 0 3vw'}}>
				<Group>
					<UserIndicator />
				</Group>
				<Group>
					<LogoutButton />
					<LoginButton />
					<RegisterButton />
				</Group>
			</Flex>
			<Center>
				<Group sx={{margin: 0, position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}>
					<Button onClick={() => router.push('/')} variant="subtle" compact sx={linkButtonStyle}>
						{t('header.button.mainpage')}
					</Button>
					<Button onClick={() => router.push('/settings')} variant="subtle" compact sx={linkButtonStyle}>
						{t('header.button.settings')}
					</Button>
					{user !== '' && <Button onClick={() => router.push('/account')} variant="subtle" compact sx={linkButtonStyle}>
						{t('header.button.account')}
					</Button>}
				</Group>
			</Center>
		</Header>
	);
}

export default AppHeader;