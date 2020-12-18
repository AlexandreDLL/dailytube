import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import { FaTimesCircle } from 'react-icons/fa';

class FormLogin extends Component {

    static contextType = UserContext;

    createTextLanguage() {
        let terms;
        if (this.props.language === 'Français') {
            terms = {
                errEmail: "Veuillez inscrire une adresse mail valide.",
                errRequired: "Veuillez remplir ce champ.",
                email: "Votre email",
                password: "Votre mot de passe",
                connexion: 'Connexion'
            }
        }
        else {
            terms = {
                errEmail: "Please enter a valid email address.",
                errRequired: "Please fill in this field.",
                email: "Your email",
                password: "Your password",
                connexion: 'Login'
            }
        }
        return terms;
    }

    render() {
        let terms = this.createTextLanguage();

        const loginSchema = Yup.object().shape({
            email: Yup.string()
                .email(terms.errEmail)
                .required(terms.errRequired),
            password: Yup.string()
                .required(terms.errRequired)
        });

        return (
            <>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={loginSchema}
                    onSubmit={values => {
                        console.log(values);
                        const { setUser } = this.context;
                        // let newUser = {nom: 'Didillon', prenom: 'Alexandre', role: 'admin'};
                        let newUser = { nom: 'Didillon', prenom: 'Alexandre', role: 'user' };
                        setUser(newUser);
                        this.props.handleClick();
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="mt-4">
                            <div className="form-group">
                                <Field type="email" name="email" className="form-control" placeholder={terms.email} />
                                {errors.email && touched.email ? (
                                    <small className="position-absolute text-danger d-flex align-items-center">
                                        <FaTimesCircle />&nbsp;{errors.email}
                                    </small>
                                ) : null}
                            </div>
                            <div className="form-group mt-5">
                                <Field type="password" name="password" className="form-control" placeholder={terms.password} />
                                {errors.password && touched.password ? (
                                    <small className="position-absolute text-danger d-flex align-items-center">
                                        <FaTimesCircle />&nbsp;{errors.password}
                                    </small>
                                ) : null}
                            </div>
                            <Button variant="green" type="submit" className="w-100 mt-4">
                                {terms.connexion}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

export { FormLogin };