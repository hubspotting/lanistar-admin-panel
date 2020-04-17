<template>
  <v-app id="inspire">
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css" rel="stylesheet">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-form @submit.prevent="handleSubmit">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-alert type="error"  dense v-if="errorSummary">
                    {{ errorSummary }}
                  </v-alert>
                  <v-text-field
                    id="username"
                    v-model="$v.username.$model"
                    :error="$v.username.$error"
                    :error-messages="usernameErrors"
                    label="Username"
                    name="username"
                    prepend-icon="fa-user"
                    type="text" />

                  <v-text-field
                    id="password"
                    v-model="$v.password.$model"
                    :error="$v.password.$error"
                    :error-messages="passwordErrors"
                    label="Password"
                    name="password"
                    prepend-icon="fa-lock"
                    type="password"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    :disabled="loading"
                    :loading="loading"
                    type="submit"
                    color="primary">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Vuelidate, { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)

export default {
  props: {
    source: String
  },
  auth: false,
  layout: 'blank',
  data() {
    return {
      username: null,
      password: null,
      errorSummary: null,
      loading: false
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      try {
        this.errorSummary = null
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.username,
            password: this.password
          }
        })
        if (response && response.data && response.data.token) {
          this.$nuxt.$router.replace('/dashboard')
        }
      } catch (err) {
        let error = err.toString()
        if (typeof err.response !== 'undefined'
          && typeof err.response.data !== 'undefined') {
          error = err.response.data.message
        }
        this.errorSummary = error
      }
      this.loading = false
    }
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  }
};
</script>
