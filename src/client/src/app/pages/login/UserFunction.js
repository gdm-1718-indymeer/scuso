import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const login = user => {
    return axios
    .post('api/v1/login/local', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('userToken', res.data)
        return res.data
    })
    .catch(err => {
        toast.error('🦄 WRONG EMAIL OR PASSWORD' ,err, {
            position: toast.POSITION.BOTTOM_LEFT
          });
        console.log(err)
    })
}