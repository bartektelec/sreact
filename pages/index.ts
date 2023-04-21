import { signal, Signal, derive } from '../core/signal';
import { hydrate } from '../core/hydrate';
import card from '../components/card/component';

const secret = 123;
const count = signal(1);
const name = signal('blue');
const size = signal(17);

const divStyle = derive(
	[name, size],
	([n, s]) => `color: ${n}; font-size: ${s}px`
);

const divText = derive(name, (n) => (n === 'hey' ? 'What up' : n));

const doubled = derive(count, (n) => n * 2);
const dd = derive(doubled, (d) => d * 2);
const doubledDoubledText = derive([dd, name], ([c, t]) => `${c} of ${t}`);

const incCounter = () => {
	count.value += 5;
};

const decCounter = () => {
	count.value -= 5;
};

const rand = () => {
	count.value = Math.floor(Math.random() * 100);
};

const handleType = (e) => {
	name.value = e.target.value;
};

const handleSize = (e) => {
	console.log(e.target.value);
	console.log('handleSize');
	console.log(size.value);
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
	divText,
	handleSize,
	secret,
	doubled,
	divStyle,
	doubledDoubledText,
	incCounter,
	reset,
	decCounter,
	handleType,
	rand,
	card,
});
