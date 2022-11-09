import React from 'react';
import Lottie from 'lottie-react';
import { useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { LottieRefCurrentProps } from 'lottie-react';
import { Space, Group, Stack, Text } from '@mantine/core';
import { useAuthDatastoreContext } from '@auth/context';
import { BorderedButton } from '@components';
import failedLottie from 'public/failed-lottie.json';


function FailedStage(): JSX.Element {
	const { form } = useAuthDatastoreContext();
	const { t } = useTranslation('auth');

	const lottieRef = useRef<LottieRefCurrentProps | null>(null);
	lottieRef.current?.setSpeed(0.8);

	const lottieProps = {
		loop: true,
		lottieRef: lottieRef,
		animationData: failedLottie,
		style: { 
			width: 100, 
			height: 100, 
			transform: 'scale(1.6)' 
		},
	};

	return (
		<Group>
			<Lottie {...lottieProps} /> 
			<Space h={5}/>
			<Stack align="center" justify="flex-start">
				<Text sx={{fontSize: '1rem', fontWeight: 700 }}>
					{t('auth.message.failed-to-create.title')}
				</Text>
				<Text sx={{fontSize: '0.8rem', fontWeight: 500 }}>
					{t('auth.message.failed-to-create.desc')}
				</Text>
				<BorderedButton onClick={form.resetForm}>
					{t("auth.button.close")}
				</BorderedButton>
			</Stack>
		</Group>
	);
}

export default FailedStage;