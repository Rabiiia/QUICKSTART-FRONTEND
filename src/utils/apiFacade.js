import {BASE_URL, VERIFY_URL, LOGIN_URL} from './settings';

function handleHttpErrors(response) {
    if (!response.ok) {
        return Promise.reject(response.json());
    }
    return response;
};

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

    const verifyToken = async () => {
        const options = makeOptions("GET", true);
        const response = await fetch(VERIFY_URL, options);
        try {
            const token = (await (await handleHttpErrors(response)).json())["token"];
            setToken(token);
            console.log(token);
            return token;
        } catch (error) {
            removeToken();
            console.log((await error).message);
            //alert("Your session has expired. Please log in again.");
            return false;
        }
    };
    const loggedIn = () => {
        return getToken() != null;
    }

    const logOut = () => {
        localStorage.removeItem("jwtToken");
    }

    const logIn = async (user, password) => {
        const options = makeOptions("POST", false, {username: user, password: password});
        const response = await fetch(LOGIN_URL, options);
        try {
            const token = (await (await handleHttpErrors(response)).json())["token"];
            setToken(token);
            console.log(token);
            return token;
        } catch (error) {
            console.log((await error).message);
            return false;
        }
    };

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
        logIn,
        logOut,
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
export function logIn(user, password) {
    return apiFacade().logIn(user, password)
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
