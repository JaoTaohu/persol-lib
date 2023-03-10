import React from 'react'
import '../App.css'
import { auth } from '../config'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'

const Navibar = () => {
    return (
        <>
        <nav>
            <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/upload" >Add</Link></li>
            </ul>
            <button onClick={() => signOut(auth)} class='btn btn-danger'>Sign Out</button> 
        </nav>             
        </>
    )
}

export default Navibar;
