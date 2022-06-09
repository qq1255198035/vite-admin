import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import Unocss from 'unocss/vite'
import {
	presetAttributify,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		vueJsx(),
		Icons({ compiler: 'vue3', autoInstall: true }),
		AutoImport({
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/ // .vue
			],
			imports: ['vue', 'vue-router'],
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass'
				})
			],
			dts: './src/auto-imports.d.ts'
		}),
		Components({
			extensions: ['vue', 'md', 'tsx'],
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass'
				})
			],
			dts: './src/components.d.ts'
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
		host: '0.0.0.0',
		hmr: {
			overlay: false
		},
		proxy: {
			'/mockapi': {
				target:
					'https://www.fastmock.site/mock/b94355a454a22cec575bdedbde5b2cb2/api',
				changeOrigin: true,
				rewrite: (pathStr) => pathStr.replace(/^\/mockapi/, '')
			}
		}
	}
})