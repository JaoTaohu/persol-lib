import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './auth'
import '../App.css'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const Navigate = useHistory();
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
