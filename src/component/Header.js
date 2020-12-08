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
                    <NavDropdown title={<i className="fas fa-bars"></i>} id="basic-nav-dropdown">
                        <NavDropdown.Item className="color-green" href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item className="color-green" href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item className="color-green" href="#action/3.3">Something</NavDropdown.Item>
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