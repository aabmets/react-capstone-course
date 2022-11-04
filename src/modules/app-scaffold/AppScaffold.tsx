import React from 'react';
import { useState } from 'react';
import { AppShell }  from '@mantine/core';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import Aside from './Aside';


interface Page {
	children: JSX.Element;
}

function AppScaffold({ children }: Page): JSX.Element {
	const [opened, setOpened] = useState<boolean>(false);

	function toggleOpened() {
		setOpened(!opened);
	}

	return (
		<AppShell padding='md'
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			navbar={<Navbar opened={opened} />}
			header={<Header opened={opened} toggleOpened={toggleOpened} />}
			footer={<Footer />}
			aside={<Aside />} >
				{children}
		</AppShell>
	);
}

export default AppScaffold;