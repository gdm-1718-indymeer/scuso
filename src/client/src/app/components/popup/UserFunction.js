import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const eventPost = user => {
    return axios
    .post('api/v1/events', {
        title: user.email,
        imageurl: user.imageurl,
        body: user.body,
        data: user.data,
        price: user.price,
        author: user.author,
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        toast.error('😥' ,err.message, {
            position: toast.POSITION.BOTTOM_LEFT
          });
        console.log(err)
    })
}