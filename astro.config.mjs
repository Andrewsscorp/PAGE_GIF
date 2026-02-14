// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  // Tu URL basada en el usuario Andrewsscorp
  site: 'https://Andrewsscorp.github.io',
  
  // CORRECCIÓN CRÍTICA: Debe coincidir con el nombre exacto de tu repo en GitHub
  base: '/PAGE_GIF', 
  
  integrations: [tailwind(), react()],
});