import React, { Component } from 'react';
import Rest from '../../Rest';
import { Card, Alert } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';

class Abonnement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            error: null
        };
    }

    static contextType = UserContext;

    objSelect = {
        request: ''
    };

    componentDidMount() {
        const { user } = this.context;
        let select = 'SELECT id_Video, titre_Video, description_Video, nb_vue, date_Video, miniature, active_Video, pseudo_User ';
        let from = 'FROM video ';
        let join = 'JOIN chaine ON video.id_Chaine = chaine.id_Chaine JOIN user ON chaine.id_Chaine = user.id_Chaine JOIN abonner ON chaine.id_Chaine = abonner.id_Chaine ';
        let where = 'WHERE abonner.id_User = ' + user.id_User;
        let orderBy = ' ORDER BY video.date_Video DESC';
        let request = select + from + join + where + orderBy;
        this.objSelect = { request };
        Rest.apiRequest(this.objSelect).then(resp => resp.json())
            .then(
                (resp) => {
                    if (resp) {
                        this.setState({
                            isLoaded: true,
                            items: resp
                        });
                    }
                    else {
                        this.setState({
                            isLoaded: true,
                            error: 'Erreur survenue'
                        });
                    }

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;

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
        else if (items.length > 0) {
            return (
                <>
                    <div className="row">
                        {items.map(item => {
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
                        Vous retrouverez les vidéos de vos abonnements ici.
                    </Alert>
                </div>
            );
        }
    }
}

export { Abonnement };