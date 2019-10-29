import React from 'react';
import PropTypes from 'prop-types';

/**
 * @import Libraries
 */
import { Form, FieldProps } from 'formik';

/**
 * @Import Components
 */
import TextInputField from './TextInputField';

type TProperty = {
    // -- For form
    // handleSubmit: (e: React.FormEvent) => void;
    
    // -- For child inputs
    // handleChange: (e: React.ChangeEvent<any>) => void;
    // handleBlur: (e: any) => void;
    // values: { [inputName: string] : any };
    // errors: { [inputName: string] : any };
}

type TState = {

}

class RegisterForm extends React.Component<TProperty, TState>
{
    static propTypes = {
        handleSubmit: PropTypes.func,
        // handleChange: PropTypes.func,
        // handleBlur: PropTypes.func,
        // values: PropTypes.object,
        // errors: PropTypes.object
    }

    render()
    {
        return (
            <Form>
                <TextInputField 
                    type="text"
                    name="firstname"
                    label="First Name"
                >
                </TextInputField>

                <TextInputField 
                    type="text"
                    name="lastname"
                    label="Last Name"
                >
                </TextInputField>

                <TextInputField 
                    type="text"
                    name="email"
                    label="Email"
                >
                </TextInputField>

                <TextInputField 
                    type="text"
                    name="phone"
                    label="Mobile Phone"
                >
                </TextInputField>
                
                <button 
                    type="submit"
                    data-testid="register-submit-button"
                >
                    Register
                </button>
            </Form>
        )
    }
}

export default RegisterForm;