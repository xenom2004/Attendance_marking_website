
import "../cssfile/signup.css"
import React, { useState } from 'react';
import api from '../services/api';

import {useNavigate} from 'react-router-dom';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const history = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await api.register(username, password);
//             console.log(response);
//             if (response.status === 201) {
//                 history('/login');
//             } else {
//                 setError("Registration failed. Please try again");
//             }
//             // Handle successful registration, redirect or show a success message
//         } catch (error) {
//             setError(error.message); // Handle registration error
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleRegister}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Register</button>
//                 {error && <p>{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default Register;


export default function Register(){
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.register(username, password);
            console.log(response);
            if (response.status === 201) {
                history('/login');
            } else {
                setError("Registration failed. Please try again");
            }
            // Handle successful registration, redirect or show a success message
        } catch (error) {
            setError(error.message); // Handle registration error
        }
    };
  return(
      <>
  <div id = "back2">
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>signup</title>
<div className="form" onSubmit={handleRegister}>
  <div className="title">Sign Up</div>
  <div className="input-container ic1">
    <input id="name" className="input" type="text"
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
    <div className="cut cut-short" />
    <label htmlFor="name" className="placeholder">
      Username
    </label>
  </div>
  
  <div className="input-container ic2">
    <input id="password" className="input" type="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
    <div className="cut" />
    <label htmlFor="password" className="placeholder">
      Password
    </label>
  </div>
  <button type="text" className="submit">
    submit
  </button>
  {error && <p>{error}</p>}
  <button type="button" className="login">
          <a href="/login">  Log In</a>
          </button>
</div>
</div>
</>

  );
}
