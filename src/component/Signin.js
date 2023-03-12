import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './auth'
import { auth } from '../Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Signin = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value);
        }catch(error){
            alert(error);
        }
    }
    const { currentUser } = useContext(AuthContext);
    if (currentUser){
        return Redirect('/dashboard');
    }
    return (
        <div className='Login'>
            <div className='authen'>
                <div class='logo'>
                    <h1>Sign in</h1>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div class='btn'>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Signin;