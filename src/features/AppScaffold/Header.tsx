import React from 'react';
import { Header as MantineHeader, MediaQuery, Burger } from '@mantine/core';
import siteConfig from 'site.config';

interface MenuState {
	opened: boolean;
	toggleOpened?: () => void;
}

function Header({ opened, toggleOpened }: MenuState): JSX.Element {
	const { gray } = siteConfig.theme.colors;
	return (
		<MantineHeader height={70} p="md">
			<div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
				<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
					<Burger
						opened={opened}
						onClick={toggleOpened}
						size="sm"
						color={gray[6]}
						mr="xl"
					/>
				</MediaQuery>

            	Application header
          	</div>
		</MantineHeader>
	);
}

export default Header;