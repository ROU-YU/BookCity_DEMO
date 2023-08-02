import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'

const config = ({ mode }) => {
  const isProd = mode === 'production'
  const envPrefix = 'APP_'
  const env = loadEnv(mode, process.cwd())
  const { APP_TITLE = '' } = loadEnv(mode, process.cwd(), envPrefix)
  return {
    base: env === 'production' ? '/ToDoList/' : './',
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: isProd,
        inject: {
          data: {
            title: APP_TITLE,
          },
        }
      })
    ],
    build: {
      target: 'es2015',
      outDir: path.resolve(__dirname, 'dist'),
      assetsDir: 'assets',
      assetsInlineLimit: 8192,
      chunkSizeWarningLimit: 1500,
      sourcemap: !isProd,
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
          // assetFileNames: "assets/[name].[hash].[ext]",
          manualChunks (id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    envPrefix,
    resolve: {
      alias: [
        { find: /^@\//, replacement: `${path.resolve(__dirname, 'src')}/` },
        { find: /^~/, replacement: '' }
      ],
      extensions: ['.js', '.mjs', '.vue', '.json', '.less', '.css']
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer
        ],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, 'src/styles/variable.less')}";`
        }
      }
    },
    server: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true
        }
      }
    },
    preview: {
      port: 5000
    }
  }
}

export default defineConfig(config)
