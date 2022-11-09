import React from 'react';
import { Footer } from '@mantine/core';
import { Center, Text } from '@mantine/core';


function AppFooter(): JSX.Element {
	return (
		<Footer p="xs" height={50}>
			<Center sx={{position: 'relative', height: '100%'}}>
				<Text sx={{fontSize: '0.8rem', margin: 0, position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}>
					Copyleft © 2022 - Mattias Aabmets
				</Text>
			</Center>
		</Footer>
	);
}

export default AppFooter;