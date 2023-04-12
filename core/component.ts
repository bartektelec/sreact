// const component = (html: string) => {
// 	const el = document.createElement("div");
// 	el.style.display = "contents";
// };

// const alphabet =
// 	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// const uuid = () =>
// 	Array(7)
// 		.fill(null)
// 		.map(() => alphabet.charAt(Math.floor(Math.random() * alphabet.length)))
// 		.join("");

// const html = (strings: string[], ...vars) => {
// 	let out = "";
// 	for (let i = 0; i < strings.length; i++) {
// 		const state = vars[i];

// 		if (!state) {
// 			out += strings[i];
// 			continue;
// 		}

// 		if (typeof state === "object" && "bind" in state && "value" in state) {
// 			const id = uuid();
// 			const data = `data-reactive-${id}`;
// 			out += ` ${data} `; // generate uuid

// 			const prop = strings[i].replace("=", "").split(" ");
// 			state.bind(document.querySelector(data), prop[prop.length - 1]);

// 			out += strings[i] + state.toString();
// 		}
// 		out += strings[i] + state.toString();
// 	}

// 	console.log(out);
// 	return out;
// };

// export { component, html };

export {};
