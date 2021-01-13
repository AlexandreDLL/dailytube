import React, { Component } from 'react';
import UserContext from "../../context/UserContext"


// TODO : Faire une jointure et un select de la chaine - description dont l'ID_chaine correspond à la chaine du context user
// TODO :  Offrir la possibilité de modifier, créer une textarea qui lancera un update sur la desc
// TODO : Fix la date



class Apropos extends Component {

    constructor(props) {
        super(props);
        
        this.state = {desc:"Ici une description de la chaine"}
    }
    

    

    static contextType = UserContext;


    render() {

                const {user} = this.context
                let date = user.date_inscription;
                date = date.split(" ")[0]
                console.log()

                let dateInscription = new Date(user.date_inscription);
                console.log(dateInscription)
                console.log(Number(dateInscription.getMonth())+1 )
                console.log("0"+ (Number(dateInscription.getMonth())+1) )

        return (
            <div className= "ml-2 mt-5">
                Composant A propos

                <div className="mt-3 ml-5">
                <h6 className="mt-2">Actif depuis le</h6> <span> {dateInscription.getDate() < 10 ? "0"+dateInscription.getDate():dateInscription.getDate()} {Number(dateInscription.getMonth())+1 < 10 ? "0"+ (Number(dateInscription.getMonth())+1) : Number(dateInscription.getMonth())+1} {dateInscription.getFullYear()}</span>
                <h6 className="mt-2">Nombre de vidéos postées</h6> <span> {"blblbl"}</span>
                <h6 className="mt-2">Diverses stats ?</h6> <span> {""}</span>
                </div>


            </div>
        );
    }
}

export default Apropos;