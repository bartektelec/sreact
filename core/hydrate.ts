// @ts-nocheck just dont

const redir = () => {
	const path = location.pathname;
	if (!path || path === '/') return;

	if (path.match(/\.\w+$/i)) {
		return;
	}

	location.replace(path + '/index.html');
};

const hydrate = (model: Record<string, unknown> = {}) => {
	redir();

	const nodes = [...document.body.children];

	for (let i = 0; i < nodes.length; i++) {
		const element = nodes[i];
		const events: [string, string][] = [];
		const bound: [string, string][] = [];
		const texts: [string | { bind: () => {} }][] = [];

		const attrs = element.getAttributeNames();

		// SECTION iterate through all @ and on: and bind events
		for (let i = 0; i < attrs.length; i++) {
			const attr = attrs[i];
			const v = element.getAttribute(attr)!;

			if (attr.startsWith('on:') || attr.startsWith('@')) {
				const key = attr.replace('on:', '').replace('@', '');

				events.push([key, v]);

				element.removeAttribute(attr);
			}
			if (attr.startsWith(':')) {
				const key = attr.slice(1);

				bound.push([key, v]);
				element.removeAttribute(attr);
			}
		}

		for (let [event, state] of events) {
			const s = model[state];
			// FIXME add typeguard
			if (s && 'bind' in s && 'value' in s) {
				s.bind(element, `on${event}`, s);
			} else {
				element[`on${event}`] = s ?? state;
			}
		}

		for (let [att, state] of bound) {
			const s = model[state];
			// FIXME add typeguard
			if (s && typeof s === 'object' && 'bind' in s && 'value' in s) {
				s.bind(element, att);
			} else {
				element.setAttribute(att, s ?? state);
			}
		}

		let interpolate = false;
		let raw = element.textContent ?? '';

		for (let word of raw.split(' ')) {
			if (word.startsWith('{{')) interpolate = true;

			if (interpolate) {
				const w = word.replace('{{', '').replace('}}', '');
				if (!w) continue;

				const s = model[w];
				if (s && 'bind' in s && 'value' in s) {
					const before = /\{{2}\s*/;
					const after = /\s*\}{2}/;
					const reg = new RegExp(before.source + w + after.source, 'g');

					s.bind(element, 'textContent', () => raw?.replace(reg, s.toString()));
				} else {
					element.textContent = raw?.replace(word, w);
				}
			}

			if (word.endsWith('}}')) interpolate = false;
		}
	}
};

export { hydrate };
