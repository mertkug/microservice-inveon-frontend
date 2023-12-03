import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
    client_id: 'inveon',
    authority: "https://localhost:5021",
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'code',
    scope:"openid profile inveon",
    client_secret: "secret",
    post_logout_redirect_uri: "http://localhost:3000/signout-callback-oidc",
    filterProtocolClaims: true,
    loadUserInfo: true,
    monitorSession: true,
};

const userManager = createUserManager(userManagerConfig);

userManager.getUser().then(user => {
    if (user) {
        console.log('User:', user);
    } else {
        console.log('User is not authenticated.');
    }
});
export default userManager;