import http from '../http';
import { IResponse } from '../axios-types';
export const getMenuList = ():Promise<IResponse<any>> => http.post('/sys/menu')