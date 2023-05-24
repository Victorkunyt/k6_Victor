import { sleep, check } from "k6";
import http from "k6/http";
const ENV = "https://reqres.in/api/";
// testes de imersão
export const options = {
	stages: [
		{ duration: "30s", target: 18 }, // ramp up
		{ duration: "30s", target: 18 }, // periodo de Stress
		{ duration: "30s", target: 0 }, // ramp down
	],
};

export default function () {
	let res = http.get(`${ENV}users?page=2`);

	check(res, {
		"Status deve retornar 200": (r) => r.status === 200,
	});

	sleep(1);
}
