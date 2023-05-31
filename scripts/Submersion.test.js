import { sleep, check } from "k6";
import http from "k6/http";
const ENV = "https://reqres.in/api/";
// testes de imersão
export const options = {
	stages: [
		{ duration: "30s", target: 100 }, // ramp up
		{ duration: "30s", target: 100 }, // periodo de Stress
		{ duration: "30s", target: 0 }, // ramp down
	],
};

export default function () {
	const requestBody = {
		name: generateRandomName(),
		job: GD,
	};

	let res = http.post(`${ENV}api/users`, JSON.stringify(requestBody), {
		headers: {
			"Content-Type": "application/json",
		},
	});
	console.log(requestBody);
	check(res, {
		"Status deve retornar 201": (r) => r.status === 201,
		"Deverá retornar o Body response": (r) => r.body !== null,
	});

	sleep(1);
}

///////////////////////// MASSA DE DADOS /////////////////////////////

//////// NOME ///////////////

var generatedNames = new Set();

export function generateRandomName() {
	var vowels = ["a", "e", "i", "o", "u"];
	var consonants = [
		"b",
		"c",
		"d",
		"f",
		"g",
		"h",
		"j",
		"k",
		"l",
		"m",
		"n",
		"p",
		"q",
		"r",
		"s",
		"t",
		"v",
		"w",
		"x",
		"y",
		"z",
	];

	var name = "";
	var length = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
	var startWithConsonant = Math.random() < 0.8;

	for (var i = 0; i < length; i++) {
		if (i === 0 && startWithConsonant) {
			name += consonants[Math.floor(Math.random() * consonants.length)];
		} else if (i === 1 && !startWithConsonant) {
			name += vowels[Math.floor(Math.random() * vowels.length)];
		} else {
			if (i % 2 === 0) {
				name += consonants[Math.floor(Math.random() * consonants.length)];
			} else {
				name += vowels[Math.floor(Math.random() * vowels.length)];
			}
		}
	}

	// Verificar se o nome já foi gerado antes
	if (generatedNames.has(name)) {
		console.warn("Nome repetido encontrado: " + name);
		// Se for repetido, gerar um novo nome chamando a função novamente recursivamente
		return generateRandomName();
	} else {
		// Se for único, adicionar o nome ao conjunto de nomes gerados e retorná-lo
		generatedNames.add(name);
		return name;
	}
}

/////////////////// CARGOS /////////////////

let Gender = ["DEV", "QA", "PO", "AGILEMASTER", "COORDENADOR"];

const GD = Gender[Math.floor(Math.random() * Gender.length)];
