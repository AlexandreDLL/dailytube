import React, { Component } from 'react';
import UserContext from "../../../context/UserContext";
import Rest from "../../../Rest";
import { Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Videos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nbVideos: 0,
            videos: [],
            isLoaded: false,
            error: null
        }
    }

    static contextType = UserContext;

    componentDidMount() {

        const { user } = this.context

        Rest.apiRequest({ table: "user", id: user.id_User, action: "chaine", videos: user.id_Chaine }).then(resp => resp.text())
            .then((resp) => {
                try {
                    resp = JSON.parse(resp)
                    this.setState({
                        isLoaded: true,
                        nbVideos: resp.length,
                        videos: resp
                    })
                }
                catch {
                    this.setState({
                        isLoaded: true,
                        error: "Erreur survenue"
                    })
                }
            })
    }

    render() {

        const { error, isLoaded, videos } = this.state;

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
                    <h1>Vos vidéos publiées</h1>
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
                            let vues = String(item.nb_vue);
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
                            } else if (item.active_Video === 0) {
                                return (
                                    <>
                                        <div key={item.id_Video} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mt-5">
                                            <Link to="/video" className="text-decoration-none">
                                                <Card className="bg-black text-white" style={{ width: '18rem' }}>
                                                    <Card.Img variant="top" src={Rest.prefixMiniature + item.miniature} className="miniature" />
                                                    <Card.Body>
                                                        <Card.Title className="t-2" title={item.titre_Video}>{item.titre_Video}</Card.Title>
                                                        <Card.Title className="t-2" title={"alert inactive"}>{"Video Inactive"}</Card.Title>
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
                                    </>
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
                        Vous retrouverez vos vidéos ici.
                    </Alert>
                </div>
            );
        }
    }
}


export { Videos };