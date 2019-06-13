import axios from 'axios'

class Api {
    static URL = '/api/v1';

    static findAllPosts = async (queryParams=null) => {
        let url = `${this.URL}/posts`;
        if (queryParams !== null) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(queryParams);
        }   
        const response = await fetch(`${url}`);
        return await response.json();
    }

    static findOnePost = async (id) => {
        const response = await fetch(`${this.URL}/posts/${id}`);
        return await response.json();
    }

    static queryParams = (params) => {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }

    static loadMessages = async () => {
        let url = `${this.URL}/messages`;
        const response = await fetch(`${url}`)
        return await response.json()
    }

    //BUGGED
    static sendMessage = async (req) => {
        let url = `${this.URL}/messages/create`;
        axios.post(url, {
            conversation_id: '5cfd52d1d0a74c5c33df48a3_5cfd44a2eb54ec196a385f83',
            from: '5cfd52d1d0a74c5c33df48a3',
            to: '5cfd44a2eb54ec196a385f83',
            content: req.content,
        }).then((response) => {
            return response.json()
        }).catch((err) => {
            return err
        })
    }

    static loadConversations = async () => {
        let url = `${this.URL}/messages/loadconversations/${localStorage.getItem('userId')}`;
        console.log(url)
        const response = await fetch(`${url}`)
        return await response.json()
    }

    static checkUser = async () => {
        let url = `${this.URL}/users/${localStorage.getItem('userId')}`;
        console.log(url)
        const response = await fetch(`${url}`)
        return await response.json()
    }

}

export default Api;