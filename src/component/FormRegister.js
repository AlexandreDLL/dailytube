import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';

class FormRegister extends Component {
    showSuccess(errors, touched, name){
        if(!errors[name] && touched[name]) {
            return (<small className="position-absolute text-success">
                <i className="far fa-check-circle"></i> Champ valide
            </small>);
        }
        return null;
    }

    render() {
        const supportedFormats = [
            'jpg',
            'jpeg',
            'png'
        ];

        const registerSchema = Yup.object().shape({
            nom: Yup.string()
                .max(35, "Veuillez inscrire un nom avec moins de 35 caractères")
                .required('Veuillez remplir ce champ.'),
            prenom: Yup.string()
                .max(25, "Veuillez inscrire un prénom avec moins de 25 caractères")
                .required("Veuillez remplir ce champ."),
            pseudo: Yup.string()
                .max(50, "Veuillez inscrire un pseudo avec moins de 50 caractères")
                .required('Veuillez remplir ce champ.'),
            dateNaissance: Yup.date()
                .required("Veuillez remplir ce champ."),
            avatar: Yup.mixed()
                .nullable()
                .test(
                    "fileFormat",
                    "Veuillez sélectionner un bon format d'image.",
                    value => value !== undefined ? supportedFormats.includes(value.substring(value.lastIndexOf('.') + 1)) : true
                ),
            email: Yup.string()
                .email("Veuillez inscrire une adresse email valide.")
                .required("Veuillez remplir ce champ."),
            password: Yup.string()
                .min(8, "Veuillez inscrire un mot de passe avec 8 caractères minimum.")
                .required("Veuillez remplir ce champ."),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], "Mot de passe incorrect.")
                .required("Veuillez remplir ce champ.")
        });

        return (
            <>
                <Formik
                    initialValues={{
                        nom: "",
                        prenom: "",
                        pseudo: "",
                        dateNaissance: "",
                        avatar: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema={registerSchema}
                    onSubmit={ values => {
                        console.log(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="mt-4">
                            <div className="form-group">
                                <Field name="nom" className="form-control" placeholder="Votre nom" />
                                {errors.nom && touched.nom ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.nom}
                                    </small>
                                ) : null}
                                {this.showSuccess(errors, touched, "nom")}
                            </div>
                            <div className="form-group mt-5">
                                <Field name="prenom" className="form-control" placeholder="Votre prénom" />
                                {errors.prenom && touched.prenom ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.prenom}
                                    </small>
                                ) : null}
                                {this.showSuccess(errors, touched, "prenom")}
                            </div>
                            <div className="form-group mt-5">
                                <Field name="pseudo" className="form-control" placeholder="Votre pseudo" />
                                {errors.pseudo && touched.pseudo ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.pseudo}
                                    </small>
                                ) : null}
                                {this.showSuccess(errors, touched, "pseudo")}
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="dateNaissance" className="color-green">Votre date de naissance :</label>
                                <Field type="date" name="dateNaissance" className="form-control" placeholder="Votre date de naissance" />
                                {errors.dateNaissance && touched.dateNaissance ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.dateNaissance}
                                    </small>
                                ) : null}
                                {this.showSuccess(errors, touched, "dateNaissance")}
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="avatar" className="color-green" style={{margin: 0}}>Choisissez votre image de profil : *</label>
                                <br/>
                                <small className="color-green">Formats supportés : JPEG, JPG, PNG</small>
                                <Field type="file" name="avatar" className="form-control" placeholder="Sélectionner votre avatar" id="test" />
                                {errors.avatar && touched.avatar ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.avatar}
                                    </small>
                                ) : null}
                                {this.showSuccess(errors, touched, "avatar")}
                            </div>
                            <div className="form-group mt-5">
                                <Field type="email" name="email" className="form-control" placeholder="Votre email" />
                                {errors.email && touched.email ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.email}
                                    </small>
                                ) : null}
                                {this.showSuccess(errors, touched, "email")}
                            </div>
                            <div className="form-group mt-5">
                                <Field type="password" name="password" className="form-control" placeholder="Votre mot de passe" />
                                {errors.password && touched.password ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.password}
                                    </small>
                                ) : null}
                                {this.showSuccess(errors, touched, "password")}
                            </div>
                            <div className="form-group mt-5">
                                <Field type="password" name="confirmPassword" className="form-control" placeholder="Confirmer votre mot de passe" />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.confirmPassword}
                                    </small>
                                ) : null}
                                {this.showSuccess(errors, touched, "confirmPassword")}
                            </div>
                            <Button variant="green" type="submit" className="w-100 mt-4">
                                Inscription
                            </Button>
                            <small className="color-green">* Champ NON obligatoire</small>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

export { FormRegister };