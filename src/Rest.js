class Rest {

    static prefixMiniature = 'asset/img/user/';

    static bindObjectUrl(obj) {
        obj = Object.keys(obj)
            .map((key) => key + "=" + obj[key])
            .join("&");
        return obj;
    }

    static createGetUrl(body) {
        let params = body.params;
        delete body.params;
        if (params !== undefined) {
            if (params.id === null) {
                delete params.id;
            }
            if (params.condition === null) {
                delete params.condition;
            }
            if (params.orderBy === null) {
                delete params.orderBy;
            }
        }
        body = this.bindObjectUrl(body);
        if (params !== undefined) {
            if (Object.keys(params).length > 0) {
                params = this.bindObjectUrl(params);
                body = body + params;
            }
        }
        return body;
    }

    static apiRequest(body, method = 'GET', login = false) {
        let url;
        if (!login) {
            url = 'http://api.loc/index.php';
        }
        else {
            url = 'http://api.loc/login.php';
        }
        if (localStorage.getItem('user') != null && localStorage.getItem('token') != null) {
            let user = localStorage.getItem('user');
            let token = localStorage.getItem('token');
            body.user = parseInt(user);
            body.token = token;
        }
        let options = { method };
        if (method !== 'GET') {
            options.body = JSON.stringify(body);
        }
        else {
            url += '?' + this.createGetUrl(body);
        }
        try {
            return fetch(url, options);
        }
        catch (e) {
            console.error('Erreur api:' + e);
        }
    }
}

export default Rest;