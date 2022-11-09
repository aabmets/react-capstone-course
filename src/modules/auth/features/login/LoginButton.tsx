import React from 'react';
import { Fragment, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useLocalStorage } from 'usehooks-ts';
import { AppwriteException } from 'appwrite';
import { showNotification } from '@mantine/notifications';
import { useMantineColorScheme, Group } from '@mantine/core';
import { IconLogin, IconX } from '@tabler/icons';
import { useAppwriteContext } from '@context';
import { AuthDatastoreProvider } from '@auth/context';
import { useFormState } from '@auth/state';
import { LoginForm } from './form/LoginForm';


export function LoginButton(): JSX.Element {
	const form = useFormState();

	return (
		<AuthDatastoreProvider key={form.resetKey} persist={{ form }}>
			<LoginForm/>
		</AuthDatastoreProvider>
	);
}