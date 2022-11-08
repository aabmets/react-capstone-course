import React from 'react';
import { Aside as MantineAside } from '@mantine/core';
import { Text } from '@mantine/core';


function Aside(): JSX.Element {
	return (
		<MantineAside p='xl' width={{ xs: 300 }}>
			<Text sx={{fontSize: '0.9rem'}}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis est, pellentesque vitae ipsum et, maximus pretium augue. In magna quam, tempus a posuere ut, vulputate a magna. Fusce leo felis, eleifend ac urna id, accumsan finibus ligula. In sagittis arcu nec nulla rutrum, gravida porta nisl lobortis. Praesent venenatis eleifend velit ut posuere. Nunc eget turpis lobortis, tristique ipsum quis, vulputate mauris. Cras tincidunt enim eros, et molestie quam pharetra in. In at ipsum molestie, cursus ligula et, pellentesque nisl. Aenean eros lectus, mollis et eleifend id, egestas et lectus. Donec interdum vulputate tellus, vel dignissim magna scelerisque ut. Donec luctus leo elit, sit amet placerat est ornare sed.
			</Text>
		</MantineAside>
	);
}

export default Aside;