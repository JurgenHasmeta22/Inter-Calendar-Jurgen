// #region "Importing stuff"
import { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";

import "./HeaderCommon.css"

import {RootState} from '../../../store/redux/rootState'
import onLogout from "../../../store/stores/user/login.store.on-logout"

import useGetUser from "../../../hooks/useGetUser/index"
import { useDispatch, useSelector } from "react-redux";
import { navigateTo } from "../../../store/stores/navigation/navigation.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TProduct } from "../../../interfaces/TProduct";
// #endregion


export default function HeaderCommon(this: any) {
    

    // #region "React hooks"
    const user = useGetUser()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // #endregion


    return (

      <>

        <header className="header">
                    
            <div className="header-group-1">

                <Link to="/dashboard" onClick={() => {
					
				}}>Hospital Appointment System</Link>
                
                <ul className="list-nav">

                    <div className="div-inside-li" onClick={() => {
						
					}}>

                        <NavLink to = "/dashboard" className="special-uppercase" >Home</NavLink>

                    </div>

                </ul>

            </div>

            <div className="header-group-2">
                
                <form className="button-search" onSubmit={function (e) {
					e.preventDefault()
                }}>

                    <input type="search" name="searchMovie"  placeholder="Search for Appointments..." aria-label="Search through site content" 
                        
						onChange={function (e) {
						}}

						onKeyDown={function (e: any) {
						}}

					/>

                    <button type="submit">
                        <i className="fa fa-search"></i>
                    </button>

                </form>

                { user === null ? (

                      <button className="button-login-header" onClick={function () {
                          navigate("/login")
                      }}>

                          <i className="material-icons special-icon">account_circle</i>
                          
                          Sign In

                      </button>

                    ): (

                      <div className="dropdown">

                        <li
                          className="dropbtn"
                          onClick={function () {
                            navigate(`/profile/${user?.userName}`)
                          }}
                        >

                          <img src={"https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"} />
                          
						  {user.userName}
                          
                        </li>
              
                        <div className="dropdown-content">

                          <button
                            className="log-out"
                            onClick={function (e) {
                              e.stopPropagation()
                              dispatch(onLogout())
                            }}
                          >

                            <span>Log Out</span>

                          </button>

                        </div>

                      </div>

                    )}

                  <div className="cart-icon-header">

                    <i className ="fa fa-shopping-cart" aria-hidden="true" 
                    onClick={function () {
                      navigate(`/${user.userName}/cart`)
                    }}></i>

                  </div>

            </div>

        </header>

      </>

    )

}