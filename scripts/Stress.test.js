import { sleep, check } from "k6";
import http from "k6/http";
const ENV = 'https://reqres.in/api/'

export const options = {
	stages: [
		{ duration: "30s", target: 3 }, // Abaixo da carga Normal
		{ duration: "1m", target: 3 },
		{ duration: "30s", target: 5 }, // Carga Load
		{ duration: "1m", target: 5 },
		{ duration: "30s", target: 7 }, // Perto do ponto de Stress
		{ duration: "1m", target: 7 },
		{ duration: "30s", target: 10 }, // Além do ponto de Stress
		{ duration: "1m", target: 10 },
		{ duration: "1m", target: 1 }, // ramp-down, Estágio de recuperação
	],
	thresholds: {
		http_req_failed: ["rate<0.01"],
		http_req_duration: ["p(95)<500"], // 95% das requisições devem ser abaixo de 500ms
	},
};

export default function () {
	
	let res = http.get(`${ENV}users?page=2`);

	check(res, {
		"Status deve retornar 200": (r) => r.status === 200,
	});

	sleep(1);
}