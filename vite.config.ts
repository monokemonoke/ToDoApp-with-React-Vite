import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: true,
	},
	build: {
		outDir: '../public',
	},
	root: './src',
	plugins: [react({ jsxImportSource: '@emotion/react' })],
});
