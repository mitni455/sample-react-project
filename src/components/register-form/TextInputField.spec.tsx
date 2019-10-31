import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as Yup from 'yup';

/**
 * @import Utils
 */
import { checkProps } from '../../utils/test-helpers';

/**
 * @import Components
 */
import { Formik, Form, FormikProps } from 'formik';
import TextInputField from './TextInputField';

/**
 * Uses react-testing-library render to render a component. This helper should not be used if we want to access
 * the internal formik props (the object referencing doesnt seem to play nicely) so you'll need to reprint this code
 * to the test that requires the props
 */
const renderFormik = (initialValues: any, 
                     formikProps: any = {}, 
                     inputProps: {type: string, name: string, label: string} = {type : "text", name : "test", label: "test"}): RenderResult =>
{
    const renderResult: RenderResult = render(
        <Formik
            onSubmit={(values, actions) => {}}
            initialValues={initialValues}
            {...formikProps}
        >
            {(formikProps: FormikProps<any>) => {
                // -- Return the formik Form component with our TextInputField nested inside
                return (
                    <Form>
                        <TextInputField {...inputProps}>
                        </TextInputField>
                    </Form>
                )
            }}
        </Formik>
    )

    return renderResult;
}

describe("TextInputField Component", () => {

    describe("Checking prop types", () => {

        it ("Should not throw any warnings", () => {

            const expectedProps = {
                type : "text",
                name : "testfield",
                label: "Test Field"
            }

            const propErrors = checkProps(TextInputField, expectedProps);

            expect(propErrors).toBeUndefined();

        })

    })

    describe("Rendering without schema", () => {

        interface IValues {
            firstname: string;
        }
        const initialValues = {
            firstname : "john"
        }
        const initInputProps = {
            type : "text",
            name : "firstname",
            label : "First Name"
        }

        it ("Should render without errors", () => {

            let renderedComponent: RenderResult = renderFormik(initialValues, undefined, initInputProps);

            const inputElement: any = renderedComponent.getByLabelText(initInputProps.label);

            expect(inputElement).toBeDefined();
            expect(inputElement.type).toBe(initInputProps.type);
            expect(inputElement.name).toBe(initInputProps.name);
            expect(inputElement).toHaveValue(initialValues.firstname);

        })

        it ("Should update formikProp.values when the input value is changed", () => {

            let injectedFormikProps: FormikProps<IValues>;
            let renderedComponent: RenderResult = render(
                <Formik
                    onSubmit={(values, actions) => {}}
                    initialValues={initialValues}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedFormikProps = formikProps;
                        // -- Return the formik Form component with our TextInputField nested inside
                        return (
                            <Form>
                                <TextInputField {...initInputProps}>
                                </TextInputField>
                            </Form>
                        )
                    }}
                </Formik>
            )

            const inputElement: any = renderedComponent.getByLabelText(initInputProps.label);
            const expectedFirstnameValue = "Jane";

            fireEvent.change(inputElement, {
                persist : () => {},
                target : {
                    name : "firstname",
                    value : "Jane"
                }
            })

            expect(inputElement).toHaveValue(expectedFirstnameValue);
            expect(injectedFormikProps.values.firstname).toBe("Jane");
        })

    })

    describe("Rendering with schema", () => {

        interface IValues {
            firstname: string;
        }
        const initialValues = {
            firstname : "john"
        }
        const initFormikProps = {
            validationSchema : Yup.object().shape({
                firstname: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Required')
            })
        }
        const initInputProps = {
            type : "text",
            name : "firstname",
            label : "First Name"
        }
        

        it ("Should init without any errors", () => {

            let renderedComponent: RenderResult = renderFormik(initialValues, initFormikProps, initInputProps);

            const pElementErrors: HTMLElement[] = renderedComponent.queryAllByDisplayValue('Required');

            expect(pElementErrors.length).toBe(0);

        })

        it ("Should show a 'Required' error when there is value is empty", (done) => {

            let injectedFormikProps: FormikProps<IValues>;
            let renderedComponent: RenderResult = render(
                <Formik
                    onSubmit={(values, actions) => {}}
                    initialValues={initialValues}
                    validationSchema={initFormikProps.validationSchema}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedFormikProps = formikProps;
                        // -- Return the formik Form component with our TextInputField nested inside
                        return (
                            <Form>
                                <TextInputField {...initInputProps}>
                                </TextInputField>
                            </Form>
                        )
                    }}
                </Formik>
            )
            const inputElement: any = renderedComponent.getByLabelText(initInputProps.label);
            const htmlInputElement = renderedComponent.baseElement.querySelector('input[name="firstname"]');

            // -- First do something to the input to set the input as "touched". I believe this would be some rule with
            //    formik-material-ui where it doesn't update with validation unless it's already been touched
            fireEvent.blur(htmlInputElement);

            // -- Change the value to empty to fire a Required validation error
            fireEvent.change(inputElement, {
                persist : () => { },
                target : {
                    name : initInputProps.name,
                    value : ""
                }
            });

            
            
        
            // -- Setting a quick timeout to allow the view to render with the element we need to find
            setTimeout(() => {

                // -- First check that the injectedFormikProps has the errors
                let expectedFormikPropErrors = {}
                expectedFormikPropErrors[initInputProps.name] = "Required";
                expect(injectedFormikProps.errors).toEqual(expectedFormikPropErrors);

                // -- Searching for the HTML that renders this formik error
                const pElementError: HTMLElement = renderedComponent.container.querySelector('#key-' + initInputProps.name + '-helper-text');
                expect(pElementError).toBeInstanceOf(HTMLElement);
                expect(pElementError.innerHTML).toBe("Required");
                // expect(renderedComponent.getByText("Required")).toBeDefined() // -- Alternative but we will use above for checking formik-material-ui

                done();
            }, 1);
            

        })

        it ("Should show the 'Too Short!' error when the input container fewer than the required number of characters", (done) => {
            let injectedFormikProps: FormikProps<IValues>;
            let renderedComponent: RenderResult = render(
                <Formik
                    onSubmit={(values, actions) => {}}
                    initialValues={initialValues}
                    validationSchema={initFormikProps.validationSchema}
                >
                    {(formikProps: FormikProps<IValues>) => {
                        injectedFormikProps = formikProps;
                        // -- Return the formik Form component with our TextInputField nested inside
                        return (
                            <Form>
                                <TextInputField {...initInputProps}>
                                </TextInputField>
                            </Form>
                        )
                    }}
                </Formik>
            )
            const inputElement: any = renderedComponent.getByLabelText(initInputProps.label);
            const htmlInputElement = renderedComponent.baseElement.querySelector('input[name="firstname"]');

            // -- Force input to be dirty
            fireEvent.blur(htmlInputElement);

            // -- Change the value to empty to fire a Required validation error
            fireEvent.change(inputElement, {
                persist : () => { },
                target : {
                    name : initInputProps.name,
                    value : "a"
                }
            });
        
            // -- Setting a quick timeout to allow the view to render with the element we need to find
            setTimeout(() => {

                // -- First check that the injectedFormikProps has the errors
                let expectedFormikPropErrors = {}
                expectedFormikPropErrors[initInputProps.name] = "Too Short!";
                expect(injectedFormikProps.errors).toEqual(expectedFormikPropErrors);

                // -- Searching for the HTML that renders this formik error
                const pElementError: HTMLElement = renderedComponent.container.querySelector('#key-' + initInputProps.name + '-helper-text');
                expect(pElementError).toBeInstanceOf(HTMLElement);
                expect(pElementError.innerHTML).toBe("Too Short!");

                done();
            }, 1);
        })
    });

    describe("Rendering with error", () => {
        
        const initInputProps = {
            type : "text",
            name : "firstname",
            label : "First Name"
        }

        // -- Don't enjoy the render blasting the console with errors. Have to figure out why it does this otherwise we ignore this test
        // it ("Should fail to render when the input is not wrapped in formik", () => {

        //     try
        //     {
        //         // -- TextInputField will fail to render as there are dependencies on formik. There will 
        //         //    be errors printing to the screen but componentDidCatch should throw the error to be 
        //         //    caught in the catch block
        //         let renderedComponent = render(<TextInputField {...initInputProps} />)
        //     }
        //     catch (e)
        //     {
        //         expect(e).toBe("Fatal error with TextInputField");
        //     }

        // })

    })
})