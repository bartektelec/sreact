import { signal } from "../core/signal";
import { html } from "../core/component";

const count = signal(1);

count.bind(document.querySelector("#abc"), "innerHTML");

document.querySelector("#btn").onclick = () => {
	count.value++;
};
document.querySelector("#btn-dec").onclick = () => {
	count.value--;
};

html` <div onclick=${count} class=${20}>hello ${count} ${"peoples"}</div>`;
