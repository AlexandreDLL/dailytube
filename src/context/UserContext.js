import React, { Component } from 'react';

const UserContext = React.createContext();

class UserProvider extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: (localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null)
        }
    }

    setUser = (user) => {
        this.setState({user});
    }

    render(){
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