import React from 'react';
import { Navbar, NavDropdown, Form, FormControl, Nav, Modal, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormLogin, FormRegister } from './index';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    render() {
        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });
        let user = false;

        return (
            <>
                <Navbar bg="black" expand="lg" fixed="top">
                    <NavDropdown title={<i className="fas fa-bars color-green" style={{ fontSize: 32 }}></i>} id="basic-nav-dropdown">
                        <NavDropdown.Item className="my-2" as="div">
                            <Link to="/" className="color-green text-decoration-none d-block">
                                <i className="fas fa-home mr-2"></i>
                                Accueil
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item className="my-2" as="div">
                            <Link to="/abonnement" className="color-green text-decoration-none d-block">
                                <i className="far fa-play-circle mr-2"></i>
                                Abonnements
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item className="mt-2 mb-3" as="div">
                            <Link to="/playlist" className="color-green text-decoration-none d-block">
                                <i className="fas fa-film mr-2"></i>
                                Playlists
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <Navbar.Text className="navbar-title">ABONNEMENTS</Navbar.Text>
                        <NavDropdown.Item className="my-2" as="div">
                            <Link to="/chaine" className="color-green text-decoration-none d-block">
                                Liste abonnement
                            </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Form inline className="m-auto w-50">
                        <FormControl type="text" placeholder="Recherche" className="mr-sm-2 w-75 m-auto" />
                    </Form>
                    { !user &&
                        <Nav.Link role="button" onClick={handleShow}>
                            <i className="fas fa-user color-green" style={{ fontSize: 20 }}></i>
                        </Nav.Link>
                    }
                    { user &&
                        <NavDropdown title={<img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-navbar" />} id="dropdown-account" className="ml-auto">
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/compte" className="color-green text-decoration-none d-block">
                                    Gérer mon compte
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/machaine" className="color-green text-decoration-none d-block">
                                    Gérer ma chaîne
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/upload" className="color-green text-decoration-none d-block">
                                    Upload une vidéo
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/deconnexion" className="color-green text-decoration-none d-block">
                                    Se déconnecter
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    }
                </Navbar>
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="color-green">Connexion / Inscription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                            <Tab eventKey="login" title="Connexion">
                                <FormLogin />
                            </Tab>
                            <Tab eventKey="register" title="Inscription">
                                <FormRegister />
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export { Header };