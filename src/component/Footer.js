import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LanguageContext from '../context/LanguageContext';

class Footer extends Component {

    static contextType = LanguageContext;

    handleClickLanguage(e){
        const { setLanguage } = this.context;
        setLanguage(e.target.title);
    }

    render() {
        const { language } = this.context;

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
                                    {language === 'Français' ? 'Présentation' : 'Presentation'}
                                </Link>
                            </Nav.Link>
                        </li>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/droit" className="color-green text-decoration-none navlink-footer">
                                    {language === 'Français' ? "Droits d'auteur" : 'Copyright'}
                                </Link>
                            </Nav.Link>
                        </li>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/contacter" className="color-green text-decoration-none navlink-footer">
                                    {language === 'Français' ? 'Nous contacter' : 'Contact us'}
                                </Link>
                            </Nav.Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/condition" className="color-green text-decoration-none navlink-footer">
                                    {language === 'Français' ? "Conditions d'utilisation" : 'Terms of use'}
                                </Link>
                            </Nav.Link>
                        </li>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/confidentialite" className="color-green text-decoration-none navlink-footer">
                                    {language === 'Français' ? "Confidentialité" : 'Confidentiality'}
                                </Link>
                            </Nav.Link>
                        </li>
                        <li>
                            <Nav.Link as="div">
                                <Link to="/regle" className="color-green text-decoration-none navlink-footer">
                                    {language === 'Français' ? "Règles et sécurité" : 'Rules and security'}
                                </Link>
                            </Nav.Link>
                        </li>
                    </ul>
                </Nav>
                <Nav className="flex-column text-center">
                    <Navbar.Text className="navbar-title">
                        {language === 'Français' ? "Langue" : 'Language'}
                    </Navbar.Text>
                    <div className="d-flex justify-content-center">
                        <div style={{ display: "inline", marginRight: 20 }}>
                            <img className="logo-language" src="asset/img/logo/france-icon.png" alt="Icon Français" title="Français" onClick={this.handleClickLanguage.bind(this)}/>
                        </div>
                        <div className="d-flex align-content-center">
                            <img className="logo-language" src="asset/img/logo/english-icon.png" alt="Icon English" title="English" onClick={this.handleClickLanguage.bind(this)}/>
                        </div>
                    </div>
                    <Navbar.Text className="navbar-title">
                        {language === 'Français' ? "Nos réseaux sociaux" : 'Our social networks'}
                    </Navbar.Text>
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