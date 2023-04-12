const signal = <A>(input: A) => {
	const bind = <T>(obj: T, k: keyof T, fn = (x: typeof prox) => x.value) => {
		bound.push([obj, k, fn]);
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
			(t as any)[k] = fn(prox);
		} else if ('setAttribute' in t) {
			t.setAttribute(k, fn(prox));
		}
	};

	return prox;
};

export { signal };
