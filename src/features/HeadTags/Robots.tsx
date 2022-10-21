import React from 'react';
import Head from 'next/head';

interface RobotProps {
	nocache? : boolean,
	noindex? : boolean,
	nofollow? : boolean,
	noarchive? : boolean,
	nosnippet? : boolean,
	notranslate? : boolean,
	nositelinkssearchbox? : boolean
}

function Robots(props: RobotProps): JSX.Element {
	let content: string | string[] = [];
	for (const key in props) {
		if (props[key as keyof RobotProps] === true) {
			content.push(key);
		}
	}
	content = content.join(', ');
	return (
		<Head>
			{content.length > 0 && <meta name="robots" content={content} key='robots' />}
		</Head>
	);
}

export default Robots;