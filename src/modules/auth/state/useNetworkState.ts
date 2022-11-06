/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

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

	readonly testLatency: () => void;
	readonly latency: State;
}

enum State {GOOD, BAD};

export function useNetworkState(): NetworkState {
	const [latency, setLatency] = useState(State.GOOD);
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
					const roundTrip = serverTime - clientTime;
					if (roundTrip < auth.maxLatencyMsec) {
						setLatency(State.GOOD);
					} else {
						setLatency(State.BAD);
					}
				} else {
					setLatency(State.BAD);
				}
			})
			.catch(() => setLatency(State.BAD));
	}
	
	return {
		isLatencyGood: () => latency === State.GOOD,
		isLatencyBad: () => latency === State.BAD,

		setLatencyGood: () => setLatency(State.GOOD),
		setLatencyBad: () => setLatency(State.BAD),

		testLatency,
		latency,
	};
}