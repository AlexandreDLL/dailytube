import React, { Component } from 'react';
import UserContext from "../../context/UserContext"

// TODO : Faire une jointure et un select de toutes les vidéos dont l'ID_chaine correspond à la chaine du context user



class Videos extends Component {

    static contextType = UserContext;


    render() {
        return (
            <div>
                Composant Video
            </div>
        );
    }
}

export default Videos;