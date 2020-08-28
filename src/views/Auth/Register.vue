<template>

  <div id="login">
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="6">
        <div class="b-form-1">
          <h1>RailWiki Sign Up</h1>

          <!-- TODO: display alerts in a more consistent way -->
          <b-alert variant="success" show v-if="isSuccessful">
            Thanks for joining us, <b>{{ firstName }}</b>! We're glad to have you on board. To continue down
            the track, please <router-link to="/login">log in</router-link>.
          </b-alert>

          <b-alert variant="danger" show v-if="errorMessage">
            {{ errorMessage }}
          </b-alert>

          <b-form @submit.prevent="register" v-if="!isSuccessful">
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
            <b-form-group label="First name" label-for="firstNameInput" :label-sr-only="true">
                <b-form-input
                    id="firstNameInput"
                    type="text"
                    v-model="firstName"
                    required
                    placeholder="First name"
                />
            </b-form-group>
            <b-form-group label="Last name" label-for="lastNameInput" :label-sr-only="true">
                <b-form-input
                    id="lastNameInput"
                    type="text"
                    v-model="lastName"
                    required
                    placeholder="Last name"
                />
            </b-form-group>
            <b-button type="submit" variant="primary">Sign up</b-button>
          </b-form>

        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import RegisterUserModel from '../../models/RegisterUser';
import UserService from '../../services/user.service';

@Component({
  components: {
  },
})
export default class Register extends Vue {
  protected username: string = '';
  protected password: string = '';
  protected firstName: string = '';
  protected lastName: string = '';

  protected isSuccessful: Boolean = false;
  protected errorMessage: string = '';

  async created() {
  }

  protected async register() {
    const request = new RegisterUserModel(this.username, this.password, this.firstName, this.lastName);
    UserService.register(request).then(() => {
      this.isSuccessful = true;
    }).catch(err => {
      console.log('error', err);
      this.errorMessage = 'There was an error creating your account. Please try again.';
    });

  }
}
</script>
