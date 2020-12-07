import React from 'react';
import PropTypes from 'prop-types';
import NormalLoginForm from '../../components/Login/Login';
import RegistrationForm from '../../components/Register/Register';


LoginScreen.propTypes = {
    
};

function LoginScreen(props) {
    return (
        <div>
            <NormalLoginForm/>
            {/* <RegistrationForm/> */}
        </div>
    );
}

export default LoginScreen;