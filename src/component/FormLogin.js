import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';

class FormLogin extends Component {

    static contextType = UserContext;

    render() {
        const loginSchema = Yup.object().shape({
            email: Yup.string()
                .email("Veuillez renseigner une adresse mail valide.")
                .required('Veuillez remplir ce champ.'),
            password: Yup.string()
                .required("Veuillez remplir ce champ.")
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
                                <Field type="email" name="email" className="form-control" placeholder="Votre email" />
                                {errors.email && touched.email ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.email}
                                    </small>
                                ) : null}
                            </div>
                            <div className="form-group mt-5">
                                <Field type="password" name="password" className="form-control" placeholder="Votre mot de passe" />
                                {errors.password && touched.password ? (
                                    <small className="position-absolute text-danger">
                                        <i className="far fa-times-circle"></i> {errors.password}
                                    </small>
                                ) : null}
                            </div>
                            <Button variant="green" type="submit" className="w-100 mt-4">
                                Connexion
                            </Button>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

export { FormLogin };