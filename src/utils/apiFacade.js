import {BASE_URL, VERIFY_URL, LOGIN_URL} from './settings';

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: res.json()})
    }
    return res.json();
}

function apiFacade() {

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    const removeToken = () => {
        return localStorage.removeItem('jwtToken')
    }

    
    const verifyToken = () => {
        const options = makeOptions("GET", true ) //true er lig med addToken som Thomas har lavet i forvejen nedenunderm makeOPtions function
         return fetch(VERIFY_URL, options) //verify_URL is defined in setting.js
            .then(res => res.json())
    }

    const loggedIn = () => {
        return getToken() != null;
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
    }

    //made some changes to async etc.
    const login = (user, password) => {
        const options = makeOptions("POST", false, {username: user, password: password});
        return fetch(LOGIN_URL, options)
        .then(response => handleHttpErrors(response))
        .then(token => {
            setToken(token) 
            return token
        })
        
    }

    // added this function because we want read user(altså bruger) and its roles from token above in login function
    const decodeToken = (token) => {
        if (!token) return undefined;
        const jwtData = token.split(".")[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        decodedJwtData["roles"] = decodedJwtData["roles"].includes(",") ? decodedJwtData["roles"].split(",").toArray() : [decodedJwtData["roles"]]
        return decodedJwtData;
    }

    const fetchData = () => {
        const options = makeOptions("GET", true);
        return fetch(URL + "api/info/user", options).then(handleHttpErrors);
    }

    function makeOptions(method, addToken, body) {
        method = method ? method : 'GET';
        const opts = {
            method: method,
            headers: {
                ...(['PUT', 'POST'].includes(method) && {
                    "Content-type": "application/json"
                }),
                "Accept": "application/json"
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken(); //vi har lagt x-access-token i backend. TokenEndpoint, fordi det allerede bliver set i headers
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        verifyToken,
        removeToken,
        decodeToken
    }
}

//added this to make coding easier
export default apiFacade()

export function setToken(token) {
    return apiFacade().setToken(token)
}
export function getToken() {
    return apiFacade().getToken()
}
export function verifyToken(token) {
    return apiFacade().verifyToken(token)
}
export function loggedIn() {
    return apiFacade().loggedIn()
}
export function login(user, password) {
    return apiFacade().login(user, password)
}
export function removeToken() {
    return apiFacade().removeToken()
}
export function makeOptions() {
    return apiFacade().makeOptions()
}
export function fetchDat() {
    return apiFacade().fetchData()
}
export function decodeToken(token) {
    return apiFacade().decodeToken(token)
}
