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
        <div className='Auth'>
            <div className="authen">
                <h1>=MeMoLapse=</h1>
                {currentUser ? (                   
                    Navigate.push("/lib")
                ) : (     
                  <div className='btn2'>         
                    <p>
                        <Link to="/login" class="btn btn-outline-dark" style={{marginBottom: "10px"}}>Log in</Link>  
                        <Link to="/signup" class="btn btn-outline-dark">Sign up</Link>                                             
                    </p> 
                  </div>                                     
                )}
            </div>           
        </div>
    )
}

export default Home;
