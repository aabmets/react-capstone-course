import { createStyles } from '@mantine/core';
import { theme } from '@utils';
import { TermsState } from '@auth/state';


interface Params {
	terms: TermsState;
}

const useStyles = createStyles((_, { terms }: Params) => {
	const error = terms.isError();
	return {
		text: {
			fontSize: '0.9rem',
			marginRight: '10px',
		},
		button: {
			padding: 0, 
			fontSize: '100%', 
			fontWeight: 600, 
			color: theme.getShadedPrimaryColor(),
		},
		checkbox: {
			'.mantine-Checkbox-error': {
				marginTop: 0,
				paddingLeft: 0,
			},
		},
		error: {
			height: '1rem', 
			fontSize: '0.7rem',
			opacity: Number(error),
		},
	};
});

export default useStyles;