import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";
import { getToken } from '../utils/apiFacade.js';


function Header({setErrorMsg, user, setUser}) {


    return (
        <nav className="topnav">
            <NavLink className="active" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>
            <NavLink to="/search"><i className="fa fa-fw fa-search"></i> Search</NavLink>
            <NavLink to="/jokes"><i className="fa fa-fw fa-envelope"></i> Jokes</NavLink>
            {user.roles.includes("admin") ? 
                <NavLink to="/crud"><i className="fa fa-fw fa-envelope"/> CRUD </NavLink> : null}

            {!getToken() ? //hvis man ikke er logget ind, så skal den i login komponent ellers ned i LoggedIn
                <Login setUser={setUser} setErrorMsg={setErrorMsg}/> :
                <LoggedIn user={user} setUser={setUser}/>
            }
        </nav>

    );
}

export default Header;
