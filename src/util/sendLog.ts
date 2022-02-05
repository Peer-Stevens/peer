import axios from "axios";
import { NEWRELIC_LICENSE } from "./env";

export type SendLogArgs = {
	logtype: string;
	logs: Array<{
		message: string;
		timestamp?: number;
		attributes?: { [key: string]: string | number | boolean };
	}>;
};
// send a log to newrelic using the API
export const sendLog = ({ logtype, logs }: SendLogArgs): void => {
	void axios({
		method: "post",
		url: "https://log-api.newrelic.com/log/v1",
		data: [
			{
				common: {
					attributes: {
						logtype,
						service: "peer-app",
						hostname: "peer-app",
					},
				},
				logs,
			},
		],
		headers: {
			"Content-Type": "application/json",
			"Api-Key": NEWRELIC_LICENSE,
		},
	}).catch(e => {
		// eslint-disable-next-line no-console
		console.log(e);
	});
};
