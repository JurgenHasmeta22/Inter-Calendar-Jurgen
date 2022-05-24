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
import { motion } from "framer-motion";
// #endregion


export default function HeaderCommon(this: any) {
    

    // #region "React hooks"
    const user = useGetUser()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // #endregion


    return (

      <>

        <motion.header
            initial={{ opacity: 0, y: -50, marginTop: -200 }}
            animate={{ opacity: 1, y: 0, marginTop: 0, transition: { delay: 0.5 } }}
        >

            <header className="header">
                        
                <div className="header-group-1">

                    <Link to="/dashboard" onClick={() => {
                        
                    }}>Hospital Management System</Link>
                    
                    <ul className="list-nav">

                        <div className="div-inside-li" onClick={() => {
                            
                        }}>

                            <NavLink to = "/dashboard" className="special-uppercase" >Home</NavLink>

                        </div>

                    </ul>

                </div>

                <div className="header-group-2">

                {
                
                    user.isDoctor ? (

                        <li className="special-logo-thing">
                            <span>Welcome Doctor, {user?.firstName + " " + user?.lastName}! 👨‍⚕️ </span>
                        </li>

                    ) : (

                        <li className="special-logo-thing">
                            <span>Welcome Patient, {user?.firstName + " " + user?.lastName}! 👤</span>
                        </li>

                    )

                }

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

                        <li className="login-section__info">
                            <h3>Call for support +38344255255</h3>
                        </li>

                </div>

            </header>

        </motion.header>

      </>

    )

}