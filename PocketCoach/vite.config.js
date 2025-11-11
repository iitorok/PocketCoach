import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/*export default defineConfig({
  plugins: [react()],
})*/
export default defineConfig({
  plugins: [react()],
  base: 'https://iitorok.github.io/PocketCoach/', // replace <repo-name> with your GitHub repo name
});
