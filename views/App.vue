<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      floating
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
      width="200"
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          value="true"
          :href="item.href"
        >
          <v-list-tile-action>
            <v-icon class="white--text" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed flat app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>

      <v-toolbar-title v-text="title"></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="logout"
      >
        <v-icon v-html="'exit_to_app'"></v-icon>
      </v-btn>
    </v-toolbar>


    <main>
      <v-content>
        <v-container fluid >
            <v-layout column align-center>
              <v-fade-transition mode="out-in">
              <router-view></router-view>
            </v-fade-transition>
            </v-layout>
        </v-container>
      </v-content>
    </main>

    <v-footer :fixed="fixed" app>
      <span> Template created by <a href="http://github.com/aturingmachine">Vincent Blom</a></span>
    </v-footer>
  </v-app>
</template>

<script>
import { http } from "./config/http.js"

export default {
  data: () => {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "home",
          title: "Home",
          href: "/#/home",
          router: true
        },
        {
          icon: "account_circle",
          title: "Users",
          href: "/#/users",
          router: true
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Ultimate User CRUD Portal"
    };
  },
  methods: {
    logout() {
      http
        .post("/login/logout", { email: this.$localStorage.get('user') })
        .then(response => {
          this.$socket.disconnect(true);
          this.$router.push('login');
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
