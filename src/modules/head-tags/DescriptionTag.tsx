import React from 'react';
import Head from 'next/head';
import siteConfig from 'site.config';


export interface DescriptionTagProps {
	title?: string;
	description?: string;
	keywords?: string;
	author?: string;
}

function DescriptionTag(props: DescriptionTagProps): JSX.Element {
	const site = siteConfig.meta;
	return (
		<Head>
			<title>{props.title || site.title}</title>
			<meta name="description" content={props.description || site.description} />
			<meta name="keywords" content={props.keywords || site.keywords} />
			<meta name="author" content={props.keywords || site.author} />
		</Head>
	);
}

export default DescriptionTag;