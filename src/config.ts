const { VUE_APP_API_URL,
    VUE_APP_OKTA_CLIENT_ID: clientId,
    VUE_APP_OKTA_ISSUER: issuer,
    OKTA_DISABLE_HTTPS_CHECK: disableHttpsCheck } = process.env;

export default {
    apiUrl: VUE_APP_API_URL,
    auth: {
        clientId,
        issuer,
        redirectUri: 'http://localhost:8080/implicit/callback',
        scopes: [ 'openid', 'profile' ],
        pkce: true,
        testing: {
            disableHttpsCheck
        }
    }
};
