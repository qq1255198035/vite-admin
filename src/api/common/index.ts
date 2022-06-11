import http from '../http';
import { IResponse } from '../axios-types';
import { ILoginParams } from '@/types/sys';

export const getMenuList = (token: string): Promise<IResponse<any>> => http.post('/sys/menu', {token: token})

export const loginIn = (params: ILoginParams): Promise<IResponse<any>> =>
	http.post('/sys/login', params)