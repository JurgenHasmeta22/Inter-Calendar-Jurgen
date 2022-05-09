export default interface ITransaction
{
	id?: number,
    bankAccountId: number,
    action: string,
    amount: number,
    description: string,
    isActive: boolean,
    dateCreated: string,
    dateModified: null
} 