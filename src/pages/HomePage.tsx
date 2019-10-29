import React from 'react';
import PropTypes from 'prop-types';

/**
 * @import Components
 */
import RegisterFormik from '../components/register-form/RegisterFormik';

type TProperty = {

}

type TState = {

}

class HomePage extends React.Component<TProperty, TState> {

    static propTypes = {

    }

    render()
    {
        return (
            <div className="homepage">
                This is the homepage!
                <div>
                    <RegisterFormik/>
                </div>
            </div>
        )
    }

}

export default HomePage;