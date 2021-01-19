class Rest {

    static prefixMiniature = 'asset/img/user/';

    // static bindObjectUrl(obj) {
    //     obj = Object.keys(obj)
    //         .map((key) => key + "=" + obj[key])
    //         .join("&");
    //     return obj;
    // }

    // static createGetUrl(body) {
    //     let params = body.params;
    //     delete body.params;
    //     if (params !== undefined) {
    //         if (params.id === null) {
    //             delete params.id;
    //         }
    //         if (params.condition === null) {
    //             delete params.condition;
    //         }
    //         if (params.orderBy === null) {
    //             delete params.orderBy;
    //         }
    //     }
    //     body = this.bindObjectUrl(body);
    //     if (params !== undefined) {
    //         if (Object.keys(params).length > 0) {
    //             params = this.bindObjectUrl(params);
    //             body = body + params;
    //         }
    //     }
    //     return body;
    // }

    static apiRequest(body, method = 'GET', login = false) {
        let url = 'http://localhost:3000/';
        let headers = {
            'Content-Type': 'application/json'
        };
        if (login) {
            url += 'user/login';
            body.login = true;
        }
        if (localStorage.getItem('user') != null && login) {
            let user = localStorage.getItem('user');
            body.user = parseInt(user);
        }
        let options = { method };
        if (method !== 'GET') {
            if (localStorage.getItem('token') != null) {
                let token = localStorage.getItem('token');
                headers = {
                    'Content-Type': 'application/json',
                    'authorization': token
                };
            }
            options.headers = headers;
            options.body = JSON.stringify(body);
        }
        else {
            if (localStorage.getItem('token') != null) {
                let token = localStorage.getItem('token');
                headers = {
                    'Content-Type': 'application/json',
                    'authorization': token,
                    'allow': body.table
                };
            }
            else {
                headers = {
                    'Content-Type': 'application/json',
                    'allow': body.table
                };
            }
            for (const key in body) {
                url += body[key] + '/';
            }
            options.headers = headers;
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