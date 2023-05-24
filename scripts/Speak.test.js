import { sleep, check } from "k6";
import http from "k6/http";
import { Trend, Rate } from "k6/metrics";
const ENV = "https://reqres.in/api/";

export const options = {
	stages: [
		{ duration: "10s", target: 3 }, // Abaixo da carga Normal
		{ duration: "30s", target: 3 },
		{ duration: "10s", target: 16 }, // Pico para 16 usuários
		{ duration: "1m", target: 16 }, // Mantém os 16 usuários por 1 minuto
		{ duration: "10s", target: 3 }, // Ramp-down, Estágio de recuperação
		{ duration: "1m", target: 3 }, // Ramp-down, Estágio de recuperação
		{ duration: "10s", target: 0 }, // Ramp-down, Estágio de recuperação com 0 usuário
	],
	thresholds: {
		http_req_failed: ["rate<0.01"], // Taxa de falha menor que 1%
		http_req_duration: ["p(95)<1000"], // 95% das requisições devem ser abaixo de 1000ms
	},
};

export default function () {
	let res = http.get(`${ENV}users?page=2`);

	check(res, {
		"Status deve retornar 200": (r) => r.status === 200,
	});

	sleep(1);
}
