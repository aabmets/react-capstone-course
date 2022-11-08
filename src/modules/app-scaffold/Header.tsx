import React from 'react';
import { Header as MantineHeader } from '@mantine/core';
import { Flex, Center } from '@mantine/core';
import { ColorSchemeToggle } from '@components';
import { LanguageSelector } from '@components';
import { RegisterButton } from '@auth/buttons';
import { LogoutButton } from '@auth/buttons';
import { LoginButton } from '@auth/buttons';


function Header(): JSX.Element {
	return (
		<MantineHeader height={70} p="md">
			<Center>
				<Flex gap="xl">
					<ColorSchemeToggle />
					<LanguageSelector />
					<LogoutButton />
					<LoginButton />
					<RegisterButton />
				</Flex>
			</Center>
		</MantineHeader>
	);
}

export default Header;