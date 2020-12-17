import React from 'react';
import { Navbar, NavDropdown, Form, FormControl, Nav, Modal, Tabs, Tab, Alert } from 'react-bootstrap';
import { FaBars, FaFilm, FaHome, FaPlayCircle, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LanguageContext from '../context/LanguageContext';
import UserContext from '../context/UserContext';
import { FormLogin, FormRegister } from './index';
import { Protected } from './Protected';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    static contextType = UserContext;

    logout() {
        const { setUser } = this.context;
        setUser(null);
    }

    render() {
        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });

        return (
            <>
                <Navbar bg="black" expand="lg" fixed="top">
                    <NavDropdown title={<FaBars className="color-green" style={{ fontSize: 32 }}/>} id="basic-nav-dropdown">
                        <NavDropdown.Item className="my-2" as="div">
                            <Link to="/" className="color-green text-decoration-none d-block d-flex align-items-center">
                                <FaHome className="mr-2"/>
                                <LanguageContext.Consumer>
                                    {({language}) => language === 'Français' ? 'Accueil' : 'Home'}
                                </LanguageContext.Consumer>
                            </Link>
                        </NavDropdown.Item>
                        <Protected>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/abonnement" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    <FaPlayCircle className="mr-2"/>
                                    <LanguageContext.Consumer>
                                        {({language}) => language === 'Français' ? 'Abonnements' : 'Subcriptions'}
                                    </LanguageContext.Consumer>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="mt-2 mb-3" as="div">
                                <Link to="/playlist" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    <FaFilm className="mr-2"/>
                                    Playlists
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <Navbar.Text className="navbar-title">
                                <LanguageContext.Consumer>
                                    {({language}) => language === 'Français' ? 'ABONNEMENTS' : 'SUBCRIPTIONS'}
                                </LanguageContext.Consumer>
                            </Navbar.Text>
                            <div className="navbar-abonnement">
                                <NavDropdown.Item className="my-2" as="div">
                                    <Link to="/chaine" className="color-green text-decoration-none d-block d-flex align-items-center">
                                        <img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-chaine mr-2" />
                                        Jean-Michel
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item className="my-2" as="div">
                                    <Link to="/chaine" className="color-green text-decoration-none d-block d-flex align-items-center">
                                        <img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-chaine mr-2" />
                                        Jean-Michel
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item className="my-2" as="div">
                                    <Link to="/chaine" className="color-green text-decoration-none d-block d-flex align-items-center">
                                        <img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-chaine mr-2" />
                                        Jean-Michel
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item className="my-2" as="div">
                                    <Link to="/chaine" className="color-green text-decoration-none d-block d-flex align-items-center">
                                        <img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-chaine mr-2" />
                                        Jean-Michel
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item className="my-2" as="div">
                                    <Link to="/chaine" className="color-green text-decoration-none d-block d-flex align-items-center">
                                        <img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-chaine mr-2" />
                                        Jean-Michel
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item className="my-2" as="div">
                                    <Link to="/chaine" className="color-green text-decoration-none d-block d-flex align-items-center">
                                        <img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-chaine mr-2" />
                                        Jean-Michel
                                    </Link>
                                </NavDropdown.Item>
                            </div>
                        </Protected>
                    </NavDropdown>
                    <Form inline className="m-auto w-50">
                        <FormControl type="text" placeholder="Recherche" className="mr-sm-2 w-75 m-auto" style={{backgroundColor: "#e2e2e2"}} />
                    </Form>
                    <Protected noauth>
                        <Nav.Link role="button" onClick={handleShow} className="ml-auto" style={{ padding: "16px 30px" }}>
                            <FaUser className="color-green" style={{ fontSize: 32 }}/>
                        </Nav.Link>
                    </Protected>
                    <Protected>
                        <NavDropdown title={<img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-navbar" />} id="dropdown-account" className="ml-auto">
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/compte" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    <LanguageContext.Consumer>
                                        {({language}) => language === 'Français' ? 'Gérer mon compte' : 'Manage my account'}
                                    </LanguageContext.Consumer>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/machaine" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    <LanguageContext.Consumer>
                                        {({language}) => language === 'Français' ? 'Gérer ma chaîne' : 'Manage my channel'}
                                    </LanguageContext.Consumer>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/upload" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    <LanguageContext.Consumer>
                                        {({language}) => language === 'Français' ? 'Upload une vidéo' : 'Upload a video'}
                                    </LanguageContext.Consumer>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/" className="color-green text-decoration-none d-block d-flex align-items-center" onClick={this.logout.bind(this)}>
                                    <LanguageContext.Consumer>
                                        {({language}) => language === 'Français' ? 'Se déconnecter' : 'Logout'}
                                    </LanguageContext.Consumer>
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Protected>
                </Navbar>
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="color-green">Connexion / Inscription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant='warning' show={false}>
                            This is a warning alert—check it out!
                        </Alert>
                        <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                            <Tab eventKey="login" title="Connexion">
                                <FormLogin handleClick={handleClose} />
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