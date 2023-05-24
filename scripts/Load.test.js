import http from "k6/http";
import { check, sleep } from "k6";
const ENV = "https://reqres.in/api/";

export const options = {
	stages: [
		{ duration: "1m", target: 100 }, // Simulação de carga gradual de 0 a 100 usuários em 1 minuto
		// ramp up
		{ duration: "3m", target: 100 }, /// Mantém 100 usuários por 3 minutos
		// periodo de Stress
		{ duration: "1m", target: 0 }, // ramp-down / Reduz gradualmente a carga de 100 a 0 usuários em 1 minuto
	],
	thresholds: {
		http_req_failed: ["rate<0.05"], // Taxa de falha menor que 5%
		http_req_duration: ["p(95)<2000"], // 95% das requisições devem ser concluídas em menos de 500ms
	},
};

export default function () {
	let res = http.get(`${ENV}users?page=2`);
	check(res, { "status is 200": (r) => r.status === 200 });
	sleep(0.3);
}
