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
                  <v-text-field type="password" label="Password" v-model="password" @enter="submit"> </v-text-field>
                  <v-dialog lazy absolute max-width="50%">
                    <v-btn slot="activator" @click="submit" @submission="submit">
                      Login
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
          this.$socket.connect();
          this.$socket.emit('clientInformation', response.data.data.token);
          this.$localStorage.set('user', response.data.data.email);
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
