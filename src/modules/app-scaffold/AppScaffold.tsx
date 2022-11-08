import React from 'react';
import { AppShell }  from '@mantine/core';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import Aside from './Aside';


interface Page {
	children: JSX.Element;
}

function AppScaffold({ children }: Page): JSX.Element {
	return (
		<AppShell
			navbar={<Navbar />}
			header={<Header />}
			footer={<Footer />}
			aside={<Aside />} >
				{children}
		</AppShell>
	);
}

export default AppScaffold;