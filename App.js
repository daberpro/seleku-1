console.clear();

let Seleku = require("./dist/seleku-compiler");

Seleku.compile({
	file: "res/main.seleku",
	isComponent: false,
	renderTarget: "#app",
	asyncMode: "off"
});

Seleku.compile({
	file: "res/card.seleku",
	isComponent: true,
	renderTarget: "body",
	asyncMode: "off"
});

