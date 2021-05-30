import config from "./config"
import {fetchGetData} from "./http-common"

async function verify(token) {

    return new Promise((resolve, reject) => {
        const url = config.apiUrl + "api/account/verify?token=" + token;
    
        fetchGetData(url)
        .then(answer => {
            if (answer.success) {
                resolve(true);
                // this.$router.push('/') // Redirecting user to homepage if already logged in
            } else {
                reject(false);
            }
        });
    });
  }

async function logout(token) {

    return new Promise((resolve, reject) => {
        const url = config.apiUrl + "api/account/logout?token=" + token;
        fetchGetData(url)
        .then(answer => {
            console.log(answer);
            if (answer.success) {
                resolve(true);
            } else {
                reject(false);
            }
        });

    });
}

function getCookie(cookies, cookieName) {
    const arr = cookies.split(';')
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(element.includes(cookieName)) {
            return element.split('=')[1].trim()
        }
    }
    return '';
}

function deleteCookie(cookies, cookieName) {
    var cookie = cookieName + "=" + getCookie(cookies, cookieName) + ";"
    console.log(cookie)
    return cookies.replace(cookie, "")
}

export {verify, getCookie, logout, deleteCookie}