<template>
  <v-card>
    <v-toolbar>
      <div class="headline"> Edit User: {{editName}} </div>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>

        <!-- Begin Input Row -->
        <v-form ref="form">
          <v-text-field label="First Name" v-model="user.firstName"> </v-text-field>
          <v-text-field label="Last Name" v-model="user.lastName"> </v-text-field>
          <v-text-field label="Email Address" v-model="user.email" :rules="[rules.email]"> </v-text-field>
          <v-text-field label="Phone Number" v-model="user.phoneNumber"> </v-text-field>
          <v-btn @click="$emit('edited', changedUser)" class="green lighten-1 white--text">Submit</v-btn>
          <v-btn @click="$emit('closeEdit')" class="red white--text">Close</v-btn>
        </v-form>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    changedUser: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }
  }),

  props: {
    user: {
      type: Object
    },
    rules: {
      type: Object
    },
    editName: {
      type: String,
      default: ''
    }
  },

  created() {
    this.changedUser = this.user
  }
}
</script>

<style>

</style>
