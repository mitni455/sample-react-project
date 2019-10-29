import React from 'react';
import * as Yup from 'yup';
import { RenderResult, render, fireEvent } from '@testing-library/react';

import RegisterForm from './RegisterForm';
import { FormikProps, Formik } from 'formik';

describe("RegisterForm Component", () => {

    interface IValues {
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
    }
    let initialValues = {
        firstname : "",
        lastname: "",
        email: "",
        phone: ""
    }
    let inputFieldProps = {
        firstname : {
            id : "key-firstname",
            name : "firstname",
            label: "First Name",
            type: "text"
        },
        lastname : {
            id : "key-lastname",
            name : "lastname",
            label: "Last Name",
            type: "text"
        },
        email : {
            id : "key-email",
            name: "email",
            label: "Email",
            type: "text"
        },
        phone: {
            id : "key-phone",
            name: "phone",
            label: "Mobile Phone",
            type: "text"
        }
    }
    

    describe("Rending without schema", () => {

        it ("Should render without errors", () => {

            let injectedProps: FormikProps<IValues>;
            const renderedComponent = render(
                <Formik
                    onSubmit={(values, actions) => { }}
                    initialValues={initialValues}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedProps = formikProps;
                        return <RegisterForm />
                    }}
                </Formik>
            )

            expect(renderedComponent).toBeDefined();

        })

        it ("Should contain a firstname field", () => {

            let injectedProps: FormikProps<IValues>;
            const renderedComponent = render(
                <Formik
                    onSubmit={(values, actions) => { }}
                    initialValues={initialValues}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedProps = formikProps;
                        return <RegisterForm />
                    }}
                </Formik>
            )
            
            const firstnameInput: any = renderedComponent.getByLabelText(inputFieldProps.firstname.label);
            expect(firstnameInput).toBeDefined();
            expect(firstnameInput.value).toBe("");
            expect(firstnameInput.id).toBe(inputFieldProps.firstname.id);
            expect(firstnameInput.name).toBe(inputFieldProps.firstname.name);
            expect(firstnameInput.type).toBe(inputFieldProps.firstname.type);
            
        })

        it ("Should contain a lastname field", () => {
            let injectedProps: FormikProps<IValues>;
            const renderedComponent = render(
                <Formik
                    onSubmit={(values, actions) => { }}
                    initialValues={initialValues}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedProps = formikProps;
                        return <RegisterForm />
                    }}
                </Formik>
            )
            
            const lastnameInput: any = renderedComponent.getByLabelText(inputFieldProps.lastname.label);
            expect(lastnameInput).toBeDefined();
            expect(lastnameInput.value).toBe("");
            expect(lastnameInput.id).toBe(inputFieldProps.lastname.id);
            expect(lastnameInput.name).toBe(inputFieldProps.lastname.name);
            expect(lastnameInput.type).toBe(inputFieldProps.lastname.type);
        })

        it ("Should contain an email field", () => {
            let injectedProps: FormikProps<IValues>;
            const renderedComponent = render(
                <Formik
                    onSubmit={(values, actions) => { }}
                    initialValues={initialValues}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedProps = formikProps;
                        return <RegisterForm />
                    }}
                </Formik>
            )
            
            const emailInput: any = renderedComponent.getByLabelText(inputFieldProps.email.label);
            expect(emailInput).toBeDefined();
            expect(emailInput.value).toBe("");
            expect(emailInput.id).toBe(inputFieldProps.email.id);
            expect(emailInput.name).toBe(inputFieldProps.email.name);
            expect(emailInput.type).toBe(inputFieldProps.email.type);
        })

        it ("Should contain a phone field", () => {
            let injectedProps: FormikProps<IValues>;
            const renderedComponent = render(
                <Formik
                    onSubmit={(values, actions) => { }}
                    initialValues={initialValues}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedProps = formikProps;
                        return <RegisterForm />
                    }}
                </Formik>
            )
            
            const phoneInput: any = renderedComponent.getByLabelText(inputFieldProps.phone.label);
            expect(phoneInput).toBeDefined();
            expect(phoneInput.value).toBe("");
            expect(phoneInput.id).toBe(inputFieldProps.phone.id);
            expect(phoneInput.name).toBe(inputFieldProps.phone.name);
            expect(phoneInput.type).toBe(inputFieldProps.phone.type);
        })

        it ("Should contain a submit button", () => {

            let injectedProps: FormikProps<IValues>;
            const renderedComponent = render(
                <Formik
                    onSubmit={(values, actions) => { }}
                    initialValues={initialValues}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedProps = formikProps;
                        return <RegisterForm />
                    }}
                </Formik>
            )

            const submitButton: any = renderedComponent.getByTestId('register-submit-button');

            expect(submitButton).toBeDefined();
            expect(submitButton.innerHTML).toBe("Register")

        })

    })

    describe("Rendering with schema", () => {

        const initFormikProps = {
            validationSchema : Yup.object().shape({
                firstname: Yup.string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                lastname: Yup.string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email')
                    .required('Required'),
                phone: Yup.string()
                    .min(9, 'Too Short!')
                    .max(10, 'Too Long!')
            })
        }

        it ("Should render without errors", () => {
            let injectedProps: FormikProps<IValues>;
            const renderedComponent = render(
                <Formik
                    onSubmit={(values, actions) => { }}
                    initialValues={initialValues}
                    {...initFormikProps}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedProps = formikProps;
                        return <RegisterForm />
                    }}
                </Formik>
            )

            expect(renderedComponent).toBeDefined();

        })

        it ("Should submit the input values when all schema rules are satisfied", (done) => {
            let injectedProps: FormikProps<IValues>;

            const expectedValues = {
                firstname : "Jane",
                lastname : "Doe",
                email : "jane.doe@email.com",
                phone : "0211234567"
            }

            const onSubmitFunc = (values, actions) => {
                expect(values).toEqual(expectedValues);
                done()
            }

            const renderedComponent = render(
                <Formik
                    onSubmit={onSubmitFunc}
                    initialValues={initialValues}
                    {...initFormikProps}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedProps = formikProps;
                        return <RegisterForm />
                    }}
                </Formik>
            )

            const firstnameInput: any = renderedComponent.getByLabelText(inputFieldProps.firstname.label);
            const lastnameInput: any = renderedComponent.getByLabelText(inputFieldProps.lastname.label);
            const emailInput: any = renderedComponent.getByLabelText(inputFieldProps.email.label);
            const phoneInput: any = renderedComponent.getByLabelText(inputFieldProps.phone.label);
            const submitButton: any = renderedComponent.getByTestId('register-submit-button');

            fireEvent.change(firstnameInput, {
                target : {
                    name : inputFieldProps.firstname.name,
                    value : expectedValues.firstname
                }
            })
            
            fireEvent.change(lastnameInput, {
                target : {
                    name : inputFieldProps.lastname.name,
                    value : expectedValues.lastname
                }
            })

            fireEvent.change(emailInput, {
                target : {
                    name : inputFieldProps.email.name,
                    value : expectedValues.email
                }
            })
            
            fireEvent.change(phoneInput, {
                target : {
                    name : inputFieldProps.phone.name,
                    value : expectedValues.phone
                }
            })

            fireEvent.click(submitButton);
        })

        it ("Should not submit if there are input validation errors", (done) => {

            let injectedProps: FormikProps<IValues>;

            const expectedValues = {
                firstname : "Jane",
                lastname : "Doe",
                email : "jane.doe@email.com",
                phone : "0211234567"
            }

            const onSubmitFunc = (values, actions) => {
                expect(true).toBeFalsy();
                done();
            }

            const renderedComponent = render(
                <Formik
                    onSubmit={onSubmitFunc}
                    initialValues={initialValues}
                    {...initFormikProps}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedProps = formikProps;
                        return <RegisterForm />
                    }}
                </Formik>
            )

            const firstnameInput: any = renderedComponent.getByLabelText(inputFieldProps.firstname.label);
            const lastnameInput: any = renderedComponent.getByLabelText(inputFieldProps.lastname.label);
            const emailInput: any = renderedComponent.getByLabelText(inputFieldProps.email.label);
            const phoneInput: any = renderedComponent.getByLabelText(inputFieldProps.phone.label);
            const submitButton: any = renderedComponent.getByTestId('register-submit-button');

            fireEvent.click(submitButton);

            setTimeout(() => {
                done();
            }, 2000);

        })

    })

})