import { signal } from "../core/signal";

const count = signal(1);

count.bind(document.querySelector("#abc"), "innerHTML");

document.querySelector("#btn").onclick = () => {
	count.value++;
};
document.querySelector("#btn-dec").onclick = () => {
	count.value--;
};
