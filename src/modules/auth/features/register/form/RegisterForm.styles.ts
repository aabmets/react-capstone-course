import { createStyles} from "@mantine/core";
import siteConfig from 'site.config';


const orange = siteConfig.theme.colors.orange[5];

export const useModalStyles = createStyles(() => {
	return {
		modal: {
			'.mantine-Modal-title': {
				display: 'flex',
				justifyContent: 'space-between',
				width: '100%',
			},
		},
	};
});

export const useHeaderStyles = createStyles(() => {
	return {
		headerTitle: {
			fontSize: '1rem',
		},
		hoverCard_icon: {
			color: orange,
			height: '1rem',
			width: 'auto',
			transform: 'translateY(4px) scale(1.5)',
		},
		hoverCard_dropdown: {
			borderWidth: '2.5px',
			borderColor: orange,
			transform: 'translateX(20px)',
			'.mantine-HoverCard-arrow': {
				borderWidth: '2.5px',
				borderColor: orange,
			},
		},
		hoverCard_title: {
			color: orange, 
			fontSize: '0.8rem', 
			fontFamily: 'Verdana', 
			fontWeight: 800,
			textAlign: 'center',
		},
		hoverCard_message: {
			fontSize: '0.7rem', 
			fontFamily: 'Verdana',
			textAlign: 'left',
		}
	};
});