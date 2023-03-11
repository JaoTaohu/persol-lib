import React, { useContext } from 'react'
import { AuthContext } from './auth'
import '../App.css'
import { Redirect } from 'react-router-dom'
import Navibar from './navibar'
import Upload from './Upload'

const Pre = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser){
        return Redirect('/login');
    }
    return (      
        <>
            <div className='Libcontainer'>
                <Navibar /> 
                <Upload />  
            </div>              
        </> 
    )
}

export default Pre;
