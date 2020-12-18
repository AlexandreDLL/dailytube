import React from 'react';
import { Navbar, NavDropdown, Form, FormControl, Nav, Modal, Tabs, Tab } from 'react-bootstrap';
import { FaBars, FaFilm, FaHome, FaPlayCircle, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { FormLogin, FormRegister } from './index';
import { Protected } from './Protected';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            terms: {
                accueil: 'Accueil',
                abonnements: 'Abonnements',
                ABONNEMENTS: 'ABONNEMENTS',
                monCompte: 'Gérer mon compte',
                maChaine: 'Gérer ma chaîne',
                upload: 'Upload une vidéo',
                deconnexion: 'Se déconnecter',
                titreModal: 'Connexion / Inscription',
                connexion: 'Connexion',
                inscription: 'Inscription',
                recherche: 'Recherche'
            }
        };
    }

    static contextType = UserContext;

    logout() {
        const { setUser } = this.context;
        setUser(null);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            if (this.props.language === 'Français') {
                this.setState({
                    terms: {
                        accueil: 'Accueil',
                        abonnements: 'Abonnements',
                        ABONNEMENTS: 'ABONNEMENTS',
                        monCompte: 'Gérer mon compte',
                        maChaine: 'Gérer ma chaîne',
                        upload: 'Upload une vidéo',
                        deconnexion: 'Se déconnecter',
                        titreModal: 'Connexion / Inscription',
                        connexion: 'Connexion',
                        inscription: 'Inscription',
                        recherche: 'Recherche'
                    }
                });
            }
            else {
                this.setState({
                    terms: {
                        accueil: 'Home',
                        abonnements: 'Subcriptions',
                        ABONNEMENTS: 'SUBCRIPTIONS',
                        monCompte: 'Manage my account',
                        maChaine: 'Manage my channel',
                        upload: 'Upload a video',
                        deconnexion: 'Logout',
                        titreModal: 'Login / Register',
                        connexion: 'Login',
                        inscription: 'Register',
                        recherche: 'Search'
                    }
                });
            }
        }
    }

    render() {
        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });

        return (
            <>
                <Navbar bg="black" expand="lg" fixed="top">
                    <NavDropdown title={<FaBars className="color-green" style={{ fontSize: 32 }} />} id="basic-nav-dropdown">
                        <NavDropdown.Item className="my-2" as="div">
                            <Link to="/" className="color-green text-decoration-none d-block d-flex align-items-center">
                                <FaHome className="mr-2" />
                                {this.state.terms.accueil}
                            </Link>
                        </NavDropdown.Item>
                        <Protected>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/abonnement" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    <FaPlayCircle className="mr-2" />
                                    {this.state.terms.abonnements}
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="mt-2 mb-3" as="div">
                                <Link to="/playlist" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    <FaFilm className="mr-2" />
                                    Playlists
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <Navbar.Text className="navbar-title">
                                {this.state.terms.ABONNEMENTS}
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
                        <FormControl type="text" placeholder={this.state.terms.recherche} className="mr-sm-2 w-75 m-auto" style={{ backgroundColor: "#e2e2e2" }} />
                    </Form>
                    <Protected noauth>
                        <Nav.Link role="button" onClick={handleShow} className="ml-auto" style={{ padding: "16px 30px" }}>
                            <FaUser className="color-green" style={{ fontSize: 32 }} />
                        </Nav.Link>
                    </Protected>
                    <Protected>
                        <NavDropdown title={<img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-navbar" />} id="dropdown-account" className="ml-auto">
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/compte" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    {this.state.terms.monCompte}
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/machaine" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    {this.state.terms.maChaine}
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/upload" className="color-green text-decoration-none d-block d-flex align-items-center">
                                    {this.state.terms.upload}
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="my-2" as="div">
                                <Link to="/" className="color-green text-decoration-none d-block d-flex align-items-center" onClick={this.logout.bind(this)}>
                                    {this.state.terms.deconnexion}
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Protected>
                </Navbar>
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="color-green">
                            {this.state.terms.titreModal}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                            <Tab eventKey="login" title={this.state.terms.connexion}>
                                <FormLogin handleClick={handleClose} language={this.props.language} />
                            </Tab>
                            <Tab eventKey="register" title={this.state.terms.inscription}>
                                <FormRegister language={this.props.language} />
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export { Header };