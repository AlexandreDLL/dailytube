import React, { Component } from 'react';

const UserContext = React.createContext();

class UserProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    setUser = (user) => {
        this.setState({ user });
    }

    componentDidMount() {
        if (localStorage.getItem('user') != null && localStorage.getItem('token') != null) {
            const body = JSON.stringify({ token: localStorage.getItem('token'), user: localStorage.getItem('user') });
            try {
                fetch('http://api.loc:8081/login.php', { method: 'POST', body }).then((response) => {
                    return response.text().then((resp) => {
                        resp = JSON.parse(resp);
                        resp = resp[0];
                        if (resp) {
                            this.setUser(resp);
                        }
                        else {
                            console.log(resp);
                        }
                    });
                })
            }
            catch (e) {
                console.log('Erreur' + e);
            }
        }
    }

    render() {
        const { children } = this.props;
        const { user } = this.state;
        const { setUser } = this;

        return (
            <UserContext.Provider
                value={{
                    user,
                    setUser
                }}
            >
                {children}
            </UserContext.Provider>
        );
    }
}

export { UserProvider };

export default UserContext;