import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import {useNavigate} from 'react-router-dom'


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)


  // State variable for handling authentication status
  const [authStatus, setAuthStatus] = useState(false);
  const [user_id, setUser_id] = useState('')

  // API endpoint for authentication
  const authEndpoint = 'http://localhost:5000/login';

  
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Set up authentication credentials
    const credentials = {
      username,
      password,
    };
  

    // Make a POST request with Axios
    try{
      const response = await axios.post(authEndpoint, credentials, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log(response)
      if (response.status === 200){
        setUser_id(response.data.id)
        setUser({user_id:response.data.id, username:username})
        console.log(response.data)
        setAuthStatus(true)
        console.log('User ID: ', response.data.id)
        navigate('/dashboard')
      }
      else {
        console.log(response.data)
        setAuthStatus(false)
      }
    } catch(error) {
      setAuthStatus(false)
      console.error('Authentication Error!!')
    }

  };


  return (
    <>
    <div>
    Login
    </div>
    <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {authStatus && <p>{authStatus}</p>}
    </>
  )
}

export default Login
