import React, { useContext } from 'react'
import { AuthContext } from './auth'
import '../css/App.css'
import { Redirect } from 'react-router-dom'
import Navibar from './navibar'
import Post from './post'

const Lib = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser){
        return Redirect('/login');
    }
    return (      
        <>
            <Navibar /> 
            <div className='Libcontainer'>   
                <Post />  
            </div>              
        </> 
    )
}

export default Lib;
