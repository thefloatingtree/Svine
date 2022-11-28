import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svine } from './src/lib/svine/plugin/svine';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const dev = env.npm_lifecycle_event === 'dev';
    return {
        plugins: [svine({ dev }), svelte({ compilerOptions: { dev }, hot: dev })],
        build: {
            minify: false
        }
    }
});

