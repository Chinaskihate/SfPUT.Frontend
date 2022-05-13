import {UserManager, UserManagerSettings} from "oidc-client";
import {setAuthHeader} from "./auth-headers";
import exp from "constants";

const userManagerSettings: UserManagerSettings = {
    client_id: 'sfput-web-app',
    redirect_uri: 'http://localhost:3000/signin-oidc',
    response_type: 'code',
    scope: 'openid profile SfPUTApi',
    authority: 'https://localhost:10001/',
    post_logout_redirect_uri: 'http://localhost:3000/signout-oidc'
};

const userManager = new UserManager(userManagerSettings);
export async function loadUser() {
    const user = await userManager.getUser();
    console.log('User: ', user);
    const token = user?.access_token;
    setAuthHeader(token);
}

export async function loadUsername() {
    const user = await userManager.getUser();
    return user?.profile.name;
}

export const signinRedirect = () => userManager.signinRedirect();

export const signinRedirectCallback = () => userManager.signinRedirectCallback();

export const signoutRedirect = async () => {
    const userIdToken = (await userManager.getUser())?.id_token;
    userManager.clearStaleState();
    userManager.removeUser();
    return userManager.signoutRedirect({id_token_hint: userIdToken});
}

export const signoutRedirectCallback = () => {
    userManager.clearStaleState();
    userManager.removeUser();
    return userManager.signoutRedirectCallback();
}

export default userManager