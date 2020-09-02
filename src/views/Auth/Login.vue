<template>
    <div id="login">
        <b-row class="justify-content-md-center">
            <b-col cols="12" md="6">
                <div class="b-form-1">
                    <h1>RailWiki Sign In</h1>


                    <b-form @submit.prevent="login">
                        <b-form-group label="Email address" label-for="emailInput" :label-sr-only="true">
                            <b-form-input
                                id="emailInput"
                                type="email"
                                v-model="username"
                                required
                                placeholder="Email address"
                            />
                        </b-form-group>
                        <b-form-group label="Password" label-for="passwordInput" :label-sr-only="true">
                            <b-form-input
                                id="passwordInput"
                                type="password"
                                v-model="password"
                                required
                                placeholder="Password"
                            />
                        </b-form-group>
                        <div class="d-flex justify-content-between">
                          <b-button type="submit" variant="primary">Log in</b-button>

                          <router-link to="/register">Sign up</router-link>
                        </div>

                    </b-form>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
// This component is in JS because Okta isn't playing nicely with TS types :(

import Vue from 'vue';
import UserService from '../../services/user.service';

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
      login() {
        UserService.login(this.username, this.password).then(() => {
          this.$router.push('/');
        });
      }
    }
};
</script>
