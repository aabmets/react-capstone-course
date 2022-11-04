import React from 'react';
import Head from 'next/head';


export interface RobotsTagProps {
	nocache? : boolean,
	noindex? : boolean,
	nofollow? : boolean,
	noarchive? : boolean,
	nosnippet? : boolean,
	notranslate? : boolean,
	nositelinkssearchbox? : boolean
}

function RobotsTag(props: RobotsTagProps): JSX.Element {
	let content: string | string[] = [];
	for (const key in props) {
		if (props[key as keyof RobotsTagProps] === true) {
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

export default RobotsTag;