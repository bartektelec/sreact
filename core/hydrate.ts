import { isSignal, Signal } from './signal';

const redir = () => {
	const path = location.pathname;
	if (!path || path === '/') return;

	if (path.match(/\.\w+$/i)) {
		return;
	}

	location.replace(path + '/index.html');
};

const hydrate = (
	model: Record<string, unknown> = {},
	root: Element = document.body
) => {
	redir();

	const nodes = Array.from(root.children);
	for (let i = 0; i < nodes.length; i++) {
		const element = nodes[i];
		const events: [
			Parameters<Element['addEventListener']>[0],
			keyof typeof model
		][] = [];
		const bound: [string, Signal | string][] = [];

		const hasChildren = Array.from(element.children).length;
		if (hasChildren) hydrate(model, element);

		const attrs = element.getAttributeNames();

		if (element.localName.startsWith('c-')) continue;

		// SECTION iterate through all @ and on: and bind events
		for (let i = 0; i < attrs.length; i++) {
			const attr = attrs[i];
			const v = element.getAttribute(attr)!;

			if (attr.startsWith('on:') || attr.startsWith('@')) {
				const key = attr.replace('on:', '').replace('@', '');

				events.push([key as keyof ElementEventMap, v]);

				element.removeAttribute(attr);
			}
			if (attr.startsWith(':')) {
				const key = attr.slice(1);

				bound.push([key, v]);
				element.removeAttribute(attr);
			}
		}

		for (let [event, state] of events) {
			const s = model[state] as Signal | unknown;
			const k = `on${event}` as const;
			// FIXME add typeguard
			//
			console.log('IM IN EVENT!!!!!!!!!', state);
			console.log(k);
			console.log(s);
			if (isSignal(s)) {
				let cb = s.value;
				console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

				s.subscribe((state) => {
					cb = state;
					element[k] = cb;
				});
			} else {
				element[k] = s;
			}
		}

		for (let [att, state] of bound) {
			const s = model[state] as Signal | unknown;
			// FIXME add typeguard
			if (isSignal(s)) {
				s.subscribe((_s) => {
					element.setAttribute(att, _s.toString());
				});
			} else {
				console.log(s);
				// element.setAttribute(att, s ?? state);
			}
		}

		let interpolate = false;
		let raw = element.innerHTML ?? '';

		for (let word of raw.split(' ')) {
			if (word.startsWith('{{')) interpolate = true;

			if (interpolate) {
				const w = word.replace('{{', '').replace('}}', '');
				if (!w) continue;

				const s = model[w];
				const before = /\{{2}\s*/;
				const after = /\s*\}{2}/;
				const reg = new RegExp(before.source + w + after.source, 'g');

				if (isSignal(s)) {
					s.subscribe(() => {
						element.innerHTML = raw?.replace(reg, s.toString());
					});
				} else {
					if (s?.toString()) {
						element.innerHTML = raw?.replace(reg, s.toString());
					}
				}
			}

			if (word.endsWith('}}')) interpolate = false;
		}

		for (let i = 0; i < Array.from(root.children).length; i++) {
			const el = root.children[i];
			if (el.localName.startsWith('c-')) {
				const comp = el.localName.slice(2);

				if (!model[comp]) continue;

				const x = el
					.getAttributeNames()
					.map((x) => [x, el.getAttribute(x)])
					.map(([k, v]) => {
						let val = v;
						let key = k;

						if (k.startsWith(':') || k.startsWith('@')) {
							key = k.slice(1);
							val = model[v];
						}

						return [key, val];
					});
				const props = Object.fromEntries(x);

				const { html, data } = model[comp](props);

				el.outerHTML = html;
				hydrate(data, root.children[i]);
			}
		}
	}
};

export { hydrate };
