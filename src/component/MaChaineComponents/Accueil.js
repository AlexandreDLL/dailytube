import React, { Component } from 'react';
import UserContext from "../../context/UserContext"

// TODO : Faire une jointure et un select des 5 dernières vidéos uploadées par le user, et des 4-5 dernières playlist créées par le user


class Accueil extends Component {

    static contextType = UserContext;


    render() {
        return (
            <div>
                Composant Accueil
            </div>
        );
    }
}

export default Accueil;