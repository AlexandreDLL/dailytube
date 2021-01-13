import React, { Component } from 'react';
import UserContext from "../../context/UserContext"

class Compte extends Component {


    static contextType = UserContext;


    render() {

        const {user} = this.context

        return (

            <>
            

            
            <div>
                <h1>Mon compte</h1>
                <div className="mt-5">
                <img src={user.avatar} />
                <h6 >Nom d'utilisateur</h6> <span> {user.pseudo}</span>
                <h6 >Date d'inscription</h6> <span> {user.date_inscription}</span>
                </div>
                <div className="mt-5">
                <h5>Données personnelles</h5>
                <h6>Etat civil</h6> <span> {user.prenom} {user.nom}</span>
                <h6>Email</h6> <span> {user.email}</span>
                <h6>Date de naissance</h6> <span> {user.date_naissance}</span>

                </div>
            </div>


            </>
        );
    }
}

export { Compte };