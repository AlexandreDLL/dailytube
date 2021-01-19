import React, { Component } from 'react';
import UserContext from "../../context/UserContext"
import Rest from "../../Rest"
import { Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Accueil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nbVideos:0,
            videos: [],
            nbPlaylist:0,
            playlists:[],
            isLoaded:false,
            error:null
        }
        
    }

    static contextType = UserContext;


    componentDidMount() {

        const {user} = this.context


        Rest.apiRequest({table:"video", join:`chaine ON video.id_Chaine=chaine.id_Chaine AND chaine.id_Chaine=${user.id_Chaine}`}).then((response)=>{
            return response.text().then((resp) => {
                if (resp) {

                    resp = JSON.parse(resp); 
                    console.log(resp);
                    this.setState({
                        isLoaded: true,
                        nbVideos:resp.length,
                        videos:resp
                    })
                }
                else {
                    this.setState({
                        isLoaded:true, 
                        error : "Erreur survenue"
                    })
                }
            });
        })

        // TODO : Une 2e requête pour les playlists
        // TODO : Gérer l'affichage des playlists et autre comme pour videos.js dans le render


    }


    render() {
        return (
            <div>
                Composant Accueil
            </div>
        );
    }
}

export default Accueil;