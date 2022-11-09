import React from 'react';
import { NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRequestAttributes } from '@server';
import { Flex, Image, Text } from '@mantine/core';


function MainPage() {
	return (
		<Flex justify="space-between" align="center">
			<Text sx={{width: '20vw', paddingRight: '20px'}}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere, orci non varius scelerisque, massa neque rhoncus augue, in pulvinar turpis metus sit amet justo. Vestibulum posuere ac nunc non tincidunt. Phasellus feugiat non est nec consequat. Quisque massa diam, consectetur eu gravida id, cursus eu risus. Vivamus egestas mauris eu massa fringilla viverra. Suspendisse tincidunt metus consectetur, pellentesque libero nec, viverra enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer posuere ligula nec viverra finibus. Proin nec mauris vel orci elementum tristique. Sed porta condimentum neque. Mauris dignissim urna quis tempus eleifend.
				Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse lorem sapien, facilisis eget magna in, lobortis faucibus arcu. Sed tincidunt lectus dui, vel luctus purus fringilla in. Pellentesque nec magna ut nisi tristique vulputate sed vitae ipsum. Morbi nec congue metus. Sed pulvinar enim vitae mauris vulputate, ac interdum justo rutrum. Vivamus auctor sit amet mauris sit amet commodo. Vestibulum aliquet, ipsum non bibendum luctus, ligula turpis pulvinar odio, at semper orci tellus efficitur tellus. Morbi mollis mi eget convallis pharetra. Maecenas et tellus orci. Nulla hendrerit lectus nulla, nec tempus felis aliquam non. Nam ante purus, fermentum eu maximus eu, volutpat eu justo. Pellentesque fermentum dui nec feugiat tincidunt. Vivamus sed mauris in ligula finibus faucibus. Vivamus elementum egestas dolor, non volutpat mi tempor sed. Aenean et ultricies mi, ac mollis massa.
			</Text>
			<Image sx={{alignSelf: 'start'}} src="/background.jpg" alt='' width='auto' height='80vh'/>
			<Text sx={{width: '20vw', paddingLeft: '20px'}}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere, orci non varius scelerisque, massa neque rhoncus augue, in pulvinar turpis metus sit amet justo. Vestibulum posuere ac nunc non tincidunt. Phasellus feugiat non est nec consequat. Quisque massa diam, consectetur eu gravida id, cursus eu risus. Vivamus egestas mauris eu massa fringilla viverra. Suspendisse tincidunt metus consectetur, pellentesque libero nec, viverra enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer posuere ligula nec viverra finibus. Proin nec mauris vel orci elementum tristique. Sed porta condimentum neque. Mauris dignissim urna quis tempus eleifend.
				Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse lorem sapien, facilisis eget magna in, lobortis faucibus arcu. Sed tincidunt lectus dui, vel luctus purus fringilla in. Pellentesque nec magna ut nisi tristique vulputate sed vitae ipsum. Morbi nec congue metus. Sed pulvinar enim vitae mauris vulputate, ac interdum justo rutrum. Vivamus auctor sit amet mauris sit amet commodo. Vestibulum aliquet, ipsum non bibendum luctus, ligula turpis pulvinar odio, at semper orci tellus efficitur tellus. Morbi mollis mi eget convallis pharetra. Maecenas et tellus orci. Nulla hendrerit lectus nulla, nec tempus felis aliquam non. Nam ante purus, fermentum eu maximus eu, volutpat eu justo. Pellentesque fermentum dui nec feugiat tincidunt. Vivamus sed mauris in ligula finibus faucibus. Vivamus elementum egestas dolor, non volutpat mi tempor sed. Aenean et ultricies mi, ac mollis massa.
			</Text>
		</Flex>
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

export default MainPage;