// #region "Importing stuff"
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate, useParams } from 'react-router-dom';
import FooterCommon from '../../main/components/Common/FooterCommon/FooterCommon';
import HeaderCommon from '../../main/components/Common/HeaderCommon/HeaderCommon';
import useGetUser from '../../main/hooks/useGetUser';
import "./UserProfilePage.css"

import {
    setTransactions,
    invalidateTransactions
} from "../../main/store/stores/profile/profile.store"

import {
    setBankAccounts
} from "../../main/store/stores/cart/cart.store"

import ITransaction from '../../main/interfaces/ITransaction';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../main/store/redux/rootState';
import axios from 'axios';
import { IBankAccount } from '../../main/store/stores/cart/cart.store';
import ReactPaginate from 'react-paginate';
import { setCurrencies } from '../../main/store/stores/dashboard/dashboard.store';
import ICurrency from '../../main/interfaces/ICurrency';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// #endregion


export default function UserProfilePage({validateUser}:any) {


    // #region "state redux and other react hooks here"
    const transactions: ITransaction[] = useSelector((state: RootState) => state.profile.transactions);
    const bankAccounts: IBankAccount[] = useSelector((state: RootState) => state.cart.bankAccounts);
    const currencies: ICurrency[] = useSelector((state: RootState) => state.dashboard.currencies);

    const [tab, setTab] = useState<any>("home")
    const [transactionsNumber, setTransactionsNumber] = useState<any>(null)

    const [pageNumber, setPageNumber] = useState<any>(0)
    const [itemsPerPage, setItemsPerPage] = useState<any>(10)

    const [selectedBankProfile, setSelectedBankProfile] = useState<any>(bankAccounts[0])
    const [selectedBankProfileName, setSelectedBankProfileName] = useState<any>(bankAccounts[0]?.name)

    const navigate = useNavigate()
    const params = useParams()

    const user = useGetUser()

    const dispatch = useDispatch()
    // #endregion


    // #region "fetch things"
    async function getTransactionsFromServer() {

        if (params.pageNumber && params.tab) {

            let result = await (await axios.get(`bankaccount/${selectedBankProfile?.id}/transactions?PageNumber=${params.pageNumber}&PageSize=10`)).data;
            
            setTransactionsNumber(result.totalCount)
            dispatch(setTransactions(result.data))

        }

        else if (params.pageNumber === undefined && params.tab) {

            let result = await (await axios.get(`bankaccount/${selectedBankProfile?.id}/transactions?PageNumber=1&PageSize=10`)).data;
            
            setTransactionsNumber(result.totalCount)
            dispatch(setTransactions(result.data))

        }

        else {

            let result = await (await axios.get(`bankaccount/bkt/transactions?PageNumber=1&PageSize=10`)).data;
            
            setTransactionsNumber(result.totalCount)
            dispatch(setTransactions(result.data))

        }
        
    }

    useEffect(()=> {
        getTransactionsFromServer()
    }, [selectedBankProfile, params.pageNumber])

    async function getBankAccountsFromServer() {
        let result = await (await axios.get(`/bankaccount/get-all?PageNumber=1&PageSize=10`)).data;
        dispatch(setBankAccounts(result.data))
    }

    useEffect(() => {
        getBankAccountsFromServer()
    }, [])

    async function getCurrenciesFromServer() {
        let result = await (await axios.get(`/currency/get-all?PageNumber=1&PageSize=10`)).data;
        dispatch(setCurrencies(result.data))
    }

    useEffect(()=> {
        getCurrenciesFromServer()
    }, [])
    // #endregion


    // #region "Pagination in frontend"

    let pagesVisited = pageNumber * itemsPerPage
    let pageCount
   
    pageCount = Math.ceil(transactionsNumber / itemsPerPage)
    
    function handleChangingPageNumber(selected:any) {
        setPageNumber(selected)
    }
    
    const changePage = ({ selected }:any) => {
        handleChangingPageNumber(selected)
        navigate(`../profile/${user.username}/transactions/page/${selected + 1}`)
    }

    // #endregion


    // #region "Helpers functions"
    function handleOnChangeSelect(e:any) {
        setSelectedBankProfileName(e.target.value)
    }

    function handleOnChangeBankAccount(e:any) {

        const newBankAccounts = [...bankAccounts]
        const bankAccountFinal = newBankAccounts.find(bankAccount => bankAccount.name === e.target.value )

        setSelectedBankProfile(bankAccountFinal)

    }
    // #endregion
    

    // #region "Checking stuff from server wich came and loading"
    if(user === null || user?.username === undefined) {

        return (

            <div className="loading-wrapper">
                <ReactLoading type={"spin"} color={"#000"} height={200} width={100} className="loading" />
            </div>

        )
        
    }
    // #endregion


    // #region "Helpers functions"
    function findingCurrenciesNamesForBankAccounts(currencyId: number) {
        const bankAccountCurrencyName: any = currencies?.find(currency => currency?.id === currencyId)
        return bankAccountCurrencyName?.description
    }
    // #endregion


    // #region "Material UI data grid"
    const columns: GridColDef[] = [

        { field: 'id', headerName: 'Id', width: 90 },
      
        {
          field: 'bankAccountId',
          headerName: 'Bank Account Id',
          width: 220,
          editable: false,
        },
      
        {
          field: 'bankName',
          headerName: 'Bank Account Name',
          width: 220,
          editable: true,
        },
      
        {
          field: 'action',
          headerName: 'Bank Action',
          width: 220,
          editable: false,
        },
      
        {
          field: 'amount',
          headerName: 'Bank Amount',
          editable: false,
          width: 220
        },

        {
            field: 'description',
            headerName: 'Bank Description',
            editable: false,
            width: 220
        },

        {
            field: 'isActive',
            headerName: 'Bank is active',
            editable: false,
            width: 220
        },

        {
            field: 'dateCreated',
            headerName: 'Bank Date Created',
            editable: false,
            width: 400
        }
      
    ];
      
    const rowsOld = [...transactions]

    let newArray = []

    for (const element of rowsOld) {

        const newObject = {
            ...element,
            bankName: selectedBankProfile?.name
        }

        newArray.push(newObject)

    }

    const rows = [...newArray]
    // #endregion


    return (

        <main className='main-profile'>

            <HeaderCommon />

            <section className="container-profile-menus">

                <div className="container-profile-nav">

                    <div className="profile-info">
                        <img src="https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png" />
                        <span className="userName-span">{user?.username}</span>
                    </div>

                </div>

                <div className="container-tabs">

                    <ul className="list-tabs">

                        <li className= {params.tab === "favoriteMovies" ? "clicked": "videos-tab"} onClick={() => {
                            navigate(`/profile/${user?.username}/transactions`)
                        }}>User Transactions</li>
                        
                        <li className= {params.tab === "aboutUs" ? "clicked": "about-tab"} onClick={() => {
                            navigate(`/profile/${user?.username}/about`)
                        }}>User Information</li>

                    </ul>

                    { 

                        params.tab === "transactions" ? (

                            <>
                            
                                <h3 className="special-video-you">User Transactions</h3>
                                
                                <form id="filter-by-sort" className='form-transaction'>

                                    <label htmlFor="filter-by-type">
                                        <h3>Choose bank account: </h3>
                                    </label>
                            
                                    <select name="filter-by-sort" id="filter-by-sort" 
                                    onChange={function (e: any) {
                                        handleOnChangeSelect(e)
                                        handleOnChangeBankAccount(e)
                                    }}>
                                        
                                        {
                                        
                                            bankAccounts?.length === 0 ? (
                                                <option value="Default">No Bank Account</option>
                                            ): (
                            
                                                //@ts-ignore
                                                bankAccounts.map(bankAccount =>  
                                                    <option key={bankAccount.id} value={bankAccount.name}>{bankAccount.name}</option>
                                                )

                                            )

                                        }

                                    </select>

                                    <label htmlFor="filter-by-type">
                                        <h3>Bank Balance: {selectedBankProfile?.balance}</h3>
                                    </label>

                                    <h3>Currency Description: {findingCurrenciesNamesForBankAccounts(selectedBankProfile?.currencyId)}</h3>         
                    
                                </form>

                                <div className="container-transactions">

                                    <ul className='transactions'>

                                        {

                                            transactions.map(transaction => 
                                                
                                                <li key={transaction.id} className="transaction-element">

                                                    <h3>Transaction ID: <strong>{transaction.id}</strong></h3>
                                                    <span>Transaction bank account ID: <strong>{transaction.bankAccountId}</strong></span>
                                                    <span>Transaction bank account name: <strong>{selectedBankProfileName}</strong></span>
                                                    <span>Transaction action: <strong>{transaction.action}</strong></span>
                                                    <span>Transaction amount: <strong>{transaction.amount}</strong></span>
                                                    <span>Transaction description: <strong>{transaction.description}</strong></span>
                                                    <span>Transaction isActive: <strong>{transaction.isActive ? "true" : "false"}</strong></span>
                                                    <span>Transaction dateCreated: <strong>{transaction.dateCreated}</strong></span>

                                                </li>

                                            )

                                        }

                                    </ul>

                                    <ReactPaginate
                                        previousLabel={"< Previous"}
                                        nextLabel={"Next >"}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disabledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />

                                    <div className='data-grid-wrapper'>

                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            checkboxSelection
                                            disableSelectionOnClick
                                            className='data-grid'
                                        />
                                        
                                    </div>

                                </div>

                            </>

                        ): params.tab === "about" ? (

                            <div className="container-about">
                                <span>This is my account {user?.username}</span>
                                <span>My name is: {user?.firstName}</span>
                                <span>My name is: {user?.lastName}</span>
                                <span>My email is: {user?.email}</span>
                                <span>My birthdate is: {user?.birthdate}</span>
                                <span>My phone number is: {user?.phone}</span>
                            </div>

                        ): (

                            <div className="container-void">
                                <span>Click in the tabs and select a bank to see transactions {user?.username}</span>
                            </div>

                        )

                    }

                </div>

            </section>

            <FooterCommon />
        
        </main>

    )
    
}