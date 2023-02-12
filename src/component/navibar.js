import React, { useContext } from 'react'
import '../App.css'
import firebaseConfig from '../config'

const Navibar = () => {
    return (
        <>
        <nav>
            <ul>
            <li><a class="active" href="#home">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#about">About</a></li>
            </ul>
            <button onClick={() => firebaseConfig.auth().signOut()} class='btn btn-danger'>Sign Out</button> 
        </nav>             
        </>
    )
}

export default Navibar;
