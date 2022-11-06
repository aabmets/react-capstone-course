import React, { Fragment, useRef } from 'react';
import axios, { AxiosResponse } from "axios";
import { useTranslation } from 'next-i18next';
import { LoadingOverlay } from '@mantine/core';
import { Box, Space, Group, Stack, Center, Text } from '@mantine/core';
import { BorderedButton, RedButton } from '@components';
import siteConfig from 'site.config';
import * as ctx from '@auth/context';
import * as props from '@auth/props';
import { Image } from '@mantine/core';
import * as hooks from '@auth/hooks';
import { ModalState } from '@auth/state';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import successLottie from 'public/success_checkmark_animated.json';

interface Props {
	modal: ModalState;
}

function SuccessStage({ modal }: Props): JSX.Element {
	const { email, password } = ctx.useFormDataContext();
	const { t } = useTranslation('auth');

	const lottieRef = useRef<LottieRefCurrentProps | null>(null);
	lottieRef.current?.setSpeed(0.7);
	

	return (
		<Fragment>
			<Box>
				<Stack align="center" justify="flex-start" sx={{size: '40%'}}>
					<Lottie lottieRef={lottieRef} loop={false} animationData={successLottie} style={{width: '50%', transform:'translateY(-30px)'}}/>
					<Text sx={{fontSize: '1.2rem', fontWeight: 700, transform:'translateY(-50px)'}}>{t('auth.message.user-created')}</Text>
				</Stack>
			</Box>
			<Center>
				<RedButton onClick={() => lottieRef.current?.play()}>
					{t("auth.button.login")}
				</RedButton>
			</Center>
		</Fragment>
	);
}

export default SuccessStage;