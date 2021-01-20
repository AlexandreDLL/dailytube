import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Rest from '../../Rest';
import Utils from '../../Utils';
import { Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import UserContext from '../../context/UserContext';

class Video extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            error: null
        };
    }

    static contextType = UserContext;

    componentDidMount() {
        const id = this.props.match.params.id;
        Rest.apiRequest({ table: 'video', id: id }).then(resp => resp.text())
            .then(
                (resp) => {
                    try {
                        resp = JSON.parse(resp);
                        if (resp) {
                            this.setState({
                                isLoaded: true,
                                items: {
                                    video: [resp.video],
                                    all: resp.all
                                }
                            });
                        }
                        else {
                            this.setState({
                                isLoaded: true,
                                error: 'Erreur survenue'
                            });
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleJaime(){
        console.log('jaime !');
    }

    handleJaimePas(){
        console.log('jaime pas !');
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const { user } = this.context;

        if (error) {
            return (
                <div className="vh-100 d-flex align-items-center" style={{ marginTop: -80 }}>
                    <Alert variant='danger' className='text-center w-100'>
                        {error}
                    </Alert>
                </div>
            );
        }
        else if (!isLoaded) {
            return (
                <div className="vh-100 d-flex align-items-center" style={{ marginTop: -80 }}>
                    <Alert variant='success' className='text-center w-100'>
                        Chargement...
                    </Alert>
                </div>
            );
        }
        else if (items.video.length === 1) {
            return (
                <div className="row marginTop">
                    {items.video.map(item => {
                        let date = new Date(item.date_Video);
                        let jour = date.getDate();
                        let mois = date.getMonth() + 1;
                        let annee = date.getFullYear();
                        if (jour < 10) {
                            jour = '0' + jour;
                        }
                        switch (mois) {
                            case 1:
                                mois = 'Janvier';
                                break;
                            case 2:
                                mois = 'Février';
                                break;
                            case 3:
                                mois = 'Mars';
                                break;
                            case 4:
                                mois = 'Avril';
                                break;
                            case 5:
                                mois = 'Mai';
                                break;
                            case 6:
                                mois = 'Juin';
                                break;
                            case 7:
                                mois = 'Juillet';
                                break;
                            case 8:
                                mois = 'Août';
                                break;
                            case 9:
                                mois = 'Septembre';
                                break;
                            case 10:
                                mois = 'Octobre';
                                break;
                            case 11:
                                mois = 'Novembre';
                                break;
                            case 12:
                                mois = 'Décembre';
                                break;
                            default:
                                break;
                        }
                        date = `${jour} ${mois} ${annee}`;
                        let vues = String(item.nb_vue);
                        vues = vues.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                        let jaime = Utils.writeNumber(item.jaime_Video);
                        let jaimePas = Utils.writeNumber(item.jaime_pas_Video);
                        return (
                            <div key={item.id_Video} className="col-lg-9 col-md-12">
                                <div>
                                    <iframe className="w-100" height="753" src="https://www.youtube.com/embed/XQ4pldh_pOA" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                                <div>
                                    <h1 className="h3 text-white mt-3">{item.titre_Video}</h1>
                                </div>
                                <hr className="bg-green" />
                                <div className="row">
                                    <div className="col-9 p-0">
                                        <p className="text-white">{vues} vues - {date}</p>
                                    </div>
                                    <div className="col-3 text-white d-flex">
                                        <div className="d-flex align-items-center mr-3">
                                            <div>{jaime}</div>
                                            {user ?
                                                <AiFillLike className="color-green fs-24" onClick={this.handleJaime.bind(this)} /> :
                                                <AiFillLike className="color-green fs-24" />
                                            }
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div>{jaimePas}</div>
                                            {user ?
                                                <AiFillDislike className="text-danger fs-24" onClick={this.handleJaimePas.bind(this)} /> :
                                                <AiFillDislike className="text-danger fs-24" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    }
                    <div className="col-3 d-flex flex-column align-items-center">
                        {items.all.map(item => {
                            let date = new Date(item.date_Video);
                            let jour = date.getDate();
                            let mois = date.getMonth() + 1;
                            let annee = date.getFullYear();
                            if (jour < 10) {
                                jour = '0' + jour;
                            }
                            if (mois < 10) {
                                mois = '0' + mois;
                            }
                            date = `${jour}/${mois}/${annee}`;
                            let vues = Utils.writeNumber(item.nb_vue);
                            return (
                                <div key={item.id_Video} className="mb-4">
                                    <Link to={"/video/" + item.id_Video} className="text-decoration-none">
                                        <Card className="bg-black text-white shadow-card" style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={Utils.prefixUser + item.miniature} className="miniature" />
                                            <Card.Body>
                                                <Card.Title className="t-2" title={item.titre_Video}>{item.titre_Video}</Card.Title>
                                                <Card.Text>
                                                    <div className="mt-3">
                                                        <Link to="/chaine" className="color-green text-decoration-none">
                                                            {item.pseudo_User}
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        {vues} vues - {date}
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div >
            );
        }
        else {
            return (
                <>
                    <Redirect to="/video" />
                </>
            );
        }
    }
}

export default withRouter(Video);