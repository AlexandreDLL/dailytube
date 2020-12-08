import React from 'react';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

class Header extends React.Component {

    render() {
        return (
            <header>
                <Navbar bg="black" expand="lg" fixed="top">
                    <NavDropdown title={<i className="fas fa-bars color-green" style={{fontSize: 32}}></i>} id="basic-nav-dropdown">
                        <NavDropdown.Item className="color-green my-2" href="#action/3.1">
                            <i className="fas fa-home mr-2"></i>
                            Accueil
                        </NavDropdown.Item>
                        <NavDropdown.Item className="color-green my-2" href="#action/3.2">
                            <i className="far fa-play-circle mr-2"></i>
                            Abonnements
                        </NavDropdown.Item>
                        <NavDropdown.Item className="color-green mt-2 mb-3" href="#action/3.3">
                            <i className="fas fa-film mr-2"></i>
                            Playlists
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <Navbar.Text className="dropdown-title">ABONNEMENTS</Navbar.Text>
                        <NavDropdown.Item className="color-green my-2" href="#action/3.4">Liste abonnement</NavDropdown.Item>
                    </NavDropdown>
                    <Form inline className="m-auto w-50">
                        <FormControl type="text" placeholder="Recherche" className="mr-sm-2 w-75 m-auto" />
                    </Form>
                    <div className="ml-auto text-white">
                        <img src="asset/img/logo/logo_DailyTube.png" alt="logo" className="logo-navbar" />
                    </div>
                </Navbar>
            </header>
        );
    }
}

export { Header };