import React, { useContext } from 'react'
import { AuthContext } from './auth'
import '../App.css'
import { Redirect } from 'react-router-dom'
import Navibar from './navibar'
import Post from './post'
import Upload from './Upload'

const Lib = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser){
        return Redirect('/login');
    }
    return (      
        <>
            <div className='Libcontainer'>
                <Navibar /> 
                <Post />  
            </div>              
        </> 
    )
}

export default Lib;
