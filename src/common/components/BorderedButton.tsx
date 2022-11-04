import React from 'react';
import { Button, MantineTheme } from '@mantine/core';
import { buttonStyles } from '@styles';


interface ButtonProps {
	children?: JSX.Element | JSX.Element[];
	[key: string]: any;
}

function BorderedButton(props: ButtonProps): JSX.Element {
	const copy = Object.assign({}, props);
	delete copy.children;

	function getStyle(theme: MantineTheme) {
		const { lightStyle, darkStyle } = buttonStyles;
		return {
			...buttonStyles.baseStyle, 
			...buttonStyles.animationStyle,
			...(theme.colorScheme === 'light') ? 
				lightStyle : darkStyle
		}
	}
	return (
		<Button {...copy} 
			variant='default' 
			sx={(theme) => getStyle(theme)}>
				{props.children}
		</Button>
	);
}

export default BorderedButton;