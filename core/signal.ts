// @ts-nocheck just dont

const isSignal = (input: any): input is Signal => {
	input && typeof input === 'object' && 'bind' in input && 'value' in input;
};

const signal = <A>(input: A) => {
	const bind = <T>(obj: T, k: keyof T, fn = (x: typeof prox) => x.value) => {
		bound.push([obj, k, fn]);

		invalidate();
	};

	const state = {
		value: input,
		toString: () =>
			prox.value.toString ? prox.value.toString() : JSON.stringify(prox.value),
		bind,
	};

	const bound: [unknown, PropertyKey, () => unknown][] = [];

	const prox = new Proxy(state, {
		get(target, p) {
			if (p === 'toString' || p === 'bind') return target[p];

			return target.value;
		},
		set(t, p, v) {
			t[p] = v;

			invalidate();
			return true;
		},
	});

	const invalidate = () => {
		for (let idx = 0; idx < bound.length; idx++) {
			updateIdx(idx);
		}
	};

	const updateIdx = (idx: number) => {
		if (bound.length <= idx) return;

		const [t, k, fn] = bound[idx];
		if (k in t) {
			if (t[k] === fn(prox)) return;

			(t as any)[k] = fn(prox);
		} else if ('setAttribute' in t) {
			const prev = t.getAttribute(k);
			if (prev === fn(prox)) return;

			t.setAttribute(k, fn(prox));
		}
	};

	return prox;
};

type Signal = ReturnType<typeof signal>;

const derive = <Dep extends Signal | Signal[]>(
	deps: Dep,
	fn: (x: Dep) => Signal
) => {
	const state = signal(null);

	if (Array.isArray(deps)) {
		for (let i = 0; i < deps.length; i++) {
			deps[i].bind(state, 'value', () => fn(deps.map((s) => s.value)));
		}
	} else {
		deps.bind(state, 'value', () => fn(deps.value));
	}

	return state;
};

export { signal, Signal, derive, isSignal };
