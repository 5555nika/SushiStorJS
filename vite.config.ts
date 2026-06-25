import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Устанавливаем относительный базовый путь, чтобы пути к файлам 
  // на GitHub Pages (где адрес имеет вид github.io/repo-name/) работали корректно.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
});
