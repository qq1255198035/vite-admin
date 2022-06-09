export interface ICodeMessage {
	[key: number]: string
}

export interface IResponse<T> {
	data: T
	statusCode: number
	msg: string
}
