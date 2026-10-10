import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({base:'/integrations/motion-vault/',plugins:[react()],resolve:{alias:{'@':path.resolve(__dirname,'src')}},build:{outDir:'dist'}});
