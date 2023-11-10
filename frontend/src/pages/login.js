
import "../cssfile/login.css"
import React, { useState } from 'react';
import api from '../services/api';

import {useNavigate} from "react-router-dom";

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await api.login(username, password);
//             console.log(response.status);
//             if (response.status === 200){
//                 localStorage.setItem("token", response.data);
//                 navigate("/welcome");
//             }

//             else if (response.status === 404){
//                 console.log("User not found");
//             } else if (response.status === 401) {
//                 console.log("Incorrect Password");
//                 setError("Incorrect Password");
//             }
//             // Store the token in local storage or context for future use
//         } catch (error) {
//             setError(error.message); // Handle login error
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
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
//                 <button type="submit">Login</button>
//                 {error && <p>{error}</p>}
//             </form>
//         </div>
//     );
// };


export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await api.login(username, password);
          console.log(response.status);
          if (response.status === 200){
              localStorage.setItem("token", response.data);
              navigate("/welcome");
          }

          else if (response.status === 404){
              console.log("User not found");
          } else if (response.status === 401) {
              console.log("Incorrect Password");
              setError("Incorrect Password");
          }
          // Store the token in local storage or context for future use
      } catch (error) {
          setError(error.message); // Handle login error
      }
  };

  return(
      <>
  <div id = "back2">
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login</title>
<link rel="stylesheet" href="./login.css" />
<nav className="navMenu">
  <a href="/home">Home</a>
  
  <a href="/about">About</a>
  
</nav>
<div className="form" onSubmit={handleLogin}>
  <div className="title">Welcome</div>
  
  <div className="input-container ic1">
    <input id="email" className="input"  type="text"
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
    <div className="cut" />
    <label htmlFor="email" className="placeholder">
      Username
    </label>
  </div>
  <div className="input-container ic2">
    <input id="password" className="input" type="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
    <div className="cut" />
    <label htmlFor="password" className="placeholder">
      Password
    </label>
  </div>
  <button type="text" className="submit">
    submit
  </button>
  {error && <p>{error}</p>}
  <button type="button" className="signup">
          <a href="/signup">Sign Up
  </a>          </button>
</div>
</div>
</>

  );
}
