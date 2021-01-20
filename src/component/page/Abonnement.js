import React, { Component } from 'react';
import Rest from '../../Rest';
import { Card, Alert } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';
import Utils from '../../Utils';

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

    componentDidMount() {
        const { user } = this.context;
        Rest.apiRequest({ table: 'video', id: user.id_User, url: 'abonnement' }).then(resp => resp.text())
            .then(
                (resp) => {
                    try {
                        resp = JSON.parse(resp);
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
                    }
                    catch (e) {
                        console.log(e);
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
                        let vues = Utils.writeNumber(item.nb_vue);
                        if (item.active_Video > 0) {
                            return (
                                <div key={item.id_Video} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mt-5">
                                    <Link to={"/video/" + item.id_Video} className="text-decoration-none">
                                        <Card className="bg-black text-white shadow-card h-100" style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={Utils.prefixUser + item.miniature} className="miniature" />
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