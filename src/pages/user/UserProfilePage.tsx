// #region "Importing stuff"
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate, useParams } from 'react-router-dom';
import FooterCommon from '../../main/components/Common/FooterCommon/FooterCommon';
import HeaderCommon from '../../main/components/Common/HeaderCommon/HeaderCommon';
import useGetUser from '../../main/hooks/useGetUser';
import "./UserProfilePage.css"


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
      
        {
          field: 'id',
          headerName: 'Appointement Id',
          width: 120,
          editable: false,
        },
      
        {
          field: 'price',
          headerName: 'Price',
          width: 120,
          editable: true,
        },
      
        {
          field: 'startDate',
          headerName: 'Start Date',
          width: 220,
          editable: false,
        },
      
        {
          field: 'endDate',
          headerName: 'End Date',
          editable: false,
          width: 220
        },

        {
            field: 'title',
            headerName: 'Title',
            editable: false,
            width: 220
        },

        {
            field: 'description',
            headerName: 'Appointement Description',
            editable: false,
            width: 400
        },

        {
            field: 'status',
            headerName: 'Appointement Status',
            editable: false,
            width: 120
        },

        {
            field: 'doctor_id',
            headerName: 'Doctor id',
            editable: false,
            width: 100
        },

        {
            field: 'user_id',
            headerName: 'Patient id',
            editable: false,
            width: 100
        },
        {
            field: 'userName',
            headerName: 'Patient Username',
            editable: false,
            width: 200
        }
      
    ];

    let rowsOld: any = []

    //@ts-ignore
    if (user?.isDoctor === false) {
        rowsOld = [...user?.postedAppointements]
    }

    else {
        rowsOld = [...user?.acceptedAppointemets]
    }

    let newArray = []

    for (const element of rowsOld) {

        const newObject = {
            ...element,
            userName: user?.userName
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
                            //@ts-ignore
                        }}>{user.isDoctor === true ? "Doctor Appointements" : "User Appointements"}</li>
                        
                        <li className= {params.tab === "aboutUs" ? "clicked": "about-tab"} onClick={() => {
                            navigate(`/profile/${user?.userName}/about`)
                            //@ts-ignore
                        }}>{user.isDoctor === true ? "Doctor Information" : "User Information"}</li>

                    </ul>

                    { 

                        params.tab === "transactions" ? (

                            <>
                            
                                { 
                                
                                    !user.isDoctor ? (
                                        <h3 className="special-video-you">User Appointements</h3>
                                    ): (
                                        <h3 className="special-video-you">Doctors Appointements</h3>
                                    )
                                }

                                <div className="container-transactions">

                                    {

                                        //@ts-ignore
                                        user?.isDoctor === false ? (

                                            <ul className='transactions'>

                                                {

                                                    //@ts-ignore
                                                    user?.postedAppointements?.map(appointement => 
                                                        
                                                        <li className='user-list-appointement'>

                                                            <span><strong>Id: </strong> {appointement?.id}</span>
                                                            <span><strong>Price: </strong> {appointement?.price}</span>
                                                            <span><strong>Start Date: </strong> {appointement?.startDate}</span>
                                                            <span><strong>End Date: </strong> {appointement?.endDate}</span>
                                                            <span><strong>Title: </strong> {appointement?.title}</span>
                                                            <span><strong>Status: </strong> {appointement?.status}</span>
                                                            <span><strong>Doctor Id: </strong> {appointement?.doctor_id}</span>
                                                            <span><strong>Patient: </strong> {user?.userName}</span>
                                                            <span><strong>Appointement Desc: </strong> {appointement?.description}</span>
                                                        
                                                        </li>
                                                        
                                                    )

                                                }

                                            </ul>

                                        //@ts-ignore
                                        ): user?.isDoctor === true ? (

                                            <ul className='transactions'>

                                                {

                                                    //@ts-ignore
                                                    user?.acceptedAppointemets?.map(appointement => 
                                                        
                                                        <li className='user-list-appointement'>
                                                            
                                                            <span><strong>Id: </strong> {appointement?.id}</span>
                                                            <span><strong>Price: </strong> {appointement?.price}</span>
                                                            <span><strong>Start Date: </strong> {appointement?.startDate}</span>
                                                            <span><strong>End Date: </strong> {appointement?.endDate}</span>
                                                            <span><strong>Title: </strong> {appointement?.title}</span>
                                                            <span><strong>Status: </strong> {appointement?.status}</span>
                                                            <span><strong>Doctor Id: </strong> {appointement?.doctor_id}</span>
                                                            <span><strong>Patient Id: </strong> {appointement?.user_id}</span>
                                                            <span><strong>Doctor userName: </strong> {user?.userName}</span>
                                                            <span><strong>Appointement Desc: </strong> {appointement?.description}</span>
                                                        
                                                        </li>
                                                        
                                                    )

                                                }

                                            </ul>

                                        ):null

                                    }

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
                                <span>Click in the tabs to change state {user?.userName}</span>
                            </div>

                        )

                    }

                </div>

            </section>

            <FooterCommon />
        
        </main>

    )
    
}