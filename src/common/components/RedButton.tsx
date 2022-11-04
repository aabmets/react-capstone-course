import React from 'react';
import { Button } from '@mantine/core';
import { buttonStyles } from '@styles';
import { theme } from '@utils';
import siteConfig from 'site.config';


interface ButtonProps {
	children?: JSX.Element | JSX.Element[];
	[key: string]: any;
}

function RedButton(props: ButtonProps): JSX.Element {
	const { colors, primaryShade } = siteConfig.theme;
	const hoverShade = theme.getDefaultHoverShade();

	const copy = Object.assign({}, props);
	delete copy.children;

	const style = {
		...buttonStyles.baseStyle, 
		...buttonStyles.animationStyle,
		backgroundColor: colors['red'][primaryShade],
		borderColor: colors['red'][primaryShade],
		'&:hover': {
			backgroundColor: colors['red'][hoverShade],
			borderColor: colors['red'][hoverShade]
		}
	};
	return (
		<Button {...copy} sx={style}>
			{props.children}
		</Button>
	);
}

export default RedButton;