import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './structure';

export default defineConfig({
  name: 'URBANO_Catalogo',
  title: 'URBANO - Catálogo de Ropa',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'hwujeebe',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});