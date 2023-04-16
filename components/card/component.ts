import template from './component.html?raw';
import { component } from '../../core/component';
import { signal } from '../../core/signal';

export default component(template, (props) => {
	const count = signal(0);
	const change = (e) => {
		count.value = e.target.valueAsNumber;
	};

	const changeProp = () => {
		props.dynprop.value++;
	};

	return { count, change, changeProp };
});
