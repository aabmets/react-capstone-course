import React from 'react';
import { AppShell }  from '@mantine/core';
import Header from './components/AppHeader';
import Footer from './components/AppFooter';


interface Page {
	children: JSX.Element;
}

function AppScaffold({ children }: Page): JSX.Element {
	return (
		<AppShell 
			sx={{'.mantine-AppShell-main': {paddingTop: '15px'}}}
			header={<Header />} 
			footer={<Footer />}>
				{children}
		</AppShell>
	);
}

export default AppScaffold;