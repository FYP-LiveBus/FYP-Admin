import React, {Component, useState} from 'react';
import axios from 'axios';
import '../../styles/style.css';
import image from '../../images/image.jpg';
import {Navigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'src/Redux/actions';

function LoginView () {

  const state = useSelector(state => state)
  // console.log(state)

  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  // const [role , setRole] = useState('')
  // const [isLoggedIn , setIsLoggedIn] = useState(false)

  const usernameHandler = (value) => { setUsername(value); }
  const passwordHandler = (value) => { setPassword(value); }
  const dispatch = useDispatch()


  const loginHandler = () => {
    const URL = "https://livebusapi.herokuapp.com/api/users/login-admin";
    axios.post(URL, {username: username, password: password})
      .then((response)=>{
        // dispatchEvent()
        let user = response.data;
        console.log(response.data)
        dispatch(login(user))

       })
      .catch(err => {
        alert("Error occure duning authentication!")
        console.log(err);
    })

    // console.log(this.state)
  };
    
  if(state.isLoggedIn)
    return <Navigate to={'/app/dashboard'} />
  else
    return (
        <div
        className="container"
        id="container"
        style={{ marginTop: 120, marginLeft: 250 }}
      >
        <div className="form form-container sign-in-container">            
          <h1>LIVE BUS</h1>
          <input
            onChange={event => usernameHandler(event.target.value)}
            type="text"
            name="username"
            placeholder="Username"
          />
          <input 
            onChange={event => passwordHandler(event.target.value)} 
            type="password" 
            name="password" 
            placeholder="Password" />
            {/* <Link to="/app/dashboard"> */}
              <button onClick={()=>loginHandler()}>Login</button>
            {/* </Link> */}
            <a href="#">Forgot Your Password</a>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <img className="overlay-container" src={image} alt="" />
            <button className="ghost" id="signIn">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
}

export default LoginView;