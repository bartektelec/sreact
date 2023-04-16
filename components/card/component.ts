import { hydrate } from '../../core/hydrate';
import template from './component.html?raw';
import { component } from '../../core/component';
import { signal } from '../../core/signal';

export default component(template, (props) => {
	const count = signal(props.init ? Number(props.init) : 0);

	const inc = () => {
		count.value++;
	};

	return { count, inc };
});
