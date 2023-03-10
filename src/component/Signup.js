import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import firebaseConfig from '../config'

const Signup = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;

        try {
            await firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
            setCurrentUser(true);
            setRedirectToDashboard(true);

        } catch(error) {
            alert(error)
        }
    }

    if (redirectToDashboard) {
        return <Redirect to="/lib" />;
    }

    return (
        <>
            <div class='home' className='container mt-5'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup;
