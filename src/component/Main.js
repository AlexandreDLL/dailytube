import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Accueil, Abonnement, Chaine, Compte, MaChaine, Playlist, Upload, ErrorView } from './page';

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/">
                        <Accueil />
                    </Route>
                    <Route path="/abonnement">
                        <Abonnement />
                    </Route>
                    <Route path="/playlist">
                        <Playlist />
                    </Route>
                    <Route path="/chaine">
                        <Chaine />
                    </Route>
                    <Route path="/compte">
                        <Compte />
                    </Route>
                    <Route path="/machaine">
                        <MaChaine />
                    </Route>
                    <Route path="/upload">
                        <Upload />
                    </Route>
                    <Route path="/deconnexion">
                        <Redirect to="/" />
                    </Route>
                    <Route path="*">
                        <ErrorView />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export { Main };