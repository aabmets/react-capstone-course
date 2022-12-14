import Document from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';


const getInitialProps = createGetInitialProps();

export default class CustomDocument extends Document {
	static getInitialProps = getInitialProps;

	public render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}