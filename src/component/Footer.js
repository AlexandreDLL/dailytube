import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <Navbar bg="black" expand="lg" className="d-flex justify-content-between">
                <div>
                    <img src="asset/img/logo/logo_DailyTube.png" alt="Logo" className="logo-footer" />
                    <p className="color-green">© 2020 DailyTube</p>
                </div>
                <Nav>
                    <ul>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/presentation" className="color-green text-decoration-none navlink-footer">
                                    Présentation
                                </Link>
                            </Nav.Link>
                        </li>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/droit" className="color-green text-decoration-none navlink-footer">
                                    Droits d'auteur
                                </Link>
                            </Nav.Link>
                        </li>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/contacter" className="color-green text-decoration-none navlink-footer">
                                    Nous contacter
                                </Link>
                            </Nav.Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/condition" className="color-green text-decoration-none navlink-footer">
                                    Conditions d'utilisation
                                </Link>
                            </Nav.Link>
                        </li>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/confidentialite" className="color-green text-decoration-none navlink-footer">
                                    Confidentialité
                                </Link>
                            </Nav.Link>
                        </li>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/regle" className="color-green text-decoration-none navlink-footer">
                                    Règles et sécurité
                                </Link>
                            </Nav.Link>
                        </li>
                    </ul>
                </Nav>
                <Nav className="flex-column">
                    <Navbar.Text className="navbar-title">Nos réseaux sociaux</Navbar.Text>
                    <div className="d-flex justify-content-center">
                        <Nav.Link href="https://fr-fr.facebook.com/" target="_blank" style={{ display: "inline", marginRight: 20 }}>
                            <i className="fab fa-facebook-square font-reseaux" style={{ color: '#3b5998' }}></i>
                        </Nav.Link>
                        <Nav.Link href="https://twitter.com/?lang=fr" target="_blank">
                            <i className="fab fa-twitter font-reseaux" style={{ color: '#00aced' }}></i>
                        </Nav.Link>
                    </div>
                </Nav>
            </Navbar>
        );
    }
}

export { Footer };