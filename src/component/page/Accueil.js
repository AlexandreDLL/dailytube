import React, { Component } from 'react';
import UserContext from '../../context/UserContext';

class Accueil extends Component {

    static contextType = UserContext;

    render() {
        const { user } = this.context;

        return (
            <div>
                {user !== null ? <h1>Bonjour {user.prenom}</h1> : <h1>Accueil</h1>}
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
                <h1>Accueil</h1>
            </div>
        );
    }
}

export { Accueil };