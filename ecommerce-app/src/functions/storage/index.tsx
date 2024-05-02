export const setToken = ( userToken: string) => {
    try {
        localStorage.setItem('userToken', userToken);
        return userToken;
    } catch (error) {
        console.log(error);
    }
}

export const getToken = () => {
    try {
        return localStorage.getItem('userToken');
    } catch (error) {
        console.log(error);
    }
}

export const removeToken = () => {
    try {
        localStorage.removeItem('userToken');
    } catch (error) {
        console.log(error);
    }
}
