import React, { useContext } from 'react'
import '../App.css'
import firebaseConfig from '../config'
import { Link } from 'react-router-dom'

const Navibar = () => {
    return (
        <>
        <nav>
            <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/Addpic" >Add</Link></li>
            </ul>
            <button onClick={() => firebaseConfig.auth().signOut()} class='btn btn-danger'>Sign Out</button> 
        </nav>             
        </>
    )
}

export default Navibar;
