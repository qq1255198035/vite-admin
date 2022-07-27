import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import Unocss from 'unocss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      Icons({ compiler: 'vue3', autoInstall: true }),
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.ts',
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        // 可以在这自定义自己的东西，比如接口api的引入，工具函数等等
        // see https://github.com/antfu/unplugin-auto-import/pull/23/
        resolvers: [
          /* ... */
          ElementPlusResolver()
        ],
        dts: './src/auto-imports.d.ts'
      }),
      Components({
        deep: true,
        // 按需加载的文件夹
        dirs: ['src/components'],
        // 组件的有效文件扩展名
        extensions: ['vue', 'md', 'tsx'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ],
        dts: './src/components.d.ts'
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()]
      }),
      Unocss({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true
          })
        ],
        transformers: [transformerDirectives(), transformerVariantGroup()]
      })
    ],
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@use '@/assets/styles/element/index.scss' as *;`
        }
      }
    },
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: true,
      open: true,
      port: 8989,
      hmr: {
        overlay: false
      },
      proxy: {
        '/mockapi': {
          target:
            'https://www.fastmock.site/mock/b94355a454a22cec575bdedbde5b2cb2/api',
          changeOrigin: true,
          rewrite: pathStr => pathStr.replace(/^\/mockapi/, '')
        }
      }
    }
  }
})
