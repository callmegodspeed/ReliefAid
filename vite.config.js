import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                about: resolve(__dirname, 'src/pages/about.html'),
                contact: resolve(__dirname, 'src/pages/contact.html'),
                donation: resolve(__dirname, 'src/pages/donation.html'),
                getHelp: resolve(__dirname, 'src/pages/get-help.html'),
                interactiveMap: resolve(__dirname, 'src/pages/interactive-map.html'),
                inventory: resolve(__dirname, 'src/pages/inventory.html'),
                partner: resolve(__dirname, 'src/pages/partner.html'),
                privacy: resolve(__dirname, 'scr/pages/privacy.html'),
                volunteer: resolve(__dirname, 'scr/pages/volunteer.html'),
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});