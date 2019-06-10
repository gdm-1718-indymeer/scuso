import axios from 'axios'

export const login = user => {
    return axios
    .post('api/v1/login/local', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('userToken', res.data.token)
        console.log(res.data.token)
        return res.data.token
    })
    .catch(err => {
        console.log(err)
    })
}