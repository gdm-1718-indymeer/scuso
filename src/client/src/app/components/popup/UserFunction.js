import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const eventPost = user => {
    return axios
    .post('api/v1/events', {
        author: user.author,
        imageurl: user.imageurl,
        body: user.body,
        title: user.email,
        data: user.data,
        price: user.price,
        label: user.label

    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        toast.error('😥' + err.message, {
            position: toast.POSITION.BOTTOM_LEFT
          });
        console.log(err)
    })
}