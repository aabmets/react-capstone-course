import React from 'react';
import { Button } from '@mantine/core';
import { buttonStyles } from '@styles';
import { theme } from '@utils';
import siteConfig from 'site.config';


interface ButtonProps {
	children?: string | JSX.Element | JSX.Element[];
	[key: string]: any;
}

function PrimaryButton(props: ButtonProps): JSX.Element {
	const { colors, primaryColor, primaryShade } = siteConfig.theme;
	const hoverShade = theme.getDefaultHoverShade();
	
	const copy = Object.assign({}, props);
	delete copy.children;

	const style = {
		...buttonStyles.baseStyle, 
		...buttonStyles.animationStyle,
		backgroundColor: colors[primaryColor][primaryShade],
		borderColor: colors[primaryColor][primaryShade],
		'&:hover': {
			backgroundColor: colors[primaryColor][hoverShade],
			borderColor: colors[primaryColor][hoverShade]
		}
	};
	return (
		<Button {...copy} sx={style}>
			{props.children}
		</Button>
	);
}

export default PrimaryButton;