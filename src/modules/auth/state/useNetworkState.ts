import axios from 'axios';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import siteConfig from 'site.config';


interface ServerResponse extends AxiosResponse {
	data: {
		serverTime: number;
	}
}
export interface NetworkState {
	readonly isLatencyGood: () => boolean;
	readonly isLatencyBad: () => boolean;

	readonly setLatencyGood: () => void,
	readonly setLatencyBad: () => void,

	readonly getLatency: () => number;
	readonly testLatency: () => void;
}

export function useNetworkState(): NetworkState {
	const [latency, setLatency] = useState(0);
	const { auth } = siteConfig;

	function testLatency() {
		const clientTime = Date.now();
		const request = {
			timeout: auth.maxLatencyMsec,
			url: '/api/test-network-latency',
			method: 'GET',
		};
		axios(request)
			.then((res: ServerResponse) => {
				if (res.status === 200) {
					const serverTime = res.data.serverTime;
					setLatency(serverTime - clientTime);
				} else {
					setLatency(Infinity);
				}
			})
			.catch(() => setLatency(Infinity));
	}
	
	return {
		isLatencyGood: () => latency < auth.maxLatencyMsec,
		isLatencyBad: () => latency > auth.maxLatencyMsec,

		setLatencyGood: () => setLatency(0),
		setLatencyBad: () => setLatency(Infinity),

		getLatency: () => latency,
		testLatency,
	};
}