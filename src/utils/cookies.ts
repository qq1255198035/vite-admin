const TokenKey = 'access_token'

export const getToken = () => sessionStorage.getItem(TokenKey)

export const setToken = (token: string) => sessionStorage.setItem(TokenKey, token)

export const removeToken = () => sessionStorage.removeItem(TokenKey)

