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


import ITransaction from '../../main/interfaces/ITransaction';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../main/store/redux/rootState';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import ICurrency from '../../main/interfaces/ICurrency';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// #endregion


export default function UserProfilePage({validateUser}:any) {


    // #region "state redux and other react hooks here"
    const transactions: ITransaction[] = useSelector((state: RootState) => state.profile.transactions);

    const [tab, setTab] = useState<any>("home")
    const [transactionsNumber, setTransactionsNumber] = useState<any>(null)

    const [pageNumber, setPageNumber] = useState<any>(0)
    const [itemsPerPage, setItemsPerPage] = useState<any>(10)

    const navigate = useNavigate()
    const params = useParams()

    const user = useGetUser()

    const dispatch = useDispatch()
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
        navigate(`../profile/${user.userName}/transactions/page/${selected + 1}`)
    }

    // #endregion


    // #region "Checking stuff from server wich came and loading"
    if(user === null || user?.userName === undefined) {

        return (

            <div className="loading-wrapper">
                <ReactLoading type={"spin"} color={"#000"} height={200} width={100} className="loading" />
            </div>

        )
        
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
            ...element
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
                        <span className="userName-span">{user?.userName}</span>
                    </div>

                </div>

                <div className="container-tabs">

                    <ul className="list-tabs">

                        <li className= {params.tab === "favoriteMovies" ? "clicked": "videos-tab"} onClick={() => {
                            navigate(`/profile/${user?.userName}/transactions`)
                        }}>User Transactions</li>
                        
                        <li className= {params.tab === "aboutUs" ? "clicked": "about-tab"} onClick={() => {
                            navigate(`/profile/${user?.userName}/about`)
                        }}>User Information</li>

                    </ul>

                    { 

                        params.tab === "transactions" ? (

                            <>
                            
                                <h3 className="special-video-you">Random Tab</h3>
                                
                                <form id="filter-by-sort" className='form-transaction'>

                                    <label htmlFor="filter-by-type">
                                        <h3>Rnadom Select:  </h3>
                                    </label>
                            
                                    <select name="filter-by-sort" id="filter-by-sort" 
                                    onChange={function (e: any) {
                                        
                                    }}>


                                    </select>

                                    <label htmlFor="filter-by-type">
                                    </label>

                    
                                </form>

                                <div className="container-transactions">

                                    <ul className='transactions'>

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
                                <span>This is my account username: {user?.userName}</span>
                                <span>My firstname is: {user?.firstName}</span>
                                <span>My lastname is: {user?.lastName}</span>
                                <span>My email is: {user?.email}</span>
                                <span>My bio is: {user?.bio}</span>
                                <span>My phone number is: {user?.phone}</span>
                                <span>My address is: {user?.address}</span>
                                <span>My avatar is: {user?.avatar}</span>
                                <span>Am i a doctor: {String(user?.isDoctor)}</span>
                            </div>

                        ): (

                            <div className="container-void">
                                <span>Click in the tabs and select random {user?.userName}</span>
                            </div>

                        )

                    }

                </div>

            </section>

            <FooterCommon />
        
        </main>

    )
    
}