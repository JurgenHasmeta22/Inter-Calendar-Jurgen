export default interface ICurrency {
	id?: number
	code: string
	description: string
	exchangeRate: number
	dateCreated: string
	dateModified: null | string
}