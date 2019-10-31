import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';

import RegisterForm from './RegisterForm';
import RegisterFormik from './RegisterFormik';
import { Field } from 'formik';
import { fieldToSelect } from 'formik-material-ui';
import { doesNotReject } from 'assert';

/**
 * @import Services
 */
import MsManagementService from '../../services/ms-management.service';

describe("RegisterFormik", () => {

    describe("Render", () => {

        let renderedComponent: RenderResult;

        

        it ("Should render without any errors", () => {

            const renderedComponent = render(<RegisterFormik />);

            expect(renderedComponent.getByText('Registration form')).toBeDefined();

        })

    })

    describe("Integration test", () => {

        let renderedComponent: RenderResult;

        beforeEach(() => {
            renderedComponent = render(<RegisterFormik />);
        })

        it ("Should create a user when the input validation passes and the submit button is clicked", (done) => {

            const expectedUserData = {
                firstname : "John",
                lastname : "Doe",
                email : "john.doe@gmail.com",
                phone : "0211234567"
            }

            const firstNameInput = renderedComponent.getByLabelText('First Name');
            const lastNameInput = renderedComponent.getByLabelText("Last Name");
            const emailInput = renderedComponent.getByLabelText("Email");
            const phoneInput = renderedComponent.getByLabelText("Mobile Phone");
            const submitButton = renderedComponent.getByTestId("register-submit-button");
            const createUserSpy = jest.spyOn(MsManagementService, 'apiCreateUser')
                .mockImplementation(async (userData: any) => {
                    expect(userData).toEqual(expectedUserData);

                    createUserSpy.mockRestore();
                    done();
                })


            fireEvent.change(firstNameInput, {
                target : {
                    name : "firstname",
                    value : expectedUserData.firstname
                }
            })
            fireEvent.change(lastNameInput, {
                target : {
                    name : "lastname",
                    value : expectedUserData.lastname
                }
            })
            fireEvent.change(emailInput, {
                target : {
                    name : "email",
                    value : expectedUserData.email
                }
            })
            fireEvent.change(phoneInput, {
                target : {
                    name : "phone",
                    value : expectedUserData.phone
                }
            })
            fireEvent.click(submitButton);
        })

        it ("Should disable the onSubmit function when the input fields are invalid", (done) => {

            const createUserSpy = jest.spyOn(MsManagementService, 'apiCreateUser')
                .mockImplementation(async (userData: any) => {})

            const submitButton = renderedComponent.getByTestId("register-submit-button");
            fireEvent.click(submitButton);

            setTimeout(() => {
                expect(createUserSpy).toBeCalledTimes(0);
                done();
            }, 1);
        })

    });

})