import React from 'react';
import { Aside as MantineAside, MediaQuery } from '@mantine/core';


function Aside(): JSX.Element {
	return (
		<MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
			<MantineAside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
				Aside Content
			</MantineAside>
		</MediaQuery>
	);
}

export default Aside;