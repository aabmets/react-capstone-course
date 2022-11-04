import { createStyles} from "@mantine/core";


export const useModalStyles = createStyles((_, { form }: any) => {
	const enabled = form.isInput();
	return {
		modal: {
			'.mantine-Modal-close': {
				opacity: Number(enabled), 
				transform: enabled ? '' : 'scale(0)',
			},
		},
		
	}
});

export const useStageStyles = createStyles(() => {
	return {
		box: { 
			width:'100%', 
			height:240,
		},
	};
});