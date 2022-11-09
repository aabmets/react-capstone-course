/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import React from 'react';
import { Models } from 'appwrite';
import { Center, Flex, Space, Stack } from '@mantine/core';
import { NextPageContext } from 'next';
import { Fragment, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRequestAttributes } from '@server';
import { useAppwriteContext } from '@context';


type UserData = Models.Account<Models.Preferences> | undefined;

function AccountPage() {
	const { account } = useAppwriteContext();
	const [user, setUser] = useState<UserData>(undefined);

	useEffect(() => {
		account.get()
			.then((res: UserData) => {
				setUser(res)
			})
			.catch(() => {});
	}, [])

	return (
		<Fragment>
			{user && <Center>
				<Flex align='center'>
					<Stack align="flex-end" justify="flex-start" spacing={5}>
						{Object.keys(user).map((key) => 
							<div key={key}>
								{key}:
							</div>
						)}
					</Stack>
					<Space w={10}/>
					<Stack align="flex-start" justify="flex-start" spacing={5}>
						{Object.values(user).map(value => 
							<div key={Math.random()}>
								{String(value) || 'unknown'}
							</div>
						)}
					</Stack>
				</Flex>
			</Center>}
		</Fragment>
	);
}

export async function getServerSideProps({ req }: NextPageContext) {
	const { scheme, locale } = getRequestAttributes(req);
	const ts = await serverSideTranslations(
		locale, ['common', 'settings', 'auth']
	);
	return {
		props: {
			...ts, 
			locale, 
			scheme
		}
	};
}

export default AccountPage;