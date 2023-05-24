import { sleep, check } from "k6";
import http from "k6/http";
import { Trend, Rate } from "k6/metrics";
const ENV = "https://reqres.in/api/";

export const options = {
	vus: 10,
	duration: "30s", // manter 10 usuários constantes por 30 segundos.
};

const errorRate = new Rate("errors");
const responseTimes = new Trend("response_time");

export default function () {
	const startTime = new Date().getTime();

	let res = http.get(`${ENV}users?page=2`);

	const endTime = new Date().getTime();
	const duration = endTime - startTime;

	errorRate.add(res.status !== 200);
	responseTimes.add(duration);

	check(res, {
		"Status deve retornar 200": (r) => r.status === 200,
		"Returned Body": (r) => r.body !== null,
	});

	sleep(1);
}
