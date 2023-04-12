import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
	root: 'pages',
	build: {
		outDir: '../dist',
	},
});
