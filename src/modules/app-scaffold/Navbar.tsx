import React from 'react';
import Link from 'next/link'
import { Navbar as MantineNavbar } from '@mantine/core';
import { Button, Stack } from '@mantine/core';


interface MenuState {
    opened: boolean;
    toggleOpened?: () => void;
}

function Navbar({ opened }: MenuState): JSX.Element {
	return (
		<MantineNavbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
			<Stack>
			<Link href='/'>
				<Button variant="subtle" compact>Store</Button>
			</Link>
			<Link href='/signup'>
				<Button variant="subtle" compact>Sign Up</Button>
			</Link>
			</Stack>
		</MantineNavbar>
	);
}

export default Navbar;