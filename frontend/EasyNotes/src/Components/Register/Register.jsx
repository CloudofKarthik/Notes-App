import {React,useState} from 'react'
import axios from 'axios'

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerEndpoint = 'http://localhost:5000/register';
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      username,
      password,
    };
    try {
      // Make a POST request with Axios
      const response = await axios.post(registerEndpoint, registrationData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);

      // Update the registration status
      ;
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error.response.data);

      // Update the registration status
      ;
    }
  }

  return (
    <>
    <div>
      Register
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
        <button type="submit">Register</button>
      </form>
    </>
    
  )
}

export default Register
