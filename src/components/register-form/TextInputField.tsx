import React from 'react';
import PropTypes from 'prop-types';

/**
 * @import Libraries
 */
import { Field, FieldProps } from 'formik';
import { TextField } from 'formik-material-ui';

type TProperty = {
    type: string;
    name: string;
    label: string;
}

type TState = {

}

class TextInputField extends React.Component<TProperty, TState>
{
    static propTypes = {
        type : PropTypes.string,
        name : PropTypes.string,
        label : PropTypes.string.isRequired
    }

    render()
    {
        return (
            <Field
                id={"key-" + this.props.name}
                type={this.props.type}
                name={this.props.name}
                label={this.props.label}
                // inputProps={{
                //     "aria-label" : this.props.label
                // }}
                component={TextField}
            >
            </Field>
        )
    }

    componentDidCatch(error: any, errorInfo: any)
    {
        throw "Fatal error with TextInputField";
    }
}

export default TextInputField;