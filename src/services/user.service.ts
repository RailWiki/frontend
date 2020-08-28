import ApiService from './api.service';
import RegisterUserModel from '../models/RegisterUser';
import UserModel from '@/models/User';
import config from '../config';
import { OktaAuth, OktaAuthOptions, IDToken, AccessToken } from '@okta/okta-auth-js';

const userService = {
  async register(user: RegisterUserModel): Promise<UserModel> {
    try {
      const response = await ApiService.post('users', user);
      console.log('api response', response);

      const newUser = new UserModel(response.data.id, response.data.email, response.data.firstName, response.data.lastName);
      return newUser;
    } catch(err) {
      throw new Error(err.response.data);
    }
  },

  async login(username: string, password: string) {
    const opts = {
      ...config.auth
    };

    const oktaAuth = new OktaAuth(opts);

    return oktaAuth.signIn({
        username: username,
        password: password
    }).then((signInResponse) => {
        oktaAuth.token.getWithoutPrompt({
            responseType: 'id_token',
            sessionToken: signInResponse.sessionToken,
            scopes: config.auth.scopes
        }).then((tokenResponse) => {
            oktaAuth.tokenManager.add('idToken', tokenResponse.tokens.idToken as IDToken);
            oktaAuth.tokenManager.add('accessToken', tokenResponse.tokens.accessToken as AccessToken);
        });
    });
  }
}

export default userService;
