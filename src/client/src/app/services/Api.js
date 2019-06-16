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
    };

    static findAllEvents = async () => {
        let url = `${this.URL}/events`;
        const response = await fetch(`${url}`);
        return await response.json();
    }
    static findByCategory = async (label) => {
        let url = `${this.URL}/events/filter/${label}`;
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

    static loadMessages = async (other) => {
        let url = `${this.URL}/messages/load/${localStorage.getItem('userId')}/${other}`;
        const response = await fetch(`${url}`)
        return await response.json()
    }

    //BUGGED
    static sendMessage = async (req) => {
        let url = `${this.URL}/messages/create`;
        axios.post(url, {
            from: req.from,
            from_name: req.from_name,
            to: req.to,
            to_name: req.to_name,
            content: req.content,
        }).then((response) => {
            return response.json()
        }).catch((err) => {
            return err
        })
    }


    static DeleteEvent = async (id) => {
        const response = await fetch(`${this.URL}/events/${id}`);
        return await response.json();
    }
    static loadConversations = async () => {
        let url = `${this.URL}/messages/loadconversations/${localStorage.getItem('userId')}`;
        console.log(url)
        const response = await fetch(`${url}`);
        return await response.json()
    }  

    static checkUser = async (uid) => {
        let url = '';
        if(uid){
            url = `${this.URL}/users/${uid}`;
        }else{
            url = `${this.URL}/users/${localStorage.getItem('userId')}`;
        }
        console.log(url)
        const response = await fetch(`${url}`)
        return await response.json()
    }
    
    static fetchEventsId = async (uid) => {
        let url = '';
        if(uid){
            url = `${this.URL}/events/${uid}`;
        }else{
            url = `${this.URL}/events/${localStorage.getItem('userId')}`;
        }
        console.log(url)
        const response = await fetch(`${url}`)
        return await response.json()
    }
    static fetchPostId = async (uid) => {
        let url = '';
        if(uid){
            url = `${this.URL}/posts/show/${uid}`;
        }else{
            url = `${this.URL}/posts/show/${localStorage.getItem('userId')}`;
        }
        console.log(url)
        const response = await fetch(`${url}`)
        return await response.json()
    }

    static searchRecipient = async (query) => {
        let url = `${this.URL}/users/search/${query}`;
        console.log(url)
        const response = await fetch(`${url}`)
        return await response.json()
    }

}

export default Api;