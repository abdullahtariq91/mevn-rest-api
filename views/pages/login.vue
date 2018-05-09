<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>
              <v-toolbar>
              <v-toolbar-title> Welcome to a Home Page component </v-toolbar-title>
              </v-toolbar>
              <v-container fluid>
                <!-- <v-form ref="form"> -->
                  <v-text-field label="Email Address" v-model="email"> </v-text-field>
                  <v-text-field label="Password" v-model="password"> </v-text-field>
                  <v-dialog lazy absolute max-width="50%">
                    <v-btn icon slot="activator" @click="submit" @submission="submit">
                      <v-icon> control_point </v-icon>
                    </v-btn>
                  </v-dialog>
                <!-- </v-form> -->
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>

<script>
import { http } from "../config/http.js"
export default {
  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    submit(email, password) {
      http
        .post("/login", {email: this.email, password: this.password})
        .then(response => {
          this.$localStorage.set('token', response.data.data.token);
          this.$router.push('home');
        })
        .catch(e => {
          console.log(e);
      });
    }
  }
}
</script>

<style>

</style>
