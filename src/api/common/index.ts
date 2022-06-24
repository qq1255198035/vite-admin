import http from '../http'
import { IResponse } from '../axios-types'
import { ILoginParams } from '@/types/sys'

export const getMenuList = (token: string) =>
  http.post<IResponse<any>>('/sys/menu', token)

export const loginIn = (params: ILoginParams) =>
  http.post<IResponse<any>>('/sys/login', params)
