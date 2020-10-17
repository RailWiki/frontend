import ApiService from './api.service';
import RegisterUserModel from '../models/RegisterUser';
import UserModel, { FilterUsersModel, UserStatsModel } from '@/models/User';
import config from '../config';
import { OktaAuth, OktaAuthOptions, IDToken, AccessToken } from '@okta/okta-auth-js';
import PaginatedModel from '@/models/PaginatedModel';
import { AxiosResponse } from 'axios';

const userService = {
  async getById(id: number): Promise<UserModel> {
    const url = `users/${id}`;

    return ApiService.get(url).then((response: AxiosResponse) => {
      const user = new UserModel(response.data);
      return user;
    });
  },

  async getUsers(filter?: FilterUsersModel): Promise<PaginatedModel<UserModel>> {
    let url = 'users';

    if (filter) {
      url = `${url}?${filter.toQueryString()}`;
    }

    return ApiService.get(url).then((response: AxiosResponse) => {
      const pagedResponse = new PaginatedModel<UserModel>(response);
      pagedResponse.data = response.data.map((x: any) => new UserModel(x));
      return pagedResponse;
    });
  },

  async getCurrentUser(): Promise<UserModel> {
    try {
      const response = await ApiService.get('users/current');
      const user = new UserModel(response.data);
      return user;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },

  async register(user: RegisterUserModel): Promise<UserModel> {
    try {
      const response = await ApiService.post('users', user);
      const newUser = new UserModel(response.data);
      return newUser;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },

  async login(username: string, password: string) {
    const opts = {
      ...config.auth
    };

    const oktaAuth = new OktaAuth(opts);

    return oktaAuth.signIn({
        username,
        password
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
  },

  async getUserStats(userId: number): Promise<UserStatsModel> {
    const url = `users/${userId}/stats`;

    return ApiService.get(url).then((response: AxiosResponse) => {
      const stats = new UserStatsModel(response.data);
      return stats;
    });
  }
};

export default userService;
