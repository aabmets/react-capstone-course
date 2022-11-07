import React, { Fragment, useRef } from 'react';
import axios, { AxiosResponse } from "axios";
import { useTranslation } from 'next-i18next';
import { Space, Flex, Group, Stack, Center, Text } from '@mantine/core';
import { BorderedButton, RedButton } from '@components';
import siteConfig from 'site.config';
import * as ctx from '@auth/context';
import * as props from '@auth/props';
import { Image } from '@mantine/core';
import * as hooks from '@auth/hooks';
import { ModalState } from '@auth/state';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import successLottie from 'public/success-lottie.json';


function SuccessStage(): JSX.Element {
	const { email, password } = ctx.useDatastoreContext();
	const { t } = useTranslation('auth');

	const lottieRef = useRef<LottieRefCurrentProps | null>(null);
	lottieRef.current?.setSpeed(0.8);
	
	function login() {

	}
	
	const lottieProps = {
		loop: false,
		lottieRef: lottieRef,
		animationData: successLottie,
		style: { width: 70, height: 70 },
	};

	return (
		<Group>
			<Lottie {...lottieProps} /> 
			<Space h={5}/>
			<Stack>
				<Text sx={{fontSize: '1rem', fontWeight: 600 }}>
					{t('auth.message.user-created')}
				</Text>
				<Center>
					<RedButton onClick={login}>
						{t("auth.button.login")}
					</RedButton>
				</Center>
			</Stack>
		</Group>
	);
}

export default SuccessStage;