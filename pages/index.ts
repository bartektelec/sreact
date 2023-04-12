import { signal } from '../core/signal';
import { html } from '../core/component';
import { hydrate } from '../core/hydrate';

const count = signal(1);
const name = signal('Hello world');

const incCounter = () => {
	count.value += 5;
};

const decCounter = () => {
	count.value -= 5;
};

const setFixed = () => {
	count.value = 50;
};

const handleType = (e) => {
	name.value = e.target.value;
};

hydrate({ incCounter, count, decCounter, handleType, name, setFixed });
