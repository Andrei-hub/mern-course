import React, {useContext} from 'react'
import {NavLink, useHistory } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
export const Navbar = () => {
  const history = useHistory()
  const auth =  useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return(
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2em'}}>
                <span className="brand-logo left">Scurtarea linkurilor</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Creaza</NavLink></li>
                    <li><NavLink to="/links">Linkuri</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}