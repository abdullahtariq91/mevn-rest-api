<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>
              <!-- Begin Toolbar -->
              <v-toolbar>
                <v-toolbar-title> Users </v-toolbar-title>
                <v-spacer></v-spacer>
                <span v-if="alertSettings.success">
                  <v-alert v-model="alert" color="success" dismissible icon="check_circle" transition=scale-transition>
                    {{ alertSettings.callName }}
                  </v-alert>
                </span>
                <span v-else>
                  <v-alert v-model="alert" color="error" dismissible icon="warning" transition=scale-transition>
                    {{ alertSettings.callName }}
                  </v-alert>
                </span>

                  <!-- Add Dialog Button -->
                <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                  <v-btn icon slot="activator">
                    <v-icon> control_point </v-icon>
                  </v-btn>

                  <!-- Add Dialog -->
                  <userAddDialog :rules="rules"
                  @submission="submit" @closeAdd="addDialog = false"  v-if="addDialog">
                  </userAddDialog>
                </v-dialog>

              </v-toolbar>

                <!-- List of Users -->
              <span  v-if="users.length">
                <userItem v-for="user in users" :key="user._id"
                 :user="user" @setUpEdit="setupEdit(user)"
                 @setUpDelete="setupDelete(user)">
                 </userItem>
              </span>
              <v-card v-else class="headline text-xs-center">Please login to view users</v-card>

              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%"  v-if="deleteDialog">
                <userDeleteDialog :user="userToDelete" @closeDelete="deleteDialog = false"
                @deleted="deleteUser">

                </userDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%" v-if="editDialog">
                <userEditDialog :rules="rules" :user="userToEdit" :editName="editName"
                @edited="edit" @closeEdit="editDialog = false; userToEdit = {}">
                </userEditDialog>
              </v-dialog>
              <!-- End Edit Form -->
            </v-card>
            <v-btn @click="secretMessage" slot="activator">
              Secret
            </v-btn>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>

<script>
import { http } from "../config/http.js"
import userItem from "../components/user.vue"
import userAddDialog from "../components/userAddDialog.vue"
import userEditDialog from "../components/userEditDialog.vue"
import userDeleteDialog from "../components/userDeleteDialog.vue"

export default {
  // variables
  data: () => ({
    headers: {},
    errors: [],
    users: [],
    userToDelete: {},
    alertSettings: {},
    userToEdit: {},
    newUser: {},
    addDialog: false,
    deleteDialog: false,
    editDialog: false,
    alert: false,
    editName: '',
    rules: {
      email: value => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),

  components: {
    userItem: userItem,
    userAddDialog: userAddDialog,
    userEditDialog: userEditDialog,
    userDeleteDialog: userDeleteDialog
  },

  methods: {
    load() {
      http
        .get("/users", { headers: this.headers })
        .then(response => {
          this.users = response.data.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    secretMessage() {
      http
        .get("/secret", { headers: this.headers })
        .then(response => {
          if (response.data.data)
            this.alertProc(true, response.data.data.message);
          else {
            this.alertProc(false, response.data.message);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    setupDelete(user) {
      this.userToDelete = user;
      this.deleteDialog = true;
    },

    setupEdit(user) {
      Object.keys(user).forEach(key => {
        this.userToEdit[key] = user[key];
      });
      this.editName = user.firstName;
      this.editDialog = true;
    },

    deleteUser(tempUser) {
      // this.alertSettings.callName = "Delete";
      http
        .delete("/users/" + tempUser._id, { headers: this.headers })
        .then(response => {
          if (response.status == 204) {
            this.alertProc(true, "User deleted");
            this.load();
            this.deleteDialog = false;
            this.userToDelete = {};
          } else {
            this.alertProc(false, "User could not be deleted");
            this.deleteDialog = false;
          }
        })
        .catch(e => {
          console.log(e);
          this.alertProc(false, "User could not be deleted");
          this.errors.push(e);
          this.deleteDialog = false;
        });
    },

    submit(user) {
      http
        .post("/users", user, { headers: this.headers })
        .then(response => {
          this.load();
          this.addDialog = false;
          this.newUser = {};
          this.alertProc(true, "User created");
        })
        .catch(e => {
          this.errors.push(e);
          this.addDialog = false;
          this.alertProc(false, "User could not be created");
        });
    },

    edit(changedUser) {
      http
        .put("/users/" + changedUser._id, changedUser, { headers: this.headers })
        .then(response => {
          this.userToEdit = {};
          this.editDialog = false;
          this.load();
          this.alertProc(true, "User updated");
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
          this.editDialog = false
          this.alertProc(false, "User could not be updated");
        });
    },

    alertProc(success, callName) {
      this.alertSettings.callName = callName;
      this.alertSettings.success = success;
      this.alert = true;
    }
  },

  // retrieve users
  mounted() {
    this.headers = {'Authorization' : 'Bearer ' + this.$localStorage.get('token')};
    this.load();
  }
};
</script>
