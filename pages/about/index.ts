import { signal, derive } from '../../core/signal';
import { hydrate } from '../../core/hydrate';

const slide = signal(0);
const color = signal('#ffffff');
const count = signal(0);
const dbl = derive(count, (c) => c * 2);
const dbldbl = derive(dbl, (c) => c * 2);

const t = setInterval(() => {
	count.value++;
	slide.value += 0.25;
}, 500);

const onSlide = (e) => {
	slide.value = e.target.value;
};
const stop = () => {
	clearInterval(t);
};

const reset = () => {
	count.value = 0;
};

const onPick = (e) => {
	color.value = e.target.value;
};

hydrate({ slide, color, onSlide, dbldbl, reset, onPick, stop, dbl, count });
