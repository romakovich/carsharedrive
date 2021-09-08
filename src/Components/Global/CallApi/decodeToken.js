import jwtDecode from 'jwt-decode';

export const decodeToken = token => {
    let tokenData;
    try {
        tokenData = jwtDecode(token);
    } catch (e) {
        console.warn(e);
    }

    return tokenData;
};