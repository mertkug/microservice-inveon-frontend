import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import userManager from './../userManager';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {CallbackComponent} from "redux-oidc";
const CallbackPage = (props) => {
    const history = useNavigate()
    const successCallback = (user) => {
        // props.dispatch({ type: 'user/login',  username: user.profile.preferred_username  })
        history('/');
    };

    const errorCallback = (error) => {
        console.log(error);
        history('/');
    };

    useEffect(() => {
        userManager
            .signinRedirectCallback()
            .then(user => successCallback(user))
            .catch(error => errorCallback(error));
    });

    return (
        <CallbackComponent
            userManager={userManager}
            successCallback={successCallback}
            errorCallback={errorCallback}
        >
            <div>Loading...</div>
        </CallbackComponent>
    );
};

export default connect()(CallbackPage);