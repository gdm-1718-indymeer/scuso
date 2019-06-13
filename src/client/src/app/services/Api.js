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

    static sendMessage = async () => {
        let url = `${this.URL}/messages/create`;
        const response = await fetch(`${url}`)
        return await response.json()
    }
}

export default Api;
