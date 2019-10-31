import React from 'react';

/**
 * @import Libraries
 */
import { Formik, FormikProps } from 'formik';

/**
 * @import Components
 */
import RegisterForm from './RegisterForm';

/**
 * @import Services
 */
import MsManagementService from '../../services/ms-management.service';

/**
 * @import Schemas
 */
import { registerFormSchema } from '../../schemas/register-form.schema';

type TProperty = {

}

type TState = {

}

class RegisterFormik extends React.Component<TProperty, TState>
{
    static propTypes = {

    }

    render()
    {
        const formikData = {
            initialValues : {
                firstname : "",
                lastname: "",
                email : "",
                phone: ""
            },

        }

        return (
            <div className="registerFormik">
                <h1>
                    Registration form
                </h1>
                <Formik
                    initialValues={formikData.initialValues}
                    onSubmit={(values, actions) => {
                        try
                        {
                            MsManagementService.apiCreateUser(values);
                        }
                        catch(err)
                        {
                            console.error("err", err);
                        }

                    }}
                    validationSchema={registerFormSchema}
                >
                    { (render: FormikProps<any>) => {
                        return <RegisterForm
                                    // handleSubmit={render.handleSubmit}
                                    // handleChange={render.handleChange}
                                    // handleBlur={render.handleChange}
                                    // values={render.values}
                                    // errors={render.errors}
                                />
                    }}
                </Formik>
            </div>
        )
    }
}

export default RegisterFormik;