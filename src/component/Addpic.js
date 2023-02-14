import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './auth'
import { firebaseConfig, db } from '../config'
import Navibar from './navibar'

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    

    if (!currentUser){
        return Redirect('/login');
    }
    return(
        <div>
            <div className='container_add'>
                <Navibar />
                <div className='box'>
                <input type="file" name="myImage" accept="image/*" style={{display: 'none'}} id='file' />
                <label htmlFor='file' class='btn btn-danger'>Your Image File </label>
                <button className='btn btn-primary'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard