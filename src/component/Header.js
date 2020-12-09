import React from 'react';
import { Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
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
                </NavDropdown>
            </Navbar>
        );
    }
}

export { Header };