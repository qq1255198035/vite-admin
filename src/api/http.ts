import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/cookies'
import { ICodeMessage } from './axios-types'

const http = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	timeout: 5000
})
  
const errorMessage = (code: any): string => {
	const codeMessage: ICodeMessage = {
		200: '服务器成功返回请求的数据。',
		400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
		401: '用户没有权限（令牌、用户名、密码错误）。',
		404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
		500: '服务器发生错误，请检查服务器。',
		502: '网关错误。',
		503: '服务不可用，服务器暂时过载或维护。',
		504: '网关超时。'
	}
	return codeMessage[code]
}
// 自定义扩展 header 请求头
const getConfigHeaders = () => {
    return {
        jwt: getToken() || '', // token
        Authorization: getToken() || '', // token
    };
};
// 异常处理程序
const errorHandler = (error: AxiosError) => {
	const { response } = error
	const errortext = errorMessage(response?.status) || response?.statusText || errorMessage(500)
	ElMessage.error(errortext)
	return Promise.reject(error)
}
// 请求拦截
http.interceptors.request.use(config => {
		// 请求头信息，token 验证
		config.headers = {
			...getConfigHeaders(),
			...config.headers
		}
		return config
	},
	errorHandler
)

// 响应拦截
http.interceptors.response.use(response => {
		const { data } = response
		return data
}, errorHandler)

export default http
