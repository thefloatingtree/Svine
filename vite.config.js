import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svine } from './src/lib/svine/plugin/svine';
import { loadEnv } from 'vite';
import { markdown } from 'svelte-preprocess-markdown';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const dev = env.npm_lifecycle_event === 'dev';
    return {
        plugins: [
            svelte({
                preprocess: markdown(),
                extensions: ['.svelte', '.md']
            }),
            svine({ dev })
        ],
        build: {
            minify: false
        }
    };
});

