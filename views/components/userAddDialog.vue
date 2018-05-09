<template>


    <v-card>
      <v-toolbar>
        <div class="headline"> Add A User </div>
      </v-toolbar>
      <v-container fluid>
        <v-card-text>

          <!-- Begin Input Row -->
          <v-form ref="form">
          <v-text-field label="First Name" v-model="user.firstName"> </v-text-field>
          <v-text-field label="Last Name" v-model="user.lastName"> </v-text-field>
          <v-text-field label="Email Address" v-model="user.email" :rules="[rules.email]"> </v-text-field>
          <v-text-field label="Phone Number" v-model="user.phoneNumber"> </v-text-field>
          <v-radio-group v-model="user.role">
            <v-radio value="a" label="Admin" name="Admin"> </v-radio>
            <v-radio value="u" label="User" name="User"> </v-radio>
          </v-radio-group>
          <v-text-field type="password" label="Password" v-model="user.password"> </v-text-field>
          <v-btn @click="$emit('submission', user); user={}" class="green lighten-1 white--text">Submit</v-btn>
          <v-btn @click="$emit('closeAdd')" class="red white--text">Close</v-btn>
          </v-form>
        </v-card-text>
      </v-container>
    </v-card>

</template>

<script>
export default {
  data: () => ({
    user: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: 'a',
      password: ''
    }
  }),

  props: {
    rules: {
      type: Object
    }
  }
}
</script>
