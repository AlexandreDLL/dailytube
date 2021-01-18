import React, { Component } from 'react';
import UserContext from "../../context/UserContext"

class Compte extends Component {


    static contextType = UserContext;


    render() {

        const {user} = this.context

        let dateInscription = new Date(user.date_inscription); // Pour pouvoir traiter et mettre les dates au format FR a savoir DD MM YY au lieu de l'objet date  normalisé a MM-DD-YY
        let dateNaissance = new Date(user.date_naissance); 


        return (

            <>
            

            
            <div>
                <h1>Mon compte</h1>
                <div className="mt-5">
                <img src={user.avatar} />
                <h6 >Nom d'utilisateur</h6> <span> {user.pseudo_User}</span>
                <h6 >Date d'inscription</h6> <span> {dateInscription.getDate() < 10 ? "0"+dateInscription.getDate():dateInscription.getDate()} {Number(dateInscription.getMonth())+1 < 10 ? "0"+ (Number(dateInscription.getMonth())+1) : Number(dateInscription.getMonth())+1} {dateInscription.getFullYear()}</span>
                </div>
                <div className="mt-5">
                <h5>Données personnelles</h5>
                <h6>Etat civil</h6> <span> {user.prenom_User} {user.nom_User}</span>
                <h6>Email</h6> <span> {user.email}</span>
                <h6>Date de naissance</h6> <span> {dateNaissance.getDate() < 10 ? "0"+dateNaissance.getDate():dateNaissance.getDate()} {Number(dateNaissance.getMonth())+1 < 10 ? "0"+ (Number(dateNaissance.getMonth())+1) : Number(dateNaissance.getMonth())+1} {dateNaissance.getFullYear()}</span>

                </div>
            </div>


            </>
        );
    }
}

export { Compte };