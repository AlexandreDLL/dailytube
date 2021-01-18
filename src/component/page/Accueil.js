import React, { Component } from 'react';
import UserContext from '../../context/UserContext';

class Accueil extends Component {

    static contextType = UserContext;

    render() {
        const { user } = this.context;

        return (
            <div>
                {user !== null ? 
                    user.id_role === '2' ? 
                    <h1>Bonjour Admin {user.prenom}</h1> : 
                    <h1>Bonjour {user.prenom_User}</h1> : 
                <h1>AccueilTest</h1>
                }
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