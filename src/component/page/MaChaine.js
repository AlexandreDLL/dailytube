import React, { Component } from 'react';
import UserContext from "../../context/UserContext"
import { Navbar, NavDropdown, Form, FormControl, Nav, Modal, Tabs, Tab, Alert, Button, Row, Col } from 'react-bootstrap';
import Accueil from '../MaChaineComponents/Accueil';
import Apropos from '../MaChaineComponents/Apropos';
import Videos from '../MaChaineComponents/Videos';

class MaChaine extends Component {

    constructor(props) {
        super(props);
        this.state = { show: "accueil" }

    }


    static contextType = UserContext;

    componentDidMount() {

        const { user } = this.context
        console.log(user)

        // TODO : Créer les boutons et liens
        // TODO : Sortir la table de stats

    }



    displayState = () => {

        switch (this.state.show) {
            case "accueil": return (<Accueil />);

            case "videos": return (<Videos />);

            case "apropos": return (<Apropos />);
        }
    }

    setStateAccueil() {
        this.setState({ show: "accueil" })
    }
    setStateVideos() {
        this.setState({ show: "videos" })
    }

    setStateApropos() {
        this.setState({ show: "apropos" })
    }


    render() {

        const { user } = this.context

        return (

            <>

                <div className="d-flex align-items-center pt-4 pl-3">
                    <img src={user.avatar} style={{ maxHeight: 150, maxWidth: 150 }} />
                    <Col className="mt-3">
                        <h3>{user.pseudo}</h3>
                        <p>xx abonnés</p>
                    </Col>
                    <Button variant="primary">Personnaliser la chaîne</Button>
                    <Button variant="primary ml-3 mr-5">Gérer les vidéos</Button>

                </div>

                <div className="mt-4">
                    <nav variant="tabs">
                        <Nav variant="tabs" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link eventKey="link-1" onSelect={this.setStateAccueil.bind(this)}>Accueil</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2" onSelect={this.setStateVideos.bind(this)}>Vidéos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-3" onSelect={this.setStateApropos.bind(this)}>A propos</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </nav>
                </div>

                <div>
                    {this.displayState()}
                </div>




            </>
        );
    }
}
export { MaChaine };