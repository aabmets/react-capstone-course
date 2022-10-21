import React from 'react';
import { Navbar as MantineNavbar } from '@mantine/core';

interface MenuState {
    opened: boolean;
    toggleOpened?: () => void;
}

function Navbar({ opened }: MenuState): JSX.Element {
	return (
		<MantineNavbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
			Navbar Content
		</MantineNavbar>
	);
}

export default Navbar;