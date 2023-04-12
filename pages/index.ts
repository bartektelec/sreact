import { signal } from '../core/signal';
import { hydrate } from '../core/hydrate';

const count = signal(1);
const name = signal('blue');
const divStyle = signal('');
const size = signal(17);
name.bind(
	divStyle,
	'value',
	() => `color: ${name.value}; font-size: ${size.value}px`
);
size.bind(
	divStyle,
	'value',
	() => `color: ${name.value}; font-size: ${size.value}px`
);

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

const handleSize = (e) => {
	size.value = e.target.valueAsNumber;
};

const reset = () => {
	name.value = 'blue';
	size.value = 16;
};

hydrate({
	count,
	name,
	size,
	handleSize,
	divStyle,
	incCounter,
	reset,
	decCounter,
	handleType,
	setFixed,
});
