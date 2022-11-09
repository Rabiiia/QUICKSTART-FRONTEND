import React, {useRef, useState} from 'react';
import { updateUser } from '../App.jsx';
import facade  from "../utils/apiFacade.js";

function Login({setUser, setErrorMsg}) { 
    const init = {username: "", password: ""};
    const [loginCredentials, setLoginCredentials] = useState(init);

    //changes made
    const performLogin =  (evt) => { //made it a async
        evt.preventDefault();
        facade.login(loginCredentials.username, loginCredentials.password)
        .then(token => {
            console.log(token)
            updateUser(token, setUser);
        });
       
    }

    const login = (user, pass) => {
        facade.login(user, pass)
            .then(res => setUser(true))
    }

    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
    }

    return (
        <div className="login-container">
            <form>
                <input onChange={onChange} type="text" placeholder="Username" id="username"/>{" "}
                <input onChange={onChange} type="password" placeholder="Password" id="password"/>
                <button onClick={performLogin} type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
