type Signal<A = unknown> = ReturnType<typeof signal<A>>;

const isSignal = <A>(input: Signal<A> | A): input is Signal<A> =>
	input &&
	typeof input === 'object' &&
	'subscribe' in input &&
	'value' in input;

const signal = <A>(input: A) => {
	const subscribe = (fn: Subscriber) => {
		console.log('subscribe');
		subscribers.push(fn);

		emit();
	};

	const state = {
		value: input,
		toString: (): string => String(prox.value),
		subscribe,
	};

	type Subscriber = (v: A) => void;

	const subscribers: Subscriber[] = [];

	const prox = new Proxy(state, {
		get(target, p) {
			if (Object.keys(state).includes(String(p)))
				return (target as typeof state)[p as keyof typeof state];

			return target.value;
		},
		set(t, p, v) {
			console.log('set');
			t[p as keyof typeof t] = v;

			emit();
			return true;
		},
	});

	const emit = () => {
		console.log('emit');
		for (let idx = 0; idx < subscribers.length; idx++) {
			updateIdx(idx);
		}
	};

	const updateIdx = (idx: number) => {
		if (subscribers.length <= idx) return;

		const fn = subscribers[idx];

		fn(prox.value);
	};

	return prox;
};

const derive = <T>(
	deps: Signal | Signal[],
	fn: (x: unknown | unknown[]) => T
) => {
	const state = signal<T | null>(null);

	console.log('############ DERIVED ##########');
	console.log(deps);
	console.log(fn);

	if (Array.isArray(deps)) {
		for (let i = 0; i < deps.length; i++) {
			deps[i].subscribe(() => {
				state.value = fn(deps.map((d) => d.value));
			});
		}
	} else {
		deps.subscribe((d) => (state.value = fn(d)));
	}

	return state;
};

export { signal, type Signal, derive, isSignal };
