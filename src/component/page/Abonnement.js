import React, { Component } from 'react';
import Rest from '../../Rest';
import { Card, Button, Alert } from 'react-bootstrap';

class Abonnement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            error: null
        };
    }

    objSelect = {
        request: 'SELECT id_Video, titre_Video, description_Video, jaime_Video, jaime_pas_Video, nb_vue, date_Video, source, miniature, active_Video, nb_abonne, pseudo_User FROM video JOIN chaine ON video.id_Chaine = chaine.id_Chaine JOIN user ON chaine.id_Chaine = user.id_Chaine LIMIT 10'
    };

    componentDidMount() {
        Rest.apiRequest(this.objSelect).then(resp => resp.text())
            .then(
                (resp) => {
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
                <div className="vh-100 d-flex align-items-center" style={{marginTop: -80}}>
                    <Alert variant='danger' className='text-center w-100'>
                        {error}
                    </Alert>
                </div>
            );
        }
        else if (!isLoaded) {
            return (
                <div className="vh-100 d-flex align-items-center"  style={{marginTop: -80}}>
                    <Alert variant='success' className='text-center w-100'>
                        Chargement...
                    </Alert>
                </div>
            );
        }
        else {
            return (
                <>
                    <div className="row">
                        {items.map(item => (
                            <div key={item.id_Video} className="col-3 d-flex justify-content-center mt-5">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.miniature} />
                                    <Card.Body>
                                        <Card.Title>{item.titre_Video}</Card.Title>
                                        <Card.Text>
                                            {item.description_Video}
                                            <br/>
                                            Chaine: {item.pseudo_User}
                                            <br/>
                                            Active: {item.active_Video}
                                            <br/>
                                            Nombre vue: {item.nb_vue}
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </>
            );
        }
    }
}

export { Abonnement };