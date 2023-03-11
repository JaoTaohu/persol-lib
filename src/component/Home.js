import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './auth'
import '../css/App.css'
import { useHistory } from 'react-router-dom'
import { gapi } from 'gapi-script'

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const Navigate = useHistory();

    const clientId = "833254903388-4s1vc94uf8r5je7gfshrpq4c5sdkdeng.apps.googleusercontent.com"
    
    useEffect(() => {
      const initClient = () => {
        gapi.client.init({
          clientId: clientId,
          scope: ''
        })
      }
      gapi.load("client:auth2", initClient)
    }, [])
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
