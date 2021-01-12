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
        table: 'chaine',
        params: {
            id: null,
            condition: null,
            orderBy: null
        }
    };

    componentDidMount() {
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
                <>
                    <Alert variant='danger' className='text-center'>
                        Erreur: {error}
                    </Alert>
                </>
            );
        }
        else if (!isLoaded) {
            return (
                <>
                    <Alert variant='success' className='text-center'>
                        Chargement...
                    </Alert>
                </>
            );
        }
        else {
            return (
                <>
                    <div className="row">
                        {items.map(item => (
                            <div key={item.id} className="col-3 d-flex justify-content-center mt-5">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="asset/img/logo/logo_DailyTube.png" />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                            <br/>
                                            Active: {item.active}
                                            <br/>
                                            Nombre abonné: {item.nb_abonne}
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