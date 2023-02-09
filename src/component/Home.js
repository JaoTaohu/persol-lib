import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './auth'

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <div className="container mt-5">
                <h1>Home</h1>
                {currentUser ? (
                    <p>You are logged in - <link to="/dashboard">View Dashboard</link></p>
                ) : (
                    <p>
                        <link to="/login">Log in</link> or <link to="/signup">Sign up</link>
                    </p>
                )}
            </div>
        </>
    )
}

export default Home;
