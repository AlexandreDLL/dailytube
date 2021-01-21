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
            nbPlaylists:0,
            playlists:[],
            isLoaded:false,
            error:null
        }
        
    }

    static contextType = UserContext;


    componentDidMount() {

        const {user} = this.context

// TODO ajouter un WHERE active = 1 et un ORDERBY DESC
        
        // Rest.apiRequest({table:"video", join:`chaine ON video.id_Chaine=chaine.id_Chaine AND chaine.id_Chaine=${user.id_Chaine}`, params:{condition:{attribut:"video.active_Video", operator:"=", value:"1"}, orderBy:{filter:"video.date_Video", order:"DESC"} }}).then((response)=>{

        Rest.apiRequest({table:"video", join:`chaine ON video.id_Chaine=chaine.id_Chaine AND chaine.id_Chaine=${user.id_Chaine}`}).then((response)=>{
            return response.text().then((resp) => {
                // console.log(resp)
                if (resp) {

                    resp = JSON.parse(resp); 

                    while(resp.length > 4) { // Enlèves les dernières vidéos de l'Array jusqu'à ce qu'il n'en reste que 4 (bien choisir le tri initial)
                        resp.pop()
                    }


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


        //TODO : Le bon join pour les playlists copiées
        Rest.apiRequest({table:"playlist", join:`user ON playlist.id_User=user.id_User AND user.id_User=${user.id_User}`}).then((response)=>{
            return response.text().then((resp) => {
                if (resp) {

                    resp = JSON.parse(resp); 

                    while(resp.length > 4) {  // Enlèves les dernières playlists de l'Array jusqu'à ce qu'il n'en reste que 4 (bien choisir le tri initial)
                        resp.pop()
                    }                    
                    
                    this.setState({
                        isLoaded: true,
                        nbPlaylists:resp.length,
                        playlists:resp
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



    }


    render() {

        console.log(this.state)

        const { error, isLoaded, videos, playlists } = this.state;

        if (error) {
            return (
                <div className="vh-100 d-flex align-items-center" style={{ marginTop: -80 }}>
                    <Alert variant='danger' className='text-center w-100'>
                        {error}
                    </Alert>
                </div>
            );
        }
        else if (!isLoaded) {
            return (
                <div className="vh-100 d-flex align-items-center" style={{ marginTop: -80 }}>
                    <Alert variant='success' className='text-center w-100'>
                        Chargement...
                    </Alert>
                </div>
            );
        }
        else if (videos.length > 0) {
            return (
                <>
                <h2 className ='mt-5'>Vos dernières vidéos</h2>
                    <div className="row">
                        {videos.map(item => {
                            let date = new Date(item.date_Video);
                            let jour = date.getDate();
                            let mois = date.getMonth() + 1;
                            let annee = date.getFullYear();
                            if (jour < 10) {
                                jour = '0' + jour;
                            }
                            if (mois < 10) {
                                mois = '0' + mois;
                            }
                            date = `${jour}/${mois}/${annee}`;
                            let vues = item.nb_vue;
                            if (vues > 999 && vues < 1000000) {
                                let nb = vues.slice(0, -3);
                                vues = nb + ' k';
                            }
                            else if (vues > 999999) {
                                let fNb = vues.slice(0, 1);
                                let sNb = vues.slice(1, 2);
                                vues = `${fNb},${sNb} M`;
                            }
                            if (item.active_Video > 0) {
                                return (
                                    <div key={item.id_Video} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mt-5">
                                        <Link to="/video" className="text-decoration-none">
                                            <Card className="bg-black text-white" style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={Rest.prefixMiniature + item.miniature} className="miniature" />
                                                <Card.Body>
                                                    <Card.Title className="t-2" title={item.titre_Video}>{item.titre_Video}</Card.Title>
                                                    <Card.Text>
                                                        <div className="t-3" title={item.description_Video}>
                                                            {item.description_Video}
                                                        </div>
                                                        <div className="mt-3">
                                                        <Link to="/chaine" className="color-green text-decoration-none">
                                                            {item.pseudo_User}
                                                        </Link>
                                                        </div>
                                                        <div>
                                                            {vues} vues - {date}
                                                        </div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </div>
                                );
                            }
                            else {
                                return false;
                            }
                        })}
                    </div>
                </>
            );
        }
        else {
            return (
                <div className="vh-100 d-flex align-items-center" style={{ marginTop: -80 }}>
                    <Alert variant='success' className='text-center w-100'>
                        Vous retrouverez vos dernières vidéos diffusées ici.
                    </Alert>
                </div>
            );
        }
    }
}

export default Accueil;