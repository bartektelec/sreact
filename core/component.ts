const component =
	(
		template: string,
		data: (p: Record<string, any>) => Record<string, any> = (p) => p
	) =>
	(props: Record<string, any>) => {
		const model = data(props);

		const html = parse(template);

		return { html, data: { ...props, ...model } };
	};

const parse = (temp: string) => {
	const parser = new DOMParser();
	const parsed = parser.parseFromString(temp, 'text/html');
	const el = parsed.body;
	const styles = parsed.styleSheets;

	return el.children[0].outerHTML;
};

export { component };
