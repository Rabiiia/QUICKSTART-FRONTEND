import React, {useRef, useState} from 'react';
import { updateUser } from '../App.jsx';
import facade  from "../utils/apiFacade.js";

function Login({setUser, setErrorMsg}) { 
    const init = {username: "", password: ""};
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = async (evt) => {
        evt.preventDefault();
        const token = (await facade.logIn(loginCredentials.username, loginCredentials.password));
        updateUser(token, setUser);
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
