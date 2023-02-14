import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './auth'
import '../App.css'
import { useHistory } from 'react-router-dom'
import { gapi } from 'gapi-script'

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const Navigate = useHistory();

    const clientId = "833254903388-4s1vc94uf8r5je7gfshrpq4c5sdkdeng.apps.googleusercontent.com"
    const [profile, setProfile] = useState([])
    useEffect(() => {
      const initClient = () => {
        gapi.client.init({
          clientId: clientId,
          scope: ''
        })
      }
      gapi.load("client:auth2", initClient)
    }, [])
  
    const onSuccess = (res) => {
      console.log('success', res)
    }
  
    const onFailure = (res) => {
      console.log('failed', res)
    }

    const logOut = () => {
        setProfile(null);
    }
    return (
        <>
            <div className="container">
                <h1>Home</h1>
                {currentUser ? (                   
                    Navigate.push("/lib")
                ) : (                  
                    <p>
                        <Link to="/login" className='btn btn-primary'>Log in</Link> or <Link to="/signup" className='btn btn-success'>Sign up</Link>                                             
                    </p>                                     
                )}
            </div>           
        </>
    )
}

export default Home;
