import React from 'react';
import { Footer as MantineFooter } from '@mantine/core';
import { Center, Text } from '@mantine/core';


function Footer(): JSX.Element {
	return (
		<MantineFooter p="lg" height={60}>
			<Center>
				<Text sx={{fontSize: '0.8rem'}}>
					Copyleft © 2022 - Mattias Aabmets
				</Text>
			</Center>
		</MantineFooter>
	);
}

export default Footer;