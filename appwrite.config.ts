// Appwrite Project Configuration Settings

const appwriteConfig = {
	apiEndpoint: 'http://localhost/v1',
	projectID: 'fancy-palace-exhibit',
	buckets: [
		{
			name: 'product-images',
			id: '63564e8793414e928db8'
		}
	],
	databases: [
		{
			name: 'webstore',
			id: '63564e7a38fadb276978',
			collections: [
				{
					name: 'products',
					id: '63564ec0454b95554a8a'
				}
			]
		}
	]
}

export default appwriteConfig;