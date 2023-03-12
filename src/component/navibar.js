import React from 'react'
import '../css/App.css'
import { auth } from '../Firebase'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'

const Navibar = () => {
    return (
        <>
        <nav>
            <ul>
            <li><Link to="/" >Gallery</Link></li>
            <li><Link to="/upload" >Upload</Link></li>
            <li><Link to="/favourite" >Favourite</Link></li>
            </ul>
            <button onClick={() => signOut(auth)} class='btn btn-danger'>Sign Out</button> 
        </nav>             
        </>
    )
}

export default Navibar;
