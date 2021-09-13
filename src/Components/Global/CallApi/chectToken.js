import "regenerator-runtime/runtime.js"; 
import jwtDecode from 'jwt-decode';

import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY,
    MILLISECONDS_IN_SECOND, ACCESS_TOKEN_UPDATE_DIFF}
    from './constants';

export async function callWithToken(url, method, body, forms) {
    
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    console.log(refreshToken)
    let tokenData;
    try {
        tokenData = jwtDecode(accessToken);
    } catch (e) {
        console.warn(e);
    }

    const currentTime = Math.round(Date.now() / MILLISECONDS_IN_SECOND);

    if(!tokenData) return console.log("Пользователь не авторизован");
    const diff = tokenData.exp - currentTime;
    console.log(diff);
    const isAccessTokenValid = diff > ACCESS_TOKEN_UPDATE_DIFF;

    if(!isAccessTokenValid) {
        const response = await fetch("http://localhost:8000/users/auth/refresh", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            },
            body: JSON.stringify( {"refreshToken": refreshToken} ),
        })
        console.log(response);
        
        if(response.ok) {
            const data = await response.json();
            localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
            localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, data.refreshToken);
            accessToken = data.accessToken;
        } else {
            console.log("Не прошли валидацию");
            localStorage.clear();
            window.location.href = "http://localhost";
        }
    }

    if (forms) {
        return fetch(url, {
            method,  
            body,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
    } else {
        return fetch(url, {
            method,  
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },  
            body: JSON.stringify(body) 
        })
    }
}