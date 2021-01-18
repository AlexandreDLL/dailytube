import React, { Component } from 'react';
import UserContext from "../../context/UserContext"
import { Button } from 'react-bootstrap';
import {TextAreaForm} from '../MaChaineComponents/TextAreaForm'




class Compte extends Component {

    constructor(props) {
        super(props);
        
        this.state = { isOnEdit : false, userName:"", realName:"", realFamilyName:"", eMail:"" }

        this.editMode = this.editMode.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    editMode() {

        this.setState({isOnEdit : !this.state.isOnEdit})
    }

    handleInputChange(e, props) {

        let event = props.event

        if (event === "modifUserName"){
            this.setState({userName: e.value})

        }
        if (event === "modifRealName"){
            this.setState({realName: e.value})


        }
        if (event === "modifRealFamilyName"){
            this.setState({realFamilyName: e.value})


        }
        if (event === "modifEmail"){
            this.setState({eMail: e.value})

        }

    }

    componentDidMount(){

        const { user } = this.context
        this.setState({userName:user.pseudo_User, realName: user.prenom_User, realFamilyName:user.nom_User, eMail:user.email})

    }
    


    static contextType = UserContext;


    render() {

        const { user } = this.context

        let dateInscription = new Date(user.date_inscription); // Pour pouvoir traiter et mettre les dates au format FR a savoir DD MM YY au lieu de l'objet date  normalisé a MM-DD-YY
        let dateNaissance = new Date(user.date_naissance);


        return (

            <>

                <div>
                    <h1 style={{ marginLeft: "45vw" }}>Mon compte</h1>
                    <div className="d-flex" style={{ marginLeft: "20vw" }}>


                        <div className="mt-5">
                            <img src={user.avatar} />
                        </div>
                        <div className="mt-5 ml-4">
                            <h6 >Nom d'utilisateur</h6> <p>{this.state.isOnEdit === true ? <TextAreaForm value={this.state.userName} id={user.id_User} event="modifUserName" onValueChange={this.handleInputChange}/> : <>{this.state.userName}</>}</p>
                            <h6 >Date d'inscription</h6> <p> {dateInscription.getDate() < 10 ? "0" + dateInscription.getDate() : dateInscription.getDate()}/{Number(dateInscription.getMonth()) + 1 < 10 ? "0" + (Number(dateInscription.getMonth()) + 1) : Number(dateInscription.getMonth()) + 1}/{dateInscription.getFullYear()}</p>
                            <div className="mt-2">
                                <h5>Données personnelles</h5>
                                {this.state.isOnEdit === true ? <div style={{display: 'inline-block'}}><TextAreaForm value={this.state.realName} id={user.id_User} event="modifRealName" onValueChange={this.handleInputChange} /> <TextAreaForm value={this.state.realFamilyName} id={user.id_User} event="modifRealFamilyName" onValueChange={this.handleInputChange}/> </div>: <><h6>Etat civil</h6> <span> {user.prenom_User} {user.nom_User}</span></>}

                                {this.state.isOnEdit === true ? <TextAreaForm value={this.state.email} id={user.id_User} event="modifEmail" onValueChange={this.handleInputChange}/> : <> <h6>Email</h6> <span> {user.email}</span></>}
                                

                                <h6>Date de naissance</h6> <span> {dateNaissance.getDate() < 10 ? "0" + dateNaissance.getDate() : dateNaissance.getDate()}/{Number(dateNaissance.getMonth()) + 1 < 10 ? "0" + (Number(dateNaissance.getMonth()) + 1) : Number(dateNaissance.getMonth()) + 1}/{dateNaissance.getFullYear()}</span>

                            </div>
                        </div>

                    </div>

                    <Button variant="primary" onClick={this.editMode} style={{marginLeft : "40vw"}}>Modifier ses informations personnelles</Button>


                </div>





            </>
        );
    }
}

export { Compte };