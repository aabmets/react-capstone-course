import React from 'react';
import Head from 'next/head';

function TechSpecs(): JSX.Element {
	return (
		<Head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			<meta name="mobile-web-app-capable" content="yes" />
 			<meta name="apple-mobile-web-app-capable" content="yes" />
			<link rel="icon" href="/favicon.png" />
		</Head>
	);
}

export default TechSpecs;