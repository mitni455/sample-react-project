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
                firstname : "John",
                lastname: "Doe"
            },

        }

        return (
            <div className="registerFormik">
                <h1>
                    This is the register formik
                </h1>
                <Formik
                    initialValues={formikData.initialValues}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                        }, 1000);
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