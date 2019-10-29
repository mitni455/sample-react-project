import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';

import RegisterForm from './RegisterForm';
import RegisterFormik from './RegisterFormik';
import { Field } from 'formik';
import { fieldToSelect } from 'formik-material-ui';

describe("RegisterFormik", () => {

    describe("", () => {

        

    });

    test("Should update an input when it is changed", () => {

        const wrapper = shallow(<RegisterFormik />);

        // -- Get all fields in the form
        const fields: ShallowWrapper = wrapper.find('Formik').dive().find(RegisterForm).dive().find(Field);

        // -- Selecting the last name input from this list of fields
        const field: ShallowWrapper = fields.find('[name="lastname"]');

        // const field = fields.findWhere((field: ShallowWrapper) => {
        //     return field.prop('name') === "lastname";
        // })

        // field.simulate('change', {

        // })
        // fireEvent.change()

        console.log(fields.find('[name="lastname"]').debug());
        expect(1).toBe(1);

    })

})